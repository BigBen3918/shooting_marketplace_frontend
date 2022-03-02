import React, { useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { useBlockchainContext } from "../../context";
import { useWallet } from "use-wallet";
import IMGDeploy from "../components/imgDeploy";
import CoverIMG from "../../assets/shooting_frame/cover_image.png";
import { navigate } from "@reach/router";

function ItemContent() {
    const wallet = useWallet();
    const [state, { GetUserNFTs }] = useBlockchainContext();
    const data = GetUserNFTs();
    const nftData = [];

    useEffect(() => {
        if (wallet.status !== "connected") {
            navigate("/");
            NotificationManager.error("Please connect Metamask");
        }
    }, [wallet.status]);

    Object.keys(data).map((item, index) => {
        nftData.push(JSON.parse(data[item].tokenURI));
    });

    return (
        <div>
            <div
                className="items_top_div"
                style={{
                    backgroundImage: `url(${".././img/home/item_section_top.png"})`,
                }}
            ></div>
            <div className="div_itemcontent_section">
                <img
                    src={`${".././img/avatar/avatar_default.png"}`}
                    className="items_avatar"
                    alt=""
                />
            </div>
            <section className="container">
                <div className="row">
                    {nftData.map((item, index) => {
                        return (
                            <IMGDeploy
                                key={index}
                                id={index}
                                coverImg={CoverIMG}
                                imgUrl={item.image}
                                imgTitle={item.name}
                                imgPrice={item.Price}
                                isMine={true}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default ItemContent;
