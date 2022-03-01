const M_Itemdetail = (props) => {
    const { imgName, amount, content } = props;

    return (
        <div className="p_list">
            <div className="p_list_pp">
                <span>
                    <img className="lazy" src={imgName} alt="" />
                    <i className="fa fa-check"></i>
                </span>
            </div>
            <div className="p_list_info">
                {amount}
                <span>{content}</span>
            </div>
        </div>
    );
}
export default M_Itemdetail;