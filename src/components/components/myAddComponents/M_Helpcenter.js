import { Link } from "@reach/router";

const M_Helpcenter = (props) => {
    const { h4Text } = props;

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature-box f-boxed style-3 text-center">
                <div className="text">
                    <h4>{h4Text}</h4>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.</p>
                    <Link to="" className="btn-main m-auto">Read more</Link>
                </div>
            </div>
        </div>
    );
}
export default M_Helpcenter;