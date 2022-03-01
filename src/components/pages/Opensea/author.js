import React, { memo, useEffect, useState } from "react";
import Assets from '../../components/Opensea/Assets';
import Column from '../../components/Opensea/Column';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import { openseaApi } from "../../../core/api";
import axios from "axios";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Colection = () => {
const [openMenu, setOpenMenu] = React.useState(true);
const [openMenu1, setOpenMenu1] = React.useState(false);
const [user, setUser] = useState();
const [address, setAddress] = useState();

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

const getUser = (userAddress) => {
    axios.get(`${openseaApi.api}/account/${userAddress}`).then(res => {
        const { data } = res.data;
        setUser(data);
    }).catch(err => {
        console.log(err);
    })
}

const getAddress = async () => {
  try {
      const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
      });
      setAddress(addressArray[0]);
  } catch (err) {
      console.log(err);
  }
}

useEffect(() => {
    getAddress();
}, []);

useEffect(() => {
    if(address) {
        getUser(address);
    }
}, [address]);

const navigateToOpensea = () => {
  window.open('https://opensea.io/login?referrer=%2Fasset%2Fcreate');
}

return (
<div>
<GlobalStyles/>
  { user && 
    <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${user.profile_img_url})`}}>
      <div className='mainbreadcumb'>
      </div>
    </section>
  }

  <section className='container no-bottom'>
    <div className='row'>
      <div className="col-md-12">
         <div className="d_profile de-flex">
              <div className="de-flex-col">
                { user && 
                  <div className="profile_avatar">
                      <img src={user.profile_img_url} alt=""/>
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                            {user.user.username}                                          
                              <span className="profile_username"></span>
                              <span id="wallet" className="profile_wallet">{user.address}</span>
                              <button id="btn_copy" title="Copy Text">Copy</button>
                          </h4>
                      </div>
                  </div>
                }
              </div>

          </div>
      </div>
    </div>
  </section>

  <section className='container no-top'>
      {user ?
        (
          <div className='row'>
            <div className='col-lg-12'>
              <div className="items_filter">
                <ul className="de_nav text-left">
                    <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>Collected</span></li>
                    <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Created</span></li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="d-flex justify-content-center mb-5">
              Register on OpenSea first and connect with metamask to see this page
            </h4>
            <span onClick={navigateToOpensea} className="btn-main lead m-auto">Register on OpenSea</span>
          </div>
        )
      }
      {openMenu && (  
        <div id='zero1' className='onStep fadeIn'>
         <Assets getUser={getUser} owner={user ? user.address : null} />
        </div>
      )}
      {openMenu1 && ( 
        <div id='zero2' className='onStep fadeIn'>
         <Column owner={1} ownerAddress={user ? user.address : null}/>
        </div>
      )}
      </section>


  <Footer />
</div>
);
}
export default memo(Colection);