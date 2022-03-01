import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from "./Clock";
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .nft-big .slick-prev::before{
    left: 0;
    line-height: 40px;
  }
  .nft-big .slick-next::before {
    right: 0;
    line-height: 40px;
  }
  .nft-big .slick-prev, .nft-big .slick-next{
    border: 1px solid #ccc;
    box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
    width: 50px;
    height: 50px;
  }
`;

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return (
      <div {...props}></div>
    );

      
  }
}

export default class Responsive extends Component {

  constructor(props) {
      super(props);
      this.state = { deadline: "January, 10, 2022", deadline1: "February, 10, 2022", deadline2: "February, 1, 2022", height: 0 };
    }

  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      adaptiveHeight: 300,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    };

    return (
        <div className='nft-big'>
          <GlobalStyles />
          <Slider {...settings}>
            <CustomSlide className='itm' index={1}>
              <div className="nft__item_lg">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="./img/carousel/crs-7.jpg" className="img-fluid" alt=""/>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-desc">
                            <h2>Gradient Boxes</h2>
                            <div className="d-author">
                                <div className="author_list_pp">
                                    <img className="lazy" src="./img/author/author-1.jpg" alt=""/>
                                    <i className="fa fa-check"></i>
                                </div>                                    
                                <div className="author_list_info">
                                    <div className='title'>Monica Lucas</div>
                                    <div className='subtitle'>@monicaaa</div>
                                </div>
                            </div>
                            <div className="d-attr">
                                <div className='col first'>
                                    <span className="d-title">Current Bid</span>
                                    <h3>2.59 ETH</h3>
                                    <h5>($8935,37)</h5>
                                </div>
                                <div className="line"></div>
                                <div className='col'>
                                    <span className="d-title">Auction end in</span>
                                    <div className="de_countdown">
                                      <Clock deadline={this.state.deadline} />
                                    </div>
                                    <h5>(November 16, 2021)</h5>
                                </div>
                            </div>
                            <div className="spacer-10"></div>
                            <div className="d-buttons">
                                <span className="btn-main">Place a bid</span>
                                <span className="btn-main btn-light">View artwork</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </CustomSlide>

            <CustomSlide className='itm' index={2}>
             <div className="nft__item_lg">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="./img/carousel/crs-8.jpg" className="img-fluid" alt=""/>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-desc">
                            <h2>Alien vs Predator</h2>
                            <div className="d-author">
                                <div className="author_list_pp">
                                    <img className="lazy" src="./img/author/author-2.jpg" alt=""/>
                                    <i className="fa fa-check"></i>
                                </div>                                    
                                <div className="author_list_info">
                                    <div className='title'>Jimmy Wright</div>
                                    <div className='subtitle'>@JimmyWright</div>
                                </div>
                            </div>
                            <div className="d-attr">
                                <div className='col first'>
                                    <span className="d-title">Current Bid</span>
                                    <h3>2.59 ETH</h3>
                                    <h5>($8935,37)</h5>
                                </div>
                                <div className="line"></div>
                                <div className='col'>
                                    <span className="d-title">Auction end in</span>
                                    <div className="de_countdown">
                                      <Clock deadline={this.state.deadline1} />
                                    </div>
                                    <h5>(November 16, 2021)</h5>
                                </div>
                            </div>
                            <div className="spacer-10"></div>
                            <div className="d-buttons">
                                <span className="btn-main">Place a bid</span>
                                <span className="btn-main btn-light">View artwork</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </CustomSlide>

            <CustomSlide className='itm' index={3}>
              <div className="nft__item_lg">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="./img/carousel/crs-9.jpg" className="img-fluid" alt=""/>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-desc">
                            <h2>The Island</h2>
                            <div className="d-author">
                                <div className="author_list_pp">
                                    <img className="lazy" src="./img/author/author-3.jpg" alt=""/>
                                    <i className="fa fa-check"></i>
                                </div>                                    
                                <div className="author_list_info">
                                    <div className='title'>Lori hart</div>
                                    <div className='subtitle'>@lorihart</div>
                                </div>
                            </div>
                            <div className="d-attr">
                                <div className='col first'>
                                    <span className="d-title">Current Bid</span>
                                    <h3>2.59 ETH</h3>
                                    <h5>($8935,37)</h5>
                                </div>
                                <div className="line"></div>
                                <div className='col'>
                                    <span className="d-title">Auction end in</span>
                                    <div className="de_countdown">
                                      <Clock deadline={this.state.deadline} />
                                    </div>
                                    <h5>(November 16, 2021)</h5>
                                </div>
                            </div>
                            <div className="spacer-10"></div>
                            <div className="d-buttons">
                                <span className="btn-main">Place a bid</span>
                                <span className="btn-main btn-light">View artwork</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </CustomSlide>

          </Slider>
        </div>
    );
  }
}
