import { Button } from 'antd';
import {useEffect  } from 'react';
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';

const LogOut = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let data = useSelector((state)=> state.userLoginInfo.userInfo)
  
    useEffect(()=> {
      if(!data){
        navigate("/login")
      }
    },[])

    let handleLogout = () =>{
        dispatch(userLoginInfo(null)),
        localStorage.removeItem("userInfo")
        navigate("/login")
    }
  return (
    <>
        <h1 className='marchent_style'>Welcome you are <span>{data.role}</span> of our family</h1>
            <div className='logOut_btn'>
              <Button onClick={handleLogout} type="primary" danger>
                LogOut
              </Button>
            </div>
    </>
  )
}

export default LogOut