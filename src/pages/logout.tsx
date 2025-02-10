import { useEffect } from "react";
import { useLogoutMutation } from "../store/endpoints/authApi"
import { Navigate } from "react-router";
import { resetStore } from "../store/actions/storeReset";
import { useDispatch } from 'react-redux';


const Logout = () => {
    const [removeSession, { isLoading }] = useLogoutMutation()
    const dispatch = useDispatch();

    useEffect(() => {
        removeSession({})
        dispatch(resetStore());

    }, [] )
    

    return (
        !isLoading ? <Navigate to={"/"} /> : "Closing session..."
    )
}

export default Logout

