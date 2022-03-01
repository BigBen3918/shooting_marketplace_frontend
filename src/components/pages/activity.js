import React from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import M_Activity from '../components/myAddComponents/M_Activity';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Activity = function () {

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [openMenu4, setOpenMenu4] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("follow").classList.remove("active");
    document.getElementById("sale").classList.remove("active");
    document.getElementById("offer").classList.remove("active");
    document.getElementById("like").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("follow").classList.add("active");
    document.getElementById("sale").classList.remove("active");
    document.getElementById("offer").classList.remove("active");
    document.getElementById("like").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    document.getElementById("follow").classList.remove("active");
    document.getElementById("sale").classList.add("active");
    document.getElementById("offer").classList.remove("active");
    document.getElementById("like").classList.remove("active");
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu4(false);
    document.getElementById("follow").classList.remove("active");
    document.getElementById("sale").classList.remove("active");
    document.getElementById("offer").classList.remove("active");
    document.getElementById("like").classList.add("active");
  };
  const handleBtnClick4 = () => {
    setOpenMenu4(!openMenu4);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu2(false);
    document.getElementById("follow").classList.remove("active");
    document.getElementById("sale").classList.remove("active");
    document.getElementById("offer").classList.add("active");
    document.getElementById("like").classList.remove("active");
  };


  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Activity</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='row'>

          <div className="col-md-8">

            {openMenu && (
              <ul className="activity-list">
                <M_Activity imgName="./img/author/author-1.jpg" h4Text="Monica Lucas" before="started following " content="Gayle Hicks" behind="" />
                <M_Activity imgName="./img/items/thumbnail-2.jpg" h4Text="Deep Sea Phantasy" before="1 edition purchased by " content="Stacy Long" behind="" />
                <M_Activity imgName="./img/author/author-2.jpg" h4Text="Mamie Barnett" before="started following " content="Claude Banks" behind="" />
                <M_Activity imgName="./img/items/thumbnail-4.jpg" h4Text="Two Tigers" before="1 edition purchased by " content="Jimmy Wright" behind=" for 0.02 ETH" />
                <M_Activity imgName="./img/items/thumbnail-7.jpg" h4Text="Cute Astronout" before="liked by " content="Nicholas Daniels" behind="" />
                <M_Activity imgName="./img/items/thumbnail-5.jpg" h4Text="Purple Planet" before="Franklin Greer" content="Jimmy Wright" behind=" offered 0.002 ETH" />
                <M_Activity imgName="./img/items/thumbnail-6.jpg" h4Text="Cute Astronout" before="liked by " content="Nicholas Daniels" behind="" />
              </ul>
            )}

            {openMenu1 && (
              <ul className="activity-list">
                <M_Activity imgName="./img/author/author-1.jpg" h4Text="Monica Lucas" before="started following " content="Gayle Hicks" behind="" />
                <M_Activity imgName="./img/author/author-2.jpg" h4Text="Mamie Barnett" before="started following " content="Claude Banks" behind="" />
              </ul>
            )}

            {openMenu2 && (
              <ul className="activity-list">
                <M_Activity imgName="./img/items/thumbnail-2.jpg" h4Text="Deep Sea Phantasy" before="1 edition purchased by " content="Stacy Long" behind="" />
                <M_Activity imgName="./img/items/thumbnail-4.jpg" h4Text="Two Tigers" before="1 edition purchased by " content="Jimmy Wright" behind=" for 0.02 ETH" />
              </ul>
            )}

            {openMenu3 && (
              <ul className="activity-list">
                <M_Activity imgName="./img/items/thumbnail-7.jpg" h4Text="Cute Astronout" before="liked by " content="Nicholas Daniels" behind="" />
                <M_Activity imgName="./img/items/thumbnail-6.jpg" h4Text="Cute Astronout" before="liked by " content="Nicholas Daniels" behind="" />
              </ul>
            )}

            {openMenu4 && (
              <ul className="activity-list">
                <M_Activity imgName="./img/items/thumbnail-5.jpg" h4Text="Purple Planet" before="Franklin Greer" content="Jimmy Wright" behind=" offered 0.002 ETH" />
              </ul>
            )}
          </div>


          <div className="col-md-4">
            <span className="filter__l">Filter</span>
            <span className="filter__r" onClick={handleBtnClick}>Reset</span>
            <div className="spacer-half"></div>
            <div className="clearfix"></div>
            <ul className="activity-filter">
              <li id='sale' className="filter_by_sales" onClick={handleBtnClick2}><i className="fa fa-shopping-basket"></i>Sales</li>
              <li id='like' className="filter_by_likes" onClick={handleBtnClick3}><i className="fa fa-heart"></i>Likes</li>
              <li id='offer' className="filter_by_offers" onClick={handleBtnClick4}><i className="fa fa-gavel"></i>Offers</li>
              <li id='follow' className="filter_by_followings" onClick={handleBtnClick1}><i className="fa fa-check"></i>Followings</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>

  );
}

export default Activity;