import axios from "axios";
import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";

export const UpdateImages = ()=>{

    const {id}  = useParams();
    const [title , setTitle] = useState("");
    const [price , setPrice] = useState("");
    const [image ,setImage] = useState("");
    const [images , setImages] = useState([]);

    const fetchMainImage = async(id)=>{
        const data = await axios.get(`http://localhost:4000/updateimage/${id}`);
        setPrice(data.data.price);
        setTitle(data.data.title);
        setImage(data.data.image);
    }
    const updateMulImage = async(id)=>{
        const images = await axios.get(`http://localhost:4000/updatemulimage/${id}`)
        setImages(images.data);
    }
    useEffect(()=>{
        fetchMainImage(id)
        updateMulImage(id);
    },[id]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(image);

        const formData  = new FormData;
        formData.append('title',title);
        formData.append('price',price);
        formData.append('image',image);
        // images.map((imag)=>formData.append("images",imag));
        const response = await axios.post("http://localhost:4000/updatedata",formData,{
            headers:{
                "Content-Type":"multipart/form-data",
            }
        })
    }

   const del = (id)=>{
    alert(id);
   }

return (<>
<h4>This is a UpdateImages</h4>

<form  onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label> <br />
    <input type="text" name="title" id="title" value={title}  onChange={(e)=>{setTitle(e.target.value)}} /><br />
    <label htmlFor="price">Price</label> <br />
    <input type="number" name="price" id="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} /><br /><br />
    <img src={image} alt="" width={300} /><br /><br />
    <input type="file" id="image" name="image" onChange={(e)=>{setImage(e.target.files)}} /><br /><br />
    {
    images?.map((user,index) => (<div key={index} style={{display:"inline-block"}}>
        <img src={user.image}  alt="images"  width={150} />
        <button onClick={()=>del(user._id)}>D</button>
    </div>))
}<br/> <br />
<input type="file" name="images" multiple id="images" onChange={(e)=>{setImages([...e.target.files])}} />
<br /><br />

    <button type="submit">Submit</button>

</form>

</>)

}
export default UpdateImages;