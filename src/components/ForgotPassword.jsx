import React, { useState } from 'react';
import { Card } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Alert} from 'antd';
import axios from 'axios';
import {Spin } from 'antd';

const ForgotPawword = () => {
    const [successReg, setSuccessReg] = useState(false)
    const [error, setError] = useState("")
    const [loder, setLoder] = useState(false)
    const [fromData, setFromData] = useState({
      email: "",
    })

    let handleLogin = async()=>{

      let data = await axios.post("http://localhost:8000/api/v2/auth/forgotpassword",
        {
          email: fromData.email,
        }
    
      )

      if(data.data.error){
        setError(data.data.error)
      }else{
        setLoder(true)
        setSuccessReg(true)
        setTimeout(()=>{
          setSuccessReg(false)
        },2000)
        //window.location.href = "https://mail.google.com/"
        
      }

    }

    let handleFromdata =(e)=>{
      setFromData({...fromData, [e.target.name]:e.target.value})
    }

  return (

    <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems:"center"}}>

      <Card className='shadow-card' title="Forgot Password" bordered={true} style={{width: 500}}>

          <Form>
            {successReg && <Alert message="Please check your email" type="success" showIcon  closable/>}
            {error && <Alert message={error} type="error" showIcon  closable/>}
          
            <Form.Item>
                <p>Email Address</p>
                <Input name='email' onChange={handleFromdata} type='email' placeholder="Email Address" />
            </Form.Item>

            <p style={{color: "red", textAlign: "center", padding: "10px"}}>Did you forget the password ? <Link to={"/login"}><a>Login</a></Link></p>
            
            {loder ?  <Spin className='spinAlign'/> : 
                <Button onClick={handleLogin} style={{width:"100%"}} type="primary">Forgot</Button>
            }
              
          </Form>
      </Card>
    </div>
  )
}

export default ForgotPawword
