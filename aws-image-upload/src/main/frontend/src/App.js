import React,{useState,useEffect,useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useDropzone} from 'react-dropzone';


const URL= "http://localhost:8080/api/v1/user-profile";

function MyDropzone({userProfileId}) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const file = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file",file);

    axios.post(`http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
                formData,
                {
                  headers:{
                    "Content-Type":"multipart/form-data",
                  }
                }).then(()=>{
                  console.log("files uploaded successfully");
                }).catch(err=>{
                  console.log(err);
                })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

function App() {  

  const [user,setUser] = useState(null);

  useEffect(()=>{

    function fetchUser(){
      axios.get(URL).then((response)=>{
        setUser(response.data);
        console.log(response.data);
      })
    }

    fetchUser();
   
  },[]);



  if(!user) return <h1>Hello</h1>;


  return (
    <div className="App">
      <table>
      <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
          </tr>
        {user.map((user,index)=>(

          
         
          <tr key={index}>
            <td>{user.userProfileId}</td>
            <td>{user.username}</td>
            <td><MyDropzone userProfileId={user.userProfileId}/></td>
            
          </tr>
         
        ))}
      </table> 
      
     
    </div>
  );
}

export default App;
