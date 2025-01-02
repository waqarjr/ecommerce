import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateImage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [multiple ,setMultiple] = useState([]);

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("image", file);
      multiple.forEach((img) => formData.append("images", img));
      const response = await axios.post("http://localhost:4000/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
  };
  

  const multipleimages = (e) => {
    setMultiple([...e.target.files]);
  };
  return (
    <>
      <button onClick={()=>{navigate("/")}} >Go To Home Page</button><br /><br />
      <form onSubmit={handleSubmit} id="form">
        <label htmlFor="title">Title </label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br /><br />

        <label htmlFor="price">Price </label>
        <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required /> <br /> <br />

        <label htmlFor="image">Upload Image </label>
        <input type="file" id="image" name="image" onChange={(e) => setFile(e.target.files[0])} required /><br /><br />
        
        <label htmlFor="images">Multiple Images </label>
        <input type="file" name="images" id="images" multiple onChange={multipleimages} /><br /><br />

        <button type="submit">Submit</button>
      </form>
       <p>{message}</p>
    </>
  );
};

export default CreateImage;
