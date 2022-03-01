import React, {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useEffect,
} from "react";
import { ethers } from "ethers";
import { useWallet } from "use-wallet";
import {
    providers,
    AtariToken,
    MarketPlace,
    MultiCall,
    WeaponNFT,
    supportChainId,
    NFTContractABI,
    supportedNFTs,
} from "../contract";
import { delay, toBigNum, fromBigNum } from "../lib";

import { NotificationManager } from "react-notifications";

const BlockchainContext = createContext();

export function useBlockchainContext() {
    return useContext(BlockchainContext);
}

function reducer(state, { type, payload }) {
    return {
        ...state,
        [type]: payload,
    };
}

const INIT_STATE = {
    Loading: true,
    NFTDATAS: {},
    MARKETDATAS: {},
    signer: {},
    provider: {},
    balance: "0",
    marketallowance: "0",
    atariNFTallowance: "0",
    supportedNFTs: supportedNFTs,
    user: "Atari Player",
};

export default function Provider({ children }) {
    const wallet = useWallet();
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    // set signer balance
    useEffect(() => {
        const getSigner = async () => {
            if (wallet.status === "connected") {
                const provider = new ethers.providers.Web3Provider(
                    wallet.ethereum
                );
                const signer = await provider.getSigner();
                dispatch({
                    type: "signer",
                    payload: signer,
                });

                dispatch({
                    type: "provider",
                    payload: provider,
                });

                checkBalance();

                dispatch({
                    type: "user",
                    payload: wallet.account,
                });
            }
        };
        getSigner();
    }, [wallet.status]);

    // coin balance
    const checkBalance = async () => {
        try {
            if (wallet.status === "connected") {
                const balance = await AtariToken.balanceOf(wallet.account);
                return fromBigNum(balance, 0);
            } else {
                return "0";
            }
        } catch (err) {
            console.log("context : checkBalance error", err);
            return 0;
        }
    };

    const checkApproval = async (to) => {
        try {
            if (wallet.status === "connected") {
                const signedAtariContract = AtariToken.connect(state.signer);
                const allowance = await signedAtariContract.allowance(
                    wallet.account,
                    to
                );
                return fromBigNum(allowance, 0);
            } else {
                return "0";
            }
        } catch (err) {
            console.log("context : checkApproval error", err);
            return 0;
        }
    };

    const updateTokenBalance = async () => {
        var balance = checkBalance();
        var allowance = checkApproval(MarketPlace.address);
        var atariNFTallowance = checkApproval(supportedNFTs[0]);

        var values = await Promise.all([balance, allowance, atariNFTallowance]);
        dispatch({
            type: "balance",
            payload: values[0],
        });
        dispatch({
            type: "marketallowance",
            payload: values[1],
        });
        dispatch({
            type: "atariNFTallowance",
            payload: values[2],
        });
    };

    /* ------------ NFT contracts ------------- */

    const getNFTContract = (NFTaddress) => {
        return new ethers.Contract(
            NFTaddress,
            NFTContractABI,
            providers[supportChainId]
        );
    };

    const getSignedNFTContract = (NFTaddress) => {
        if (wallet.status == "connected") {
            const NFTContract = getNFTContract(NFTaddress);
            return NFTContract.connect(state.signer);
        } else throw new Error("Signer Error");
    };

    const checkNFTApproval = async (NFTaddress, id) => {
        try {
            if (wallet.status === "connected") {
                const nftContract = getNFTContract(NFTaddress);
                const allowance = await nftContract.getApproved(id);
                return (
                    allowance.toUpperCase() ===
                    MarketPlace.address.toUpperCase()
                );
            } else {
                return false;
            }
        } catch (err) {
            console.log("context : checkNFTApproval error", err);
            return false;
        }
    };

    /* ------------ updators ------------- */
    const updateNFTContents = async (NFTaddress) => {
        try {
            const NFTContract = getNFTContract(NFTaddress);
            const totalSupply = Number(await NFTContract.totalSupply());
            var ids = Array.from(Array(totalSupply).keys());

            if (ids !== []) {
                var _tokenInfos = await MultiCall.getWeaponInfos(ids);
                // update data structure
                var tokenInfos = {};
                {
                    /** 
                     * origin : string[] owners,string[] creators,string[] tokenURIs, 
                     * c : {
                        id : {
                            owner,
                            creator,
                            tokenURIs
                        }
                    }
                    */
                    ids.map((id) => {
                        tokenInfos[id] = {
                            owner: _tokenInfos.owners[id],
                            creator: _tokenInfos.creators[id],
                            tokenURI: _tokenInfos.tokenURIs[id],
                        };
                    });
                }

                dispatch({
                    type: "NFTDATAS",
                    payload: { ...state.NFTDATAS, [NFTaddress]: tokenInfos },
                });

                // update marketData
                var marketIds = [];
                for (var id in tokenInfos) {
                    if (
                        tokenInfos[id].owner.toUpperCase() ==
                        MarketPlace.address.toUpperCase()
                    )
                        marketIds.push(id);
                }

                if (marketIds.length != 0)
                    await updateMarketContents(NFTaddress, marketIds);

                dispatch({
                    type: "Loading",
                    payload: false,
                });
            }
        } catch (err) {
            console.log("updateNFT error :", err);
            NotificationManager.error("NFT Update Filure");
        }
    };

    const updateMarketContents = async (NFTaddress, ids) => {
        try {
            if (ids.length == 0) return;
            var _marketOrderInfos = await MarketPlace.getOrderByAssetIds(
                NFTaddress,
                ids
            );
            var _marketBidInfos = await MarketPlace.getBidByAssetIds(
                NFTaddress,
                ids
            );
            var marketInfos = {};

            // update market info struct

            /**
             * origin : [order[1],order[3]..]
             * c : { id : order[id]}
             */
            ids.map((id, index) => {
                marketInfos[id] = {
                    orders: _marketOrderInfos[index],
                    bids: _marketBidInfos[index],
                };
            });

            dispatch({
                type: "MARKETDATAS",
                payload: { ...state.MARKETDATAS, [NFTaddress]: marketInfos },
            });
        } catch (err) {
            console.log("market data error :", err);
            NotificationManager.error("Market data error :", err.message);
        }
    };

    const updateAll = async () => {
        supportedNFTs.map((supportedNFT) => {
            updateNFTContents(supportedNFT);
        });
    };

    /* ------------ get data ------------- */
    useEffect(() => {
        updateAll();
        updateTokenBalance();
    }, [state.signer]);

    /*  ------------ actions ------------- */
    /////////////////////////////////////////
    const approveAtari = async (to, amount) => {
        try {
            if (wallet.status !== "connected")
                throw new Error("Please connect wallet.");
            const signedTokenContract = AtariToken.connect(state.signer);
            var tx = await signedTokenContract.approve(to, Number(amount));
            await tx.wait();
            updateTokenBalance();

            NotificationManager.success("approve success");
        } catch (err) {
            console.log("approve err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("approve error :", errMsg);
        }
    };

    // buy from NFT contract
    /////////////////////////////////////////
    const buyBaseNFT = async (NFTaddress, id) => {
        try {
            const signedNFTContract = getSignedNFTContract(NFTaddress);
            var tx = await signedNFTContract.create(id);
            await tx.wait();

            updateAll();
            updateTokenBalance();

            NotificationManager.success("buyNFT success");
        } catch (err) {
            console.log("buyNFT err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("buyNFT error :", errMsg);
        }
    };

    // market actions
    /////////////////////////////////////////
    const buyNFT = async (NFTaddress, id, price) => {
        try {
            const signedMarketPlaceContract = MarketPlace.connect(state.signer);
            var tx = await signedMarketPlaceContract.Buy(
                NFTaddress,
                id,
                toBigNum(price, 0)
            );
            await tx.wait();
            updateAll();
            updateTokenBalance();

            NotificationManager.success("buyNFT success");
        } catch (err) {
            console.log("buyNFT err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("buyNFT error :", errMsg);
        }
    };

    const approveNFT = async (NFTaddress, id) => {
        try {
            const signedNFTContract = getSignedNFTContract(NFTaddress);
            var tx = await signedNFTContract.approve(MarketPlace.address, id);
            await tx.wait();
            updateAll();
            updateTokenBalance();

            NotificationManager.success("NFT approve success");
        } catch (err) {
            console.log("NFT approve err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("NFT approve error :", errMsg);
        }
    };

    const onSaleNFT = async (NFTaddress, id, price, endTime) => {
        try {
            const signedMarketPlaceContract = MarketPlace.connect(state.signer);
            var tx = await signedMarketPlaceContract.createOrder(
                NFTaddress,
                id,
                toBigNum(price, 0),
                endTime
            );
            await tx.wait();
            updateAll();
            updateTokenBalance();

            NotificationManager.success("onSaleNFT success");
        } catch (err) {
            console.log("onSaleNFT err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("onSaleNFT error :", errMsg);
        }
    };

    const cancelOrder = async (NFTaddress, id) => {
        try {
            const signedMarketPlaceContract = MarketPlace.connect(state.signer);
            var tx = await signedMarketPlaceContract.cancelOrder(
                NFTaddress,
                id
            );
            await tx.wait();
            updateAll();
            updateTokenBalance();

            NotificationManager.success("cancelOrder success");
        } catch (err) {
            console.log("cancelOrder err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("cancelOrder error :", errMsg);
        }
    };

    // market auctions
    /////////////////////////////////////////
    const bidNFT = async (NFTaddress, id, price, endTime) => {
        try {
            const signedMarketPlaceContract = MarketPlace.connect(state.signer);
            var tx = await signedMarketPlaceContract.PlaceBid(
                NFTaddress,
                id,
                toBigNum(price, 0),
                endTime
            );
            await tx.wait();
            updateAll();
            updateTokenBalance();

            NotificationManager.success("bidNFT success");
        } catch (err) {
            console.log("bidNFT err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("bidNFT error :", errMsg);
        }
    };

    const cancelBid = async (NFTaddress, id) => {
        try {
            const signedMarketPlaceContract = MarketPlace.connect(state.signer);
            var tx = await signedMarketPlaceContract.cancelBid(NFTaddress, id);
            await tx.wait();
            updateAll();
            updateTokenBalance();

            NotificationManager.success("cancelBid success");
        } catch (err) {
            console.log("cancelBid err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("cancelBid error :", errMsg);
        }
    };

    const acceptBid = async (NFTaddress, id, price) => {
        try {
            const signedMarketPlaceContract = MarketPlace.connect(state.signer);
            var tx = await signedMarketPlaceContract.acceptBid(
                NFTaddress,
                id,
                price
            );
            await tx.wait();
            updateAll();
            updateTokenBalance();

            NotificationManager.success("acceptBid success");
        } catch (err) {
            console.log("acceptBid err :", err);
            var errMsg = err.code == -32603 ? err.data.message : err.message;

            NotificationManager.error("acceptBid error :", errMsg);
        }
    };

    /* ------ filters ------- */
    ///////////////////////////

    const GetMarketNFTs = () => {
        try {
            var NFTDATAS = state.NFTDATAS[state.supportedNFTs[0]];
            var marketNFTs = Object.fromEntries(
                Object.entries(NFTDATAS).filter(
                    ([key, NFTdata]) =>
                        NFTdata.owner.toUpperCase() ===
                            MarketPlace.address.toUpperCase() ||
                        NFTdata.owner.toUpperCase() ===
                            state.supportedNFTs[0].toUpperCase()
                )
            );
            return marketNFTs;
        } catch (err) {
            console.log(err);
            return {};
        }
    };

    const GetUserNFTs = () => {
        try {
            if (wallet.status != "connected")
                throw new Error("connect wallet!");
            var NFTDATAS = state.NFTDATAS[state.supportedNFTs[0]];
            var userNFTs = Object.fromEntries(
                Object.entries(NFTDATAS).filter(
                    ([key, NFTdata]) =>
                        NFTdata.owner.toUpperCase() ===
                        wallet.account.toUpperCase()
                )
            );
            return userNFTs;
        } catch (err) {
            console.log(err);
            return {};
        }
    };

    const GetOnsaledUserNFTs = () => {
        try {
            if (wallet.status != "connected")
                throw new Error("connect wallet!");
            var MARKETDATAS = state.MARKETDATAS[state.supportedNFTs[0]];
            var NFTDATAS = state.NFTDATAS[state.supportedNFTs[0]];
            var userOnsaledNFTs = Object.fromEntries(
                Object.entries(MARKETDATAS).filter(
                    ([key, Marketdata]) =>
                        Marketdata.orders.seller.toUpperCase() ===
                        wallet.account.toUpperCase()
                )
            );

            var userNFTs = {};
            Object.keys(MARKETDATAS).map((key, index) => {
                userNFTs[key] = NFTDATAS[key];
            });

            return userNFTs;
        } catch (err) {
            console.log(err);
            return {};
        }
    };

    return (
        <BlockchainContext.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        updateTokenBalance,
                        updateAll,
                        updateNFTContents,
                        checkNFTApproval,

                        buyBaseNFT,
                        buyNFT,
                        bidNFT,
                        approveNFT,
                        onSaleNFT,
                        cancelOrder,
                        cancelBid,
                        acceptBid,

                        GetMarketNFTs,
                        GetUserNFTs,
                        GetOnsaledUserNFTs,
                        approveAtari,
                        MarketPlace,
                    },
                ],
                [state]
            )}
        >
            {children}
        </BlockchainContext.Provider>
    );
}
