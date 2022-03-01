import React from "react";
// import footer1 from "../../assets/footer/1.png";
// import footer2 from "../../assets/footer/2.png";
import footer3 from "../../assets/footer/3.png";

// import Footer from '../layout/footer';
// import partnerTile from '../../assets/tilePartners.png';
// import partnerContent from '../../assets/partnerContent.png';

function Bottom() {
    return (
        <div className="x-home-bottom">
            <div
                className="x-home-info"
                style={{
                    backgroundImage: `url(${".././img/home/bottom.png"})`,
                }}
            >
                <img src={footer3} alt="" />
                {/* <div style={{ marginTop: 30 }}>
                    <button className="x-signupBtn">SIGN UP</button>
                    <button className="x-PlayNowBtn">PLAY NOW</button>
                </div> */}
            </div>
            <div className="footer_div">
                <p className="bottomText">powered by ICICb-group.com</p>
            </div>
        </div>
    );
}

export default Bottom;
