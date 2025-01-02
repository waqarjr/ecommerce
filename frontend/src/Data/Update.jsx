import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  const neviagte = useNavigate();
  const [data, setData] = useState(null); 
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");

  const { id } = useParams();

  const Apifetch = async (id) => {
      const get = await axios.get(`http://localhost:4000/edit/${id}`);
      setData(get.data);
      setEmail(get.data.email);
      setName(get.data.name);
  };  

  useEffect(() => {
    Apifetch(id);
  }, [id]);

  if (!data) {
    return <p>Loading...</p>; 
  }
  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    
    const edit = {name,email};
    const sucEdit = await axios.post(`http://localhost:4000/update/${id}`,edit);
    alert(sucEdit.data.message);
    neviagte('/');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label><br />
        <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} /><br />
        <label htmlFor="email">Email</label><br />
        <input type="text" email="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br /><br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Update;
