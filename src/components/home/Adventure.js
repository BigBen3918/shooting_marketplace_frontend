import React from "react";
import frame1 from "../../assets/shooting_frame/step5_1.png";
import frame2 from "../../assets/shooting_frame/step5_2.png";
import frame3 from "../../assets/shooting_frame/step5_3.png";
import frame4 from "../../assets/shooting_frame/step5_4.png";

import {Grid} from '@material-ui/core';

function Adventure() {
  
  return (
    <div>
      <div className="step5">
        <Grid container>
           <Grid item xs={12} sm={12} md={8}>
             <img src={frame1} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <div className="white_div">
                    <p>We are on start of our story.<br />
                    Attend to PVP combat and train  your weapons.<br />
                    Attend to open war and become the winner of the war. <br />
                    All is yours.</p>
                    <button>More</button>
                </div>
            </Grid>
        </Grid>
        <Grid container>
           <Grid item xs={12} sm={12} md={4}>
             <img src={frame2} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
             <img src={frame3} />
                
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
             <img src={frame4} />
                
            </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Adventure;
