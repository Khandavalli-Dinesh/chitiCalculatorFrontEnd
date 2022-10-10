import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const ProtectedRoute = ({children}) =>{

    const isLoggedIn = useSelector(state=>state.users.isLoggedIn);

    if(!isLoggedIn){
        return <Redirect to='/' />
    }

    return children;
}

export default ProtectedRoute;