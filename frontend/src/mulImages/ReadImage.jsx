import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const ReadImage =  ()=>{

const [data ,setData] =useState([]);
const [mulImage , setMulImage] = useState([]);
const [message , setMessage] = useState();

const navigate = useNavigate();
const readimage = async()=>{
    const recive = await axios.get("http://localhost:4000/readimage");
    setData(recive.data);
}      

const readMulImage = async()=>{
    const reacive1 = await axios.get("http://localhost:4000/readmulimages")
    setMulImage(reacive1.data);
}

useEffect(()=>{
readimage();
readMulImage();
},[])

const handleDelete = async (id)=>{
    const a = await axios.get(`http://localhost:4000/delimage/${id}`);
    setMessage(a.data.message);
    setData((prevImages) => prevImages.filter((img) => img._id !== id));
    setMulImage((prevImages) => prevImages.filter((img) => img._id !== id));
}

return (<>
<p>This is a ReadImage</p>
<button onClick={()=>{navigate("/creatimage")}} >CreatImage</button>

<table border={3} >
    <tbody  >
    <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Image</th>
        <th>Images</th>
        <th>Action</th>
    </tr>
    {data.map((user) => (
        <tr key={user._id}>
            <td>{user.title}</td>
            <td>{user.price}</td>
            <td><img src={user.image} alt={user.title} width={100}/></td>
            <td>
            {mulImage.filter((img) => img.person_id === user._id).map((filteredImg) => (
                    <img key={filteredImg._id} src={filteredImg.image} alt="" width={70}/> ))} 
                </td>
            <td>
                <Link to={`/updateimage/${user._id}`}  ><button>Edit</button></Link>
                <button onClick={()=>handleDelete(user._id)} >Delete</button>
            </td>
        </tr>
    ))}
    </tbody>
</table>
<p>{message}</p>
</>)

}
export default ReadImage;