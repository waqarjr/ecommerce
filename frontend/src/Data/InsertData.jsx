import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const InsertData = ()=>{
    const [message , setMessage] = useState();
    const nevigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;//desturctive method 
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:4000/create",formData);
        setMessage(res.data.message);
        // nevigate('/'); 
      }

return(<>
    <div className="container" align="center" >
    <p >This is a form</p>
    <form action=""  onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} placeholder="Enter name here" onChange={handleChange}/>
      <br /><br />
      <input type="email" name="email" value={formData.email} placeholder="Enter email here"onChange={handleChange}/>
      <br /><br />
      <input
        type="password" name="password" value={formData.password} placeholder="Enter Password here" onChange={handleChange}/>
      <br /><br />
      <input type="submit" />
      <h2>{message}</h2>
    </form>
  </div>

</>)
}
export default InsertData;