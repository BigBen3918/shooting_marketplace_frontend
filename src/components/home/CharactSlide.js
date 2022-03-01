import React from "react";
import ImageGallery from "react-image-gallery";

import frame1 from "../../assets/shooting_frame/frame1.jpg";
import frame2 from "../../assets/shooting_frame/frame2.jpg";
import frame3 from "../../assets/shooting_frame/frame3.jpg";
import frame4 from "../../assets/shooting_frame/frame4.jpg";
import frame5 from "../../assets/shooting_frame/frame5.jpg";
import frame6 from "../../assets/shooting_frame/frame6.jpg";
import frame7 from "../../assets/shooting_frame/frame7.jpg";
import frame8 from "../../assets/shooting_frame/frame8.jpg";

function CharactSlide() {
  const images = [
    {
      original: frame1,
      thumbnail: frame1,
    },
    {
      original: frame2,
      thumbnail: frame2,
    },
    {
      original: frame3,
      thumbnail: frame3,
    },
    {
      original: frame4,
      thumbnail: frame4,
    },
    {
      original: frame5,
      thumbnail: frame5,
    },
    {
      original: frame6,
      thumbnail: frame6,
    },
    {
      original: frame7,
      thumbnail: frame7,
    },
    {
      original: frame8,
      thumbnail: frame8,
    },
  ];

  return (
    <div>
      <div className="x-home-step-video step1" style={{backgroundImage: `url(${'./img/home/step1.png'})`}}>
          <h1>Characters</h1>
          <p>Choose your soldier</p>
        <div className="box">
          <div className="gallery_div">
            <ImageGallery
              infinite={true}
              autoPlay={true}
              showPlayButton={true}
              useTranslate3D={true}
              showThumbnails={true}
              thumbnailPosition="bottom"
              items={images}
              lazyLoad = {true}
            />
          </div>
        </div>
        <div>
        <p style={{fontSize:22, position:'absolute', bottom:1,width:'100%'}}>START OF LONG <span style={{fontWeight:'bold'}}>JOURNEY</span></p>

        </div>
        
      </div>
    </div>
  );
}

export default CharactSlide;
