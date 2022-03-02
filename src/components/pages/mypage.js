import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
import BottomSection from "../home/BottomSection";
import { useSelector } from "react-redux";
import ItemContent from "../items/ItemContent";
import { StyledHeader } from "../Styles";
import { useWallet } from "use-wallet";
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function (props) {
    const navigate = useNavigate();
    const wallet = useWallet();
    const auth = useSelector((state) => state.auth.auth);

    useEffect(() => {
        if (auth === "" || wallet.status !== "connected") {
            navigate("/");
        }
    }, [wallet.status]);

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
