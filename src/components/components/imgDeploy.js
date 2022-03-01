import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Button } from "@mui/material";

const className = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4";
const Outer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
`;

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#a48b57",
    "&:hover": {
        backgroundColor: "#c5a86a",
    },
}));

const ImgDeploy = (props) => {
    const { coverImg, imgUrl, imgPrice, imgTitle, id, isMine } = props;
    const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        setImgLoading(true);
    }, []);

    return (
        <div className={className}>
            <div className="nft__item m-0">
                <div className="nft__item_wrap">
                    <Outer>
                        <span>
                            <img
                                src={coverImg}
                                className="lazy nft__item_preview"
                                style={{
                                    display: imgLoading ? "block" : "none",
                                }}
                                alt=""
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
                                src={imgUrl}
                                type="video/mp4"
                                className="lazy  nft__item_preview"
                            />
                        </span>
                    </Outer>
                </div>
                <div className="nft__item_info">
                    <span>
                        <h4>{imgTitle}</h4>
                    </span>
                    <div className="nft__item_price">{imgPrice}</div>
                    {isMine ? (
                        <Link to={`/view/${id}`}>
                            <ColorButton variant="contained" color="error">
                                View
                            </ColorButton>
                        </Link>
                    ) : (
                        <Link to={`/create/${id}`}>
                            <ColorButton variant="contained" color="error">
                                Buy now
                            </ColorButton>
                        </Link>
                    )}
                    <div className="space-single"></div>
                </div>
            </div>
        </div>
    );
};

export default ImgDeploy;
