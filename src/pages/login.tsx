import LoginForm from "../forms/loginForm"
import Logo from '../assets/logo-min.png'
import { useSelector } from "react-redux";
import { Navigate } from "react-router";


const Login = () => {

    const user = useSelector((state: any) => {
        console.log(state)
        return state.authApi.queries["getUser(null)"]?.data
    });
    
    return (
        user ? <Navigate to={"/"} /> :
        <div>
            <div className="max-w-2xl min-w-2xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="h-50 mt-4 " >
                    <img className="w-50 mx-auto "
                        src={Logo}
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">LOGIN</h2>
                <div className="space-y-6">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login