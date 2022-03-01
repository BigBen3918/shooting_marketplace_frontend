import React from "react";
// import Particle from "../components/Particle";

import OpenWar from "../home/OpenWar";
import CharactSlide from "../home/CharactSlide";
import Adventure from "../home/Adventure";
import BottomSection from "../home/BottomSection";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const homeone = () => (
    <div className="greyscheme">
        <StyledHeader theme={theme} />
        <section
            className="jumbotron no-bg relative"
            style={{ backgroundImage: `url(${"./img/home/top_img.png"})` }}
        >
            {/* <Particle/> */}
        </section>

        <section className="no-top no-bottom">
            <OpenWar />
        </section>

        <section className="no-top no-bottom">
            <CharactSlide />
        </section>

        <section className="no-top no-bottom">
            <Adventure />
        </section>

        <BottomSection />
    </div>
);
export default homeone;
