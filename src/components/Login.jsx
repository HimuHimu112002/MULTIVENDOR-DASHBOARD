import React, { useState } from 'react';
import { Card } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import { Alert} from 'antd';
import axios from 'axios';
import {Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [successReg, setSuccessReg] = useState(false)
    const [error, setError] = useState("")
    const [loder, setLoder] = useState(false)
    const [passShow, setPassShow] = useState(false)
    const [fromData, setFromData] = useState({
      email: "mdhmaktaruzzaman9101@gmail.com",
      password: "123456789"

    })

    let handleLogin = async()=>{

      let data = await axios.post("http://localhost:8000/api/v2/auth/login",
        {
          email: fromData.email,
          password: fromData.password
        })
      dispatch(userLoginInfo(data.data))
      if(data.data.error){
        setError(data.data.error)
        setTimeout(()=>{
          setError("")
        },2000)
      }else{
        
        if(data.data.role == 'member'){
          setError("This login only for admin and marchent")
        }else{
          setLoder(true)
          setSuccessReg(true)
          setTimeout(()=>{
            setSuccessReg(false)
            
            localStorage.setItem("userInfo", JSON.stringify(data.data))
            navigate("/")
          },4000)
          setTimeout(()=>{
            setLoder(false)
          },2000)
        }
      }

        
    }

    let handleFromdata =(e)=>{
      setFromData({...fromData, [e.target.name]:e.target.value})
    }

  return (

    <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems:"center"}}>

      <Card className='shadow-card' title="Loging" bordered={true} style={{width: 500}}>

        <Form>
          {successReg && <Alert message="Login successfull" type="success" showIcon  closable/>}
          {error && <Alert message={error} type="error" showIcon  closable/>}
        

          <Form.Item>
              <p>Email Address</p>
              <Input name='email' onChange={handleFromdata} type='email' placeholder="Email Address" value={fromData.email} />
          </Form.Item>

          <Form.Item>
              <p>Password</p>
              <Input name='password' onChange={handleFromdata} type={passShow ? "text" : "password"} placeholder="Password" value={fromData.password} />
              {passShow ?(
                      
                      <EyeOutlined onClick={()=>setPassShow(!passShow)} className='passIcon1'></EyeOutlined>
                  ):(
                      <EyeInvisibleOutlined onClick={()=>setPassShow(!passShow)} className='passIcon1'></EyeInvisibleOutlined>
                  )}
          </Form.Item>

          <p style={{color: "red", textAlign: "center", paddingTop: "5px"}}>Don't have an account ? <Link to={"/ragistration"}><a>Signup</a></Link></p>
          <p style={{color: "red", textAlign: "center", paddingBottom: "5px"}}>Did you forget the password ? <Link to={"/forgotPassword"}><a>Forgot</a></Link></p>
          
          {loder ? <Spin className='spinAlign'/> :
              <Button onClick={handleLogin} style={{width:"100%"}} type="primary">Login</Button>
          }
        </Form>
      </Card>
    </div>
  )
}

export default Login