const M_Wallets = (props) => {
    const { imgName, tab, WalletName, explan } = props;

    return (
        <div className="col-lg-3 mb30">
            <span className="box-url">
                <span className="box-url-label">{tab}</span>
                <img src={imgName} alt="" className="mb20" />
                <h4>{WalletName}</h4>
                <p>{explan}</p>
            </span>
        </div>
    );
}

export default M_Wallets;