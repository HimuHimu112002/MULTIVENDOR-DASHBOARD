import React, { useState } from 'react';
import { Card } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Alert} from 'antd';
import axios from 'axios';
import {Spin } from 'antd';
const OtpVerification = () => {
  let params = useParams()

  const navigate = useNavigate()
  const [successReg, setSuccessReg] = useState(false)
  const [error, setError] = useState("")
  const [loder, setLoder] = useState(false)
  const [randomOtp, setRandomOtp] = useState("")

  let handleLogin = async()=>{

    let data = await axios.post("http://localhost:8000/api/v2/auth/otp",
      {
          email: params.email,
          randomOtp: randomOtp,
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
          navigate("/login")
        },4000)
        setTimeout(()=>{
          setLoder(false)
        },2000)

    }
      
  }

return (

  <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems:"center"}}>

    <Card className='shadow-card' title="OTP" bordered={true} style={{width: 500}}>

      <Form>
        {successReg && <Alert message="Otp verification successfull" type="success" showIcon  closable/>}
        {error && <Alert message={error} type="error" showIcon  closable/>}
      

        <Form.Item>
            <p>Otp Number</p>
            <Input name='randomOtp' onChange={(e)=>setRandomOtp(e.target.value)} type='number' placeholder="otp number" />
        </Form.Item>

        
        {/* <p style={{color: "red", textAlign: "center"}}>Go to login page ? <Link to={"/login"}><a>Login</a></Link></p> */}
        
        {loder ? <Spin className='spinAlign'/> :
            <Button onClick={handleLogin} style={{width:"100%"}} type="primary">Otp Match</Button>
        }
      </Form>
    </Card>
  </div>
  )
}

export default OtpVerification