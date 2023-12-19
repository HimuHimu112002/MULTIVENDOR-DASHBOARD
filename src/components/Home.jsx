import { useState } from 'react';
import { Layout, theme } from 'antd';
import {UserOutlined,MenuUnfoldOutlined,MenuFoldOutlined,HomeOutlined,ShoppingCartOutlined,LogoutOutlined} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';


function getItem(label, key, icon, children, type) {
  return {key,icon,children,label,type,};
}

const { Header, Sider, Content } = Layout;
const Home = () => {

const [collapsed, setCollapsed] = useState(false);
const {
  token: { colorBgContainer },
} = theme.useToken();

const items = [
  getItem('Discriptions', "/discription",<HomeOutlined />),

  getItem('User', 'item1', <UserOutlined />, [
    getItem('User List', '/layout'),
    getItem('Marchent', '4'),
    getItem('User', '5'),
  ]),

  getItem('Product', 'item2', <ShoppingCartOutlined />, [
    getItem('Add Product', '/addproduct'),
    getItem('All Product', '/allproduct'),
    getItem('Update Product', '/updateproduct'),
    getItem('Delete Product', '/deleteproduct'),
    getItem('All Varient', '/allvarient'),
  ]),

  getItem('Product Category', 'item3', <ShoppingCartOutlined />, [
    getItem('Add category', '12'),
    getItem('All category', 'sub3', null, [getItem('Samsung', '13'), getItem('Apple', '14'),getItem('Poco', '15'),getItem('Redmi', '16'),]),

  ]),

  getItem('Product sub Category', 'item4', <ShoppingCartOutlined />, [
    getItem('Sub category', '18'),
    getItem('All sub category', 'sub4', null, [getItem('Samsung', '19'), getItem('Apple', '20'),getItem('Poco', '21'),getItem('Redmi', '22'),]),
  
  ]),

  getItem('Discount', 'item5', <ShoppingCartOutlined />, [
    getItem('Add discout', '23'),
    getItem('All discout', 'sub5', null, [getItem('discout-1', '24'), getItem('discout-2', '25'),getItem('discout-3', '26'),getItem('discout-4', '27'),]),
  
  ]),

  getItem('Logout', '/login', <LogoutOutlined />),


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
        // theme="dark"
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