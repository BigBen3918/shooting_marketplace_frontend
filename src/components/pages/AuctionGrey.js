import React from 'react';
import ColumnAuctionRedux from '../components/ColumnAuctionRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from '../Styles';
//SWITCH VARIABLE FOR PAGE STYLE
const theme = 'GREY'; //LIGHT, GREY, RETRO

const GlobalStyles = createGlobalStyle`
  .greyscheme .de_countdown{
            position: relative;
        }
`;

const explore= () => (
<div className="greyscheme">
<StyledHeader theme={theme} />
<GlobalStyles />
  <section className='jumbotron breadcumb no-bg'>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row m-10-hor'>
          <div className='col-12'>
            <h1 className='text-center'>Live Auction</h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container'>
    <ColumnAuctionRedux/>
  </section>


  <Footer />
</div>

);
export default explore;