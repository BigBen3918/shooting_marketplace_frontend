import React, { useState } from 'react';
import Column from '../../components/Opensea/Column';
import Footer from '../../components/footer';
import { createGlobalStyle } from 'styled-components';
import TopFilterBar from '../../components/Opensea/TopFilterBar';

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
    color: rgba(255, 255, 255, .5);;
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

const ExploreOpensea = () => {

  const [side, setSide] = useState(); //0 for BUY and 1 for SELL
  const [owner, setOwner] = useState(); //0 for BUY and 1 for SELL

  return (
  <div>
    <GlobalStyles/>
    <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/subheader.jpg'})`}}>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12'>
              <h1 className='text-center'>Explore Opensea</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='container'>
          <div className='row'>
            <div className='col-lg-12'>
                <TopFilterBar setSide={setSide} setOwner={setOwner} />
            </div>
          </div>
        <Column side={side} owner={owner} />
        </section>
    <Footer />
  </div>
)};
export default ExploreOpensea;