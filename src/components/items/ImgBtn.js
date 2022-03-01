import React from "react";

function ImgBtn(props) {
    const { text, onClick } = props;
    return (
        <button className="x-smallChoco" onClick={onClick}>
            {text}
        </button>
    );
}

export default ImgBtn;
