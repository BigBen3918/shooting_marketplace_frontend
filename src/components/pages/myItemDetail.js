import React, { memo, useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import M_itemdetailRedux from "../components/myAddComponents/M_ItemdetailRedux";
import BottomSection from "../home/BottomSection";
import { useBlockchainContext } from "../../context";
import { useWallet } from "use-wallet";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
import CoverIMG from "../../assets/shooting_frame/cover_image.png";
import { navigate } from "@reach/router";
//SWITCH VARIABLE FOR PAGE STYLE

const theme = "GREY"; //LIGHT, GREY, RETRO

const MyItemDetail = (props) => {
    const { nftId } = props;
    const wallet = useWallet();
    const [imgLoading, setImgLoading] = useState(true);
    const [state, { GetUserNFTs }] = useBlockchainContext();

    const data = GetUserNFTs();
    const nftData = JSON.parse(data[nftId].tokenURI);

    useEffect(() => {
        if (wallet.status !== "connected") {
            navigate("/");
            NotificationManager.error("Please connect Metamask");
        }
    }, [wallet.status]);

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
                                src={nftData.image}
                                type="video/mp4"
                                className="img-fluid img-rounded mb-sm-30 item_details_img"
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            <h1 className="color">{nftData.name}</h1>
                            <p>{nftData.description}</p>

                            <div className="d-flex flex-row">
                                <div className="mr40">
                                    <div className="item_author">
                                        <h2>
                                            Price:{"  "}
                                            {nftData.Price}
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
                                                    per={"+" + nftData.Damage}
                                                />
                                                <M_itemdetailRedux
                                                    type="FireRate"
                                                    per={nftData.FireRate + "s"}
                                                />
                                                <M_itemdetailRedux
                                                    type="ReloadTime"
                                                    per={
                                                        nftData.ReloadTime + "s"
                                                    }
                                                />
                                                <M_itemdetailRedux
                                                    type="Range"
                                                    per={"+" + nftData.Range}
                                                />
                                                <M_itemdetailRedux
                                                    type="Accurancy"
                                                    per={
                                                        "+" + nftData.Accurancy
                                                    }
                                                />
                                                <M_itemdetailRedux
                                                    type="Weight"
                                                    per={nftData.Weight + "kg"}
                                                />
                                            </div>
                                        </div>
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

export default memo(MyItemDetail);
