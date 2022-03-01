const M_Activity = (props) => {
    const { imgName, h4Text, before, content, behind } = props;

    return (
        <li className="act_follow">
            <img className="lazy" src={imgName} alt="" />
            <div className="act_list_text">
                <h4>{h4Text}</h4>
                {before}<span className='color'>{content}</span>{behind}
                <span className="act_list_date">
                    10/07/2021, 12:40
                </span>
            </div>
        </li>
    );
}
export default M_Activity;