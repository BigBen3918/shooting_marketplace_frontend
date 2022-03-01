import React from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import M_Itemdetail from "../components/myAddComponents/M_Itemdetail";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;




const Colection = function () {

    const [openMenu, setOpenMenu] = React.useState(true);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const handleBtnClick = () => {
        setOpenMenu(!openMenu);
        setOpenMenu1(false);
        document.getElementById("Mainbtn").classList.add("active");
        document.getElementById("Mainbtn1").classList.remove("active");
    };
    const handleBtnClick1 = () => {
        setOpenMenu1(!openMenu1);
        setOpenMenu(false);
        document.getElementById("Mainbtn1").classList.add("active");
        document.getElementById("Mainbtn").classList.remove("active");
    };
    return (
        <div className="greyscheme">
            <GlobalStyles />

            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>

                    <div className="col-md-6 text-center">
                        <img src="./img/items/big-1.jpg" className="img-fluid img-rounded mb-sm-30" alt="" />
                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            Auctions ends in
                            <div className="de_countdown">
                                <Clock deadline="December, 30, 2021" />
                            </div>
                            <h2>Pinky Ocean</h2>
                            <div className="item_info_counts">
                                <div className="item_info_type"><i className="fa fa-image"></i>Art</div>
                                <div className="item_info_views"><i className="fa fa-eye"></i>250</div>
                                <div className="item_info_like"><i className="fa fa-heart"></i>18</div>
                            </div>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

                            <h6>Creator</h6>
                            <div className="item_author">
                                <div className="author_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/author/author-1.jpg" alt="" />
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>
                                <div className="author_list_info">
                                    <span>Monica Lucas</span>
                                </div>
                            </div>

                            <div className="spacer-40"></div>

                            <div className="de_tab">

                                <ul className="de_nav">
                                    <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>Bids</span></li>
                                    <li id='Mainbtn1' className=''><span onClick={handleBtnClick1}>History</span></li>
                                </ul>

                                <div className="de_tab_content">
                                    {openMenu && (
                                        <div className="tab-1 onStep fadeIn">
                                            <M_Itemdetail imgName="./img/author/author-1.jpg" amount="Bid accepted <b>0.005 ETH</b>" content="by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM" />
                                            <M_Itemdetail imgName="./img/author/author-2.jpg" amount="Bid <b>0.005 ETH</b>" content="by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM" />
                                            <M_Itemdetail imgName="./img/author/author-3.jpg" amount="Bid <b>0.004 ETH</b>" content="by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM" />
                                            <M_Itemdetail imgName="./img/author/author-4.jpg" amount="Bid <b>0.003 ETH</b>" content="by <b>Lori Hart</b> at 6/12/2021, 12:57 AM" />
                                        </div>
                                    )}

                                    {openMenu1 && (
                                        <div className="tab-2 onStep fadeIn">
                                            <M_Itemdetail imgName="./img/author/author-5.jpg" amount="Bid <b>0.005 ETH</b>" content="by <b>Jimmy Wright</b> at 6/14/2021, 6:40 AM" />
                                            <M_Itemdetail imgName="./img/author/author-1.jpg" amount="Bid accepted <b>0.005 ETH</b>" content="by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM" />
                                            <M_Itemdetail imgName="./img/author/author-2.jpg" amount="Bid <b>0.005 ETH</b>" content="by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM" />
                                            <M_Itemdetail imgName="./img/author/author-3.jpg" amount="Bid <b>0.004 ETH</b>" content="by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM" />
                                            <M_Itemdetail imgName="./img/author/author-4.jpg" amount="Bid <b>0.003 ETH</b>" content="by <b>Lori Hart</b> at 6/12/2021, 12:57 AM" />
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}
export default Colection;