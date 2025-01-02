import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Updateimage = () => {

    const { id } = useParams();

    const nevigate = useNavigate();
    const [data, setData] = useState(null);
    const [file ,setFile ] = useState();
    const [message , setMessage] = useState();
    const fetchImage = async (id) => {
            const updateimage = await axios.get(`http://localhost:4000/editimage/${id}`);
            setData(updateimage.data);
    };

    useEffect(() => {
        fetchImage(id);
    }, [id]);

    if (!data) {
        return <p>Loading...</p>; 
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formdata =  new FormData();   
        formdata.append("image",file);
        await newFunction();

        async function newFunction() {
            try {
                const response = await axios.post(`http://localhost:4000/editNewImage/${id}`, formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setMessage(response.data.message);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    }
    const  backPage = ()=> {
        nevigate('/');
    }
    return (
        <>
            <h2>This is an update image</h2>
                <h3>{message}</h3>
                <img src={data.image} alt="Image" width={300} style={{borderRadius:10}} />
                <form onSubmit={handleSubmit}>
                    <input type="file"  onChange={(e)=>{setFile(e.target.files[0])}}  /><br />
                    <input type="submit" value="submit"  /><br /><br />
                </form><button onClick={()=>{backPage()}} >Go back to Page</button>

        </>
    );
};

export default Updateimage;
