import React, { useEffect, useState } from "react";
import Breakpoint, {
    BreakpointProvider,
    setDefaultBreakpoints,
} from "react-socks";
import { Link } from "@reach/router";
import { Dialog, TextField, DialogTitle, Grid, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useWallet } from "use-wallet";
import { styled } from "@mui/material/styles";
// import { ethers } from "ethers";

setDefaultBreakpoints([{ xs: 0 }, { l: 979 }, { xl: 980 }]);

const NavLink = (props) => (
    <Link
        {...props}
        getProps={({ isCurrent }) => {
            // the object returned here is passed to the
            // anchor element's props
            return {
                className: isCurrent ? "active" : "non-active",
            };
        }}
    />
);

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#c5a86a",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#ggg",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#c5a86a",
        },
        input: {
            "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px black inset",
            },
        },
    },
});

function SimpleDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog onClose={handleClose} open={open} maxWidth="sm">
                <DialogTitle className="text-center deco col-white">
                    Sign Up
                </DialogTitle>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    className="signupDialog"
                >
                    <Grid item xs={10} md={5}>
                        <CssTextField
                            id="name"
                            label="Full Name"
                            type="Text"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={10} md={5}>
                        <CssTextField
                            id="nick"
                            label="Nick Name"
                            type="Text"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={10} md={10}>
                        <CssTextField
                            id="email"
                            label="Email Address"
                            type="Email"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={10} md={10}>
                        <CssTextField
                            label="Password"
                            id="custom-css-outlined-input"
                            type="password"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Button
                            fullWidth
                            color="primary"
                            variant="outlined"
                            className="btn-1"
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </ThemeProvider>
    );
}

const Header = function ({ className }) {
    const [showmenu, btn_icon] = useState(false);
    const wallet = useWallet();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    var styleAddress = wallet.account
        ? wallet.account.slice(0, 4) + "..." + wallet.account.slice(-4)
        : "";

    useEffect(() => {
        if (wallet.status === "error") {
            alert("Please connect to correct chain");
        }
    }, [wallet.status]);

    useEffect(() => {
        const header = document.getElementById("myHeader");
        const totop = document.getElementById("scroll-to-top");
        const sticky = header.offsetTop;
        const scrollCallBack = window.addEventListener("scroll", () => {
            btn_icon(false);
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
                totop.classList.add("show");
            } else {
                header.classList.remove("sticky");
                totop.classList.remove("show");
            }
        });
        return () => {
            window.removeEventListener("scroll", scrollCallBack);
        };
    }, []);

    const handleConnect = async () => {
        if (wallet.status !== "connected") {
            wallet.connect();
        }
    };
    const disconnect = () => {
        if (wallet.status === "connected") {
            wallet.reset();
        }
    };
    const toggleDialog = () => {
        setOpen(true);
    };

    return (
        <header className={`navbar white ${className}`} id="myHeader">
            <div className="container">
                <div className="row w-100-nav">
                    <BreakpointProvider>
                        <Breakpoint l down>
                            {showmenu && (
                                <div className="menu">
                                    <div className="navbar-item">
                                        <div>
                                            <NavLink
                                                to="/"
                                                onClick={() =>
                                                    btn_icon(!showmenu)
                                                }
                                            >
                                                Home
                                                <span className="lines"></span>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="navbar-item">
                                        <div>
                                            <NavLink
                                                to="/market"
                                                onClick={() =>
                                                    btn_icon(!showmenu)
                                                }
                                            >
                                                Market Place
                                                <span className="lines"></span>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="navbar-item">
                                        <div>
                                            <NavLink
                                                to="/mypage"
                                                onClick={() =>
                                                    btn_icon(!showmenu)
                                                }
                                            >
                                                My Page
                                                <span className="lines"></span>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Breakpoint>

                        <Breakpoint xl>
                            <div className="menu">
                                <div className="navbar-item">
                                    <div>
                                        <NavLink to="/">
                                            Home
                                            <span className="lines"></span>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="navbar-item">
                                    <div>
                                        <NavLink to="/market">
                                            Market Place
                                            <span className="lines"></span>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="navbar-item">
                                    <div>
                                        <NavLink to="/mypage">
                                            My Page
                                            <span className="lines"></span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </Breakpoint>
                    </BreakpointProvider>
                    <div className="mainside" style={{ right: "165px" }}>
                        {wallet.status === "connected" ? (
                            <div className="connect-wal">
                                <NavLink to="" onClick={disconnect}>
                                    {styleAddress}
                                </NavLink>
                            </div>
                        ) : (
                            <div className="connect-wal">
                                {wallet.status === "connecting" ? (
                                    <NavLink to="">Singing...</NavLink>
                                ) : (
                                    <NavLink
                                        to=""
                                        onClick={() => handleConnect()}
                                    >
                                        Sign In
                                    </NavLink>
                                )}
                            </div>
                        )}
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="mainside">
                        <div className="connect-wal">
                            <NavLink to="" onClick={toggleDialog}>
                                Sign Up
                            </NavLink>
                        </div>
                    </div>
                </div>
                <SimpleDialog open={open} onClose={handleClose} />

                <button
                    className="nav-icon"
                    onClick={() => btn_icon(!showmenu)}
                >
                    <div className="menu-line white"></div>
                    <div className="menu-line1 white"></div>
                    <div className="menu-line2 white"></div>
                </button>
            </div>
        </header>
    );
};

export default Header;
