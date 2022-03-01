import React from "react";
import { Grid } from "@material-ui/core";

function OpenWar() {
    return (
        <div
            className="step4"
            style={{ backgroundImage: `url(${"./img/home/step4.png"})` }}
        >
            <Grid container>
                <Grid item xs={12} sm={12} md={7}></Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <h1 className="head">OPEN WAR</h1>
                    <p style={{ marginBottom: 30 }}>
                        ICICB Shooting Game is an MMORPG game that utilizes
                        blockchain to provide a user experience of real-world
                        owned game assets.
                    </p>
                    <p>Attend to open battle and Upgrade your weapon.</p>
                    <button>MORE</button>
                </Grid>
            </Grid>
        </div>
    );
}
export default OpenWar;
