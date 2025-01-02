import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export const ReadData = ()=>{

    const [data , setData] = useState([]); 

    const Apifetch = async()=>{
      const alldata= await axios.get("http://localhost:4000/showalldata");
      setData(alldata.data);
    }    

    useEffect(()=>{
      Apifetch();
    },[])


    const delQuery = async (id)=>{
      const del =  await axios.get(`http://localhost:4000/delete/${id}`);
      alert(del.data.message);
      Apifetch();
    }

    const editdata = async (id)=>{
      
       await axios.get(`http://localhost:4000/edit/${id}`);

      Apifetch();
    }

    return(<>
    
    <table  border={2}>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {data.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>           
            <td>
              <Link to={`update/${user._id}`} onClick={()=> editdata(user._id)} ><button>Edit</button></Link>
              <button onClick={() => delQuery(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
  </table>

    </>)

}
export default ReadData;