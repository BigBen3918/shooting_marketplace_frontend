import React, { useState, useEffect } from "react";
import IMGDeploy from "../components/imgDeploy";
import TopFilterBar from "../components/TopFilterBar";
import BottomSection from "../home/BottomSection";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
import data from "../resources/tokenInfos.json";
import CoverIMG from "../../assets/shooting_frame/cover_image.png";

//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Explore = () => {
    const [database, setDatabase] = useState([]);

    useEffect(() => {
        initialData();
    }, []);

    const initialData = () => {
        data.map((item) => {
            setDatabase((prevItem) => [...prevItem, item]);
        });
    };

    return (
        <div className="greyscheme">
            <StyledHeader theme={theme} />
            <section className="jumbotron breadcumb no-bg">
                <div className="mainbreadcumb">
                    <div className="container">
                        <div className="row m-10-hor">
                            <div className="col-12">
                                <h1 className="text-center">
                                    ICICB MarketPlace
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <TopFilterBar />
                    </div>
                </div>
                <div className="row">
                    {database.map((item, index) => (
                        <IMGDeploy
                            key={item.tokenURI.image}
                            id={index}
                            coverImg={CoverIMG}
                            imgUrl={item.tokenURI.image}
                            imgTitle={item.tokenURI.name}
                            imgPrice={item.tokenURI.Price}
                        />
                    ))}
                </div>
            </section>
            <BottomSection />
        </div>
    );
};
export default Explore;
