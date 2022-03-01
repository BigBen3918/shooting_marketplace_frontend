import React from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import M_Progressbar from '../components/myAddComponents/M_Progressbar';

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

const progress = () => (
  <div>
    <GlobalStyles />
    <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12 text-center'>
              <h1>Progress Bar</h1>
              <p>Anim pariatur cliche reprehenderit</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="container">
      <div className="row">

        <div className="col-md-4">
          <M_Progressbar h5Text="Art" s_width="80%" />
          <M_Progressbar h5Text="Music" s_width="70%" />
        </div>

        <div className="col-md-4">
          <M_Progressbar h5Text="Domain Names" s_width="75%" />
          <M_Progressbar h5Text="Virtual Worlds" s_width="80%" />
        </div>

        <div className="col-md-4">
          <M_Progressbar h5Text="Trading Cards" s_width="90%" />
          <M_Progressbar h5Text="Collectibles" s_width="75%" />
        </div>

      </div>
    </section>


    <Footer />
  </div>

);
export default progress;