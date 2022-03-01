import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
import { useWallet } from "use-wallet";
import BottomSection from "../home/BottomSection";
import ItemContent from "../items/ItemContent";
import { StyledHeader } from "../Styles";
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function (props) {
    const wallet = useWallet();
    const navigate = useNavigate();
    useEffect(() => {
        if (wallet.status !== "connected") {
            navigate("/");
        }
    }, []);

    return (
        <div className="greyscheme">
            <StyledHeader theme={theme} />
            <section className="no-top no-bottom">
                <ItemContent />
            </section>
            <BottomSection />
        </div>
    );
};
export default Colection;
