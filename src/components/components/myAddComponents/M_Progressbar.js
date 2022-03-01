const M_Progressbar = (props) => {
    const { h5Text, s_width } = props;
    console.log(s_width);

    return (
        <div className="skill-bar style-2">
            <h5>{h5Text}</h5>
            <div className="de-progress">
                <div className='progress-bar' style={{ width: s_width }}></div>
                {s_width}
            </div>
        </div>
    );
}

export default M_Progressbar;