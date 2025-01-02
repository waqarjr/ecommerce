import { NavLink, Outlet } from "react-router-dom";

export const Layout = ()=>{

    return(<>
        <Outlet/>
        <NavLink/>
    </>)
}

export default Layout;