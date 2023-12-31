import { useState,useEffect  } from 'react';
import { Layout, theme } from 'antd';
import {UserOutlined,MenuUnfoldOutlined,MenuFoldOutlined,ShoppingCartOutlined,LogoutOutlined} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';

function getItem(label, key, icon, children, type) {
  return {key,icon,children,label,type,};
}
const { Header, Sider, Content } = Layout;

const Home = () => {
  //let dispatch = useDispatch()
  let data = useSelector((state)=> state.userLoginInfo.userInfo)

  useEffect(()=> {
    if(!data){
      navigate("/login")
    }
  },[])

const [collapsed, setCollapsed] = useState(false);
const {
  token: { colorBgContainer },
} = theme.useToken();


const items = [
  //getItem('Discriptions', "/discription",<HomeOutlined />),

  data?.role == "admin" && getItem('User', 'item1', <UserOutlined />, [
    getItem('User List', '/layout'),
    getItem('Marchent', '4'),
    getItem('User', '5'),
  ]),
  {
    type: "divider"
  },
  getItem('Product', 'item2', <ShoppingCartOutlined />, [
    getItem('Add Product', '/addproduct'),
    getItem('All Product', '/allproduct'),
    getItem('Update Product', '/updateproduct'),
    getItem('Delete Product', '/deleteproduct'),
    getItem('All Varient', '/allvarient'),
  ]),
  {
    type: "divider"
  },
  getItem('Category', 'item3', <ShoppingCartOutlined />, [
    getItem('Add category', '12'),
    getItem('All category', 'sub3', null, [getItem('Samsung', '13'), getItem('Apple', '14'),getItem('Poco', '15'),getItem('Redmi', '16'),]),

  ]),
  {
    type: "divider"
  },

  getItem('sub Category', 'item4', <ShoppingCartOutlined />, [
    getItem('Sub category', '18'),
    getItem('All sub category', 'sub4', null, [getItem('Samsung', '19'), getItem('Apple', '20'),getItem('Poco', '21'),getItem('Redmi', '22'),]),
  
  ]),
  {
    type: "divider"
  },

  getItem('Discount', 'item5', <ShoppingCartOutlined />, [
    getItem('Add discout', '23'),
    getItem('All discout', 'sub5', null, [getItem('discout-1', '24'), getItem('discout-2', '25'),getItem('discout-3', '26'),getItem('discout-4', '27'),]),
  
  ]),
  {
    type: "divider"
  },
  
  data?.role == "admin" && getItem('Approve Status', 'item6', <ShoppingCartOutlined />, [
    getItem('Marchent', '24'),
    getItem('Category', '/categoryStatus'),
    getItem('Sub Category', '26'),
  
  ]),
  {
    type: "divider"
  },
  getItem('LogOut', '/signOut', <LogoutOutlined/>),
  {
    type: "divider"
  },

];


let navigate = useNavigate()
let handleShow=(e)=>{
  navigate(e.key)
}

  
return (
  <>
    
    <Layout>

      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
        onClick={handleShow}
        defaultSelectedKeys={['/Layout']}
        defaultOpenKeys={['item1']}
        mode="inline"
        //theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
      
      </Sider>

      <Layout>

        <Header
          style={{padding: 0,background: colorBgContainer,}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
          />
           
        </Header>

        <Content
          style={{margin: '24px 16px',padding: 24,minHeight: 280 }}>
          {/* background: colorBgContainer, */}
          <Outlet/>
        </Content>
      </Layout>
    </Layout>

  </>
)
}

export default Home