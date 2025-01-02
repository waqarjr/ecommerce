import {NavLink} from "react-router-dom";
export const  Router = ()=>{

return(<>
<NavLink to="/">ReadData</NavLink>
<NavLink to='/insetImage'>InsertData</NavLink>
<NavLink to="/updateImage">Update</NavLink>

</>)

} 
export default Router;