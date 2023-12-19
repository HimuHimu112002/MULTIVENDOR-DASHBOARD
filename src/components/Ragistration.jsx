import React, { useState } from 'react';
import { Card } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UploadOutlined,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import {Upload } from 'antd';
import { Alert} from 'antd';
import axios from 'axios';
import {Spin } from 'antd';

const Ragistration = () => {

  const [fileList, setFileList] = useState([]);
  //const [uploading, setUploading] = useState(false);

  const navigate = useNavigate()
  const [successReg, setSuccessReg] = useState(false)
  const [error, setError] = useState("")
  const [loder, setLoder] = useState(false)
  const [passShow, setPassShow] = useState(false)
  const [fromData, setFromData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    //profileImg: ""
  })

  console.log(fromData.profileImg)
  let handleRagistration = async()=>{

  let data = await axios.post("http://localhost:8000/api/v2/auth/registration",
    {
      fullname: fromData.fullname,
      email: fromData.email,
      phone: fromData.phone,
      password: fromData.password,
      //profileImg: fromData.profileImg
    }

  )

  if(data.data.error){
    setError(data.data.error)
    setTimeout(()=>{
      setError("")
    },2000)
  }else{
    setLoder(true)
    setSuccessReg(true)
    setTimeout(()=>{
      setSuccessReg(false)
      navigate(`/otp/${fromData.email}`)
    },4000)
    setTimeout(()=>{
      setLoder(false)
    },2000)
  }

      
  }

  let handleFromdata =(e)=>{
    setFromData({...fromData, [e.target.name]:e.target.value})
  }

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   fileList.forEach((file) => {
  //     formData.append('files[]', file);
  //   });
  //   setUploading(true);
  //   // You can use any AJAX library you like
  //   fetch('https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setFileList([]);
  //       message.success('upload successfully.');
  //     })
  //     .catch(() => {
  //       message.error('upload failed.');
  //     })
  //     .finally(() => {
  //       setUploading(false);
  //     });
  // };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

return (

  <div style={{width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems:"center"}}>

    <Card className='shadow-card' title="Registration" bordered={true} style={{width: 500}}>

      <Form>
        {successReg && <Alert message="Ragistration successfull" type="success" showIcon  closable/>}
        {error && <Alert message={error} type="error" showIcon  closable/>}
      
      
        <Form.Item>
            <p>Full Name</p>
            <Input name='fullname' onChange={handleFromdata} type='text' placeholder="Full Name" />
        </Form.Item>

        <Form.Item>
            <p>Email Address</p>
            <Input name='email' onChange={handleFromdata} type='email' placeholder="Email Address" />
        </Form.Item>

        <Form.Item>
            <p>Phone</p>
            <Input name='phone' onChange={handleFromdata} type='text' placeholder="Phone" />
        </Form.Item>

        <Form.Item>
            <p>Password</p>
            <Input name='password' onChange={handleFromdata} type={passShow ? "text" : "password"} placeholder="Password" />
            {passShow ?(
                    
                    <EyeOutlined onClick={()=>setPassShow(!passShow)} className='passIcon1'></EyeOutlined>
                ):(
                    <EyeInvisibleOutlined onClick={()=>setPassShow(!passShow)} className='passIcon1'></EyeInvisibleOutlined>
                )}
        </Form.Item>

        <p>Upload Profile Image</p>
        
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
  

        <p style={{color: "red", textAlign: "center", padding: "10px"}}>Already have an account ? <Link to={"/login"}><a>Signin</a></Link></p>

        {loder ?  <Spin className='spinAlign'/> : 
          <Button onClick={handleRagistration} style={{width:"100%"}} type="primary">Sign Up</Button>
        }
          
      </Form>
    </Card>
    
  </div>
  )
}

export default Ragistration