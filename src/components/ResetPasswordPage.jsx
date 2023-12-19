import React, { useState } from 'react';
import { Card } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Alert} from 'antd';
import axios from 'axios';
import {Spin } from 'antd';

const ResetPasswordPage = () => {
  const navigate = useNavigate()
    const [searchparams, setSearchparams] = useSearchParams()
    const [successReg, setSuccessReg] = useState(false)
    const [error, setError] = useState("")
    const [loder, setLoder] = useState(false)
    // const [fromData, setFromData] = useState({
    //   newpassword: "",
    // })
    const [fromData, setFromData] = useState("")

    console.log(fromData)
    let handleLogin = async()=>{

      let data = await axios.post("http://localhost:8000/api/v2/auth/resetpassword",
      
        {
          email:searchparams.get("email"),
          newpassword: fromData,
        }
    
      )

      if(data.data.error){
        setError(data.data.error)
      }else{
        setLoder(true)
        setSuccessReg(true)
        setTimeout(()=>{
          navigate("/login")
        },2000)
        
      }

    }

    let handleFromdata =(e)=>{
      //setFromData({...fromData, [e.target.name]:e.target.value})
      setFromData(e.target.value)
    }

  return (

    <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems:"center"}}>

      <Card className='shadow-card' title="Change your Password" bordered={true} style={{width: 500}}>

          <Form>
            {successReg && <Alert message="Update Successfull" type="success" showIcon  closable/>}
            {error && <Alert message={error} type="error" showIcon  closable/>}
          
            <Form.Item>
                <p>New Password</p>
                <Input name='number' onChange={handleFromdata} type='email' placeholder="New Password" />
            </Form.Item>

            <p style={{color: "red", textAlign: "center", padding: "10px"}}>Did you forget the password ? <Link to={"/login"}><a>Login</a></Link></p>
            
            
              {loder ? <Spin className='spinAlign'/> :
                  <Button onClick={handleLogin} style={{width:"100%"}} type="primary">Reset</Button>
              }
              
          </Form>
      </Card>
    </div>
  )
}

export default ResetPasswordPage