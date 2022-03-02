import React, { useEffect, useState } from "react";
import Breakpoint, {
    BreakpointProvider,
    setDefaultBreakpoints,
} from "react-socks";
import { Link } from "@reach/router";
import { useSelector } from "react-redux";
import { Dialog, TextField, DialogTitle, Grid, Button } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import { NotificationManager } from "react-notifications";

import Action from "../../Service/action";

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
    const wallet = useWallet();
    const [name, setName] = useState("");
    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const msg = "Welcome to a ICICB Shooting";

    const handleClose = () => {
        onClose();
    };

    const handleSingup = async () => {
        const validEmail = new RegExp(
            "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
        );
        const validName = new RegExp("^[a-zA-Z]");

        if (wallet.status !== "connected") {
            NotificationManager.error("Please connect Metamask");
            return;
        }

        if (name.trim() === "") {
            NotificationManager.error("Fill the Full Name");
            return;
        }
        if (!validName.test(name) || name.length < 3) {
            NotificationManager.error("Full Name Invalid");
            return;
        }
        if (nick.trim() === "") {
            NotificationManager.error("Fill the Nick Name");
            return;
        }
        if (nick.length < 3) {
            NotificationManager.error("Nick Name Invalid");
            return;
        }
        if (email.trim() === "") {
            NotificationManager.error("Fill the Email");
            return;
        }
        if (!validEmail.test(email)) {
            NotificationManager.error("Email Invalid");
            return;
        }
        if (password.trim() === "") {
            NotificationManager.error("Fill the Password");
            return;
        }
        if (password.length < 8) {
            NotificationManager.error("Password Invalid");
            return;
        }
        try {
            const provider = new ethers.providers.Web3Provider(wallet.ethereum);
            const signer = await provider.getSigner();
            const signature = await signer.signMessage(msg);

            Action.register({
                signature: signature,
                msg: msg,
                name: name,
                nick: nick,
                email: email,
                password: password,
            });

            setName("");
            setNick("");
            setEmail("");
            setPassword("");
            handleClose();
        } catch (err) {
            console.log(err);
            NotificationManager.error("Operation Error");
            setName("");
            setNick("");
            setEmail("");
            setPassword("");
        }
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
                            label="Full Name"
                            type="Text"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Grid>
                    <Grid item xs={10} md={5}>
                        <CssTextField
                            label="Nick Name"
                            type="Text"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setNick(e.target.value)}
                            value={nick}
                        />
                    </Grid>
                    <Grid item xs={10} md={10}>
                        <CssTextField
                            label="Email Address"
                            type="Email"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={10} md={10}>
                        <CssTextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        {wallet.status === "connected" ? (
                            <Button
                                fullWidth
                                color="primary"
                                variant="outlined"
                                className="btn-1"
                                onClick={handleSingup}
                            >
                                Sign Up
                            </Button>
                        ) : (
                            <Button
                                fullWidth
                                color="primary"
                                variant="outlined"
                                className="btn-1"
                                onClick={() => {
                                    wallet.connect();
                                }}
                            >
                                Connect Wallet
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Dialog>
        </ThemeProvider>
    );
}

const Header = function ({ className }) {
    const wallet = useWallet();
    const auth = useSelector((state) => state.auth.auth);
    const msg = "Welcome to a ICICB Shooting";

    console.log(auth);

    const [showmenu, btn_icon] = useState(false);
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
        } else {
            try {
                const provider = new ethers.providers.Web3Provider(
                    wallet.ethereum
                );
                const signer = await provider.getSigner();
                const signature = await signer.signMessage(msg);

                Action.login({ signature: signature });
            } catch (err) {
                console.log(err);
                NotificationManager.error("SignIn Failed");
            }
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
                        {auth !== "" ? (
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
                    {auth === "" ? (
                        <div className="mainside">
                            <div className="connect-wal">
                                <NavLink to="" onClick={toggleDialog}>
                                    Sign Up
                                </NavLink>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
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
