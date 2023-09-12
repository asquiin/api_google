import { NavLink } from "react-router-dom";
import './Error.css'

const Error = (props) => {
    return (
        <div>
            <div className="error">ERROR</div>
            <NavLink to='/'>
                <div className="buttonError">
                    <button> GO TO MAIN PAGE</button>
                </div>
            </NavLink>
        </div>
    );
}

export default Error;
