import { useEffect } from "react";
import { useLogoutMutation } from "../store/endpoints/authApi"
import { useNavigate } from "react-router";
import { resetStore } from "../store/actions/storeReset";
import { useDispatch } from 'react-redux';


const Logout = () => {
    const [logout, { isSuccess }] = useLogoutMutation()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        logout({})
        dispatch(resetStore());
        navigate('/');
    }, [] )
    

    return <></>
}

export default Logout

