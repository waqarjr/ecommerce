import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useNavigate} from  "react-router-dom";

export const ShowImage = ()=>{

  const [image ,setImage] = useState([]);
  const nevigate = useNavigate();

    const readimage =async ()=>{
        const data = await axios.get("http://localhost:4000/imageread");
        setImage(data.data);
        console.log("hello world");
    }
    useEffect(()=>{
        readimage();
    },[]);

  const delimage = async(id)=>{
    const del = await axios.get(`http://localhost:4000/delimage/${id}`);
    alert(del.data.message);
    setImage((prevImages) => prevImages.filter((img) => img._id !== id));
  }    

  const Updateimage = async(id)=>{
    await axios.get(`http://localhost:4000/editimage/${id}`);
  }

  const InsertImage = ()=>{
    nevigate('/insertimge')
  }

return(<>
<h3>Show Image</h3>
<button onClick={()=>{InsertImage()}} >Insert Image</button>
<br /><br />
<table border="{2}">
  <tbody><tr>
      <td>Image</td>
      <td>Action</td>
    </tr>
    {image.map((user,index)=>(
    <tr key={index}>
      <td ><img src={user.image} width="200px" alt="" /></td>
      <td> 
      <Link to={`/updateimage/${user._id}`} onClick={()=>Updateimage(user._id)} ><button>Update</button></Link>
      <Link onClick={()=>delimage(user._id)} ><button>Delete</button></Link>
      </td>
    </tr>
    ))}
  </tbody></table>


</>)
}
export default ShowImage;