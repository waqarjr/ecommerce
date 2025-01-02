import {NavLink} from "react-router-dom";
export const  Router = ()=>{

return(<>
<NavLink to="/">ReadData</NavLink>
<NavLink to='/insertdata'>InsertData</NavLink>
<NavLink to="/update">Update</NavLink>

</>)

} 
export default Router;