import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Image = ()=>{
    
    const nevigate = useNavigate();

    const [file ,setFile]= useState();
    const [message ,setMessage] = useState();
    const handleSubmit =async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        await newFunction();

        async function newFunction() {
            try {
                const response = await axios.post("http://localhost:4000/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setMessage(response.data.message);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
    const backPage = ()=>{
        nevigate("/")
    }
    return(<>
    
    <h3>Image File</h3>
    <h3>{message}</h3>
    <form action="" onSubmit={handleSubmit} >
        <input type="file" onChange={(e) => setFile(e.target.files[0])} /><br /><br />
        <input type="submit"  />
    </form><br />
    <button onClick={()=>{backPage()}} >Back TO Page</button>
    </>)

}

export default Image;