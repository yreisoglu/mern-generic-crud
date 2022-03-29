import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="container vh-100">
            <form className="col h-100 justify-content-center align-items-center d-flex flex-column ">
                <div className="row  my-1">
                    <input className="p-2" type="text" placeholder="Username" />
                </div>
                <div className="row  my-1">
                    <input className="p-2" type="text" placeholder="Password" />
                </div>
                <div className="row my-1 ">
                    <Link to="/users" className="btn btn-secondary">Login</Link>
                </div>
            </form>

        </div>
    )
}

export default LoginPage;