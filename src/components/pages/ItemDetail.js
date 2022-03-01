import React, { memo, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { NotificationManager } from "react-notifications";
import M_itemdetailRedux from "../components/myAddComponents/M_ItemdetailRedux";
import BottomSection from "../home/BottomSection";
import { useBlockchainContext } from "../../context";

import data from "../resources/tokenInfos.json";
//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
import CoverIMG from "../../assets/shooting_frame/cover_image.png";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const ItemDetailRedux = (props) => {
    const { nftId } = props;
    const wallet = useWallet();
    const [imgLoading, setImgLoading] = useState(true);
    const [status, setStatus] = useState(false);

    const [
        state,
        {
            buyBaseNFT,
            buyNFT,
            bidNFT,
            approveNFT,
            onSaleNFT,
            cancelOrder,
            cancelBid,
            acceptBid,
            marketPlaceContract,
            approveAtari,

            checkNFTApproval,
        },
    ] = useBlockchainContext();

    const NFTaddress = state.supportedNFTs[0];

    const [NFTApproval, setNFTApproval] = useState(false);

    useEffect(() => {
        checkNFTApproval(NFTaddress, nftId).then((res) => {
            setNFTApproval(res);
        });
    }, []);

    const handlebuy = async () => {
        if (wallet.status !== "connected") {
            NotificationManager.error("Please Connect Wallet");
            return;
        }

        try {
            setStatus(true);
            console.log(
                Number(state.atariNFTallowance),
                Number(data[nftId].tokenURI.Price)
            );
            if (
                Number(state.atariNFTallowance) <
                Number(data[nftId].tokenURI.Price)
            )
                await approveAtari(NFTaddress, data[nftId].tokenURI.Price);
            await buyBaseNFT(NFTaddress, nftId);
            setStatus(false);
        } catch (err) {
            console.log(err);
            setStatus(false);
            NotificationManager.error("Failure");
        }
    };

    return (
        <div className="greyscheme">
            <StyledHeader theme={theme} />

            <section className="container">
                <div className="row mt-md-5 pt-md-4">
                    <div className="col-md-6 text-center">
                        <div style={{ backgroundColor: "black" }}>
                            <img
                                src={CoverIMG}
                                className="img-fluid img-rounded mb-sm-30 item_details_img"
                                alt=""
                                style={{
                                    display: imgLoading ? "block" : "none",
                                }}
                            />
                            <video
                                autoPlay
                                loop
                                muted
                                alt=""
                                onLoadedData={() => {
                                    setImgLoading(false);
                                }}
                                style={{
                                    display: imgLoading ? "none" : "block",
                                    width: "100%",
                                }}
                                src={data[nftId].tokenURI.image}
                                type="video/mp4"
                                className="img-fluid img-rounded mb-sm-30 item_details_img"
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            <h1 className="color">
                                {data[nftId].tokenURI.name}
                            </h1>
                            {/* <div className="item_info_counts">
                                <div className="item_info_type">
                                    <i className="fa fa-image"></i>
                                    {nft.category}
                                </div>
                                <div className="item_info_views">
                                    <i className="fa fa-eye"></i>
                                    {nft.views}
                                </div>
                                <div className="item_info_like">
                                    <i className="fa fa-heart"></i>
                                    {nft.likes}
                                </div>
                            </div> */}
                            <p>{data[nftId].tokenURI.description}</p>

                            <div className="d-flex flex-row">
                                <div className="mr40">
                                    <div className="item_author">
                                        <h2>
                                            Price:{"  "}
                                            {data[nftId].tokenURI.Price}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="de_tab">
                                <div className="de_tab_content">
                                    <div className="tab-1 onStep fadeIn">
                                        <div className="d-block mb-3">
                                            <div className="mr40"></div>
                                            <div className="row mt-5">
                                                <M_itemdetailRedux
                                                    type="Damage"
                                                    per={
                                                        "+" +
                                                        data[nftId].tokenURI
                                                            .Damage
                                                    }
                                                />
                                                <M_itemdetailRedux
                                                    type="FireRate"
                                                    per={
                                                        data[nftId].tokenURI
                                                            .FireRate + "s"
                                                    }
                                                />
                                                <M_itemdetailRedux
                                                    type="ReloadTime"
                                                    per={
                                                        data[nftId].tokenURI
                                                            .ReloadTime + "s"
                                                    }
                                                />
                                                <M_itemdetailRedux
                                                    type="Range"
                                                    per={
                                                        "+" +
                                                        data[nftId].tokenURI
                                                            .Range
                                                    }
                                                />
                                                <M_itemdetailRedux
                                                    type="Accurancy"
                                                    per={
                                                        "+" +
                                                        data[nftId].tokenURI
                                                            .Accurancy
                                                    }
                                                />
                                                <M_itemdetailRedux
                                                    type="Weight"
                                                    per={
                                                        data[nftId].tokenURI
                                                            .Weight + "kg"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* button for checkout */}
                                    <div className="d-flex flex-row mt-5 item_details_btn_grp">
                                        {status ? (
                                            <button className="btn-main lead mb-5 mr15">
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </button>
                                        ) : (
                                            <button
                                                className="btn-main lead mb-5 mr15"
                                                onClick={handlebuy}
                                            >
                                                Buy Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BottomSection />
        </div>
    );
};

export default memo(ItemDetailRedux);
