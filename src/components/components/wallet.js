import React from "react"
import M_Wallets from "./myAddComponents/M_Wallets"

const Wallet = () => (
    <div className="row">
        <M_Wallets imgName="./img/wallet/1.png" tab="Most Popular" walletName="Metamask" explan="Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide." />
        <M_Wallets imgName="./img/wallet/2.png" tab="" walletName="Bitski" explan="Bitski connects communities, creators and brands through unique, ownable digital content." />
        <M_Wallets imgName="./img/wallet/3.png" tab="" walletName="Fortmatic" explan="Let users access your Ethereum app from anywhere. No more browser extensions." />
        <M_Wallets imgName="./img/wallet/4.png" tab="" walletName="WalletConnect" explan="Open source protocol for connecting decentralised applications to mobile wallets." />
        <M_Wallets imgName="./img/wallet/5.png" tab="" walletName="Coinbase Wallet" explan="The easiest and most secure crypto wallet. ... No Coinbase account required." />
        <M_Wallets imgName="./img/wallet/6.png" tab="" walletName="Arkane" explan="Make it easy to create blockchain applications with secure wallets solutions." />
        <M_Wallets imgName="./img/wallet/7.png" tab="" walletName="Authereum" explan="Your wallet where you want it. Log into your favorite dapps with Authereum." />
        <M_Wallets imgName="./img/wallet/8.png" tab="" walletName="Torus" explan="Open source protocol for connecting decentralised applications to mobile wallets." />
    </div>
);
export default Wallet;