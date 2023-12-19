import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Space, Table,Button } from 'antd';

const UpdateProduct = () => {

  let [product, setProduct] = useState([])
  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:8000/api/v2/product/GetAllProduct")

      let arr = []
      data.data.map((item,index)=>{
          arr.push({
            Index: index + 1,
              key: item._id,
              productname: item.productname,
              image: "https://www.startech.com.bd/image/cache/catalog/laptop/msi/cyborg-15-a12ve/cyborg-15-a12ve-01-500x500.webp",

          })
      })
      setProduct(arr)
    }
    allproduct()
  },[])
     

const columns = [
  {
    title: 'Index',
    dataIndex: 'Index',
    key: 'Index',

  },
  {
    title: 'Product Name',
    dataIndex: 'productname',
    key: 'productname',

  },

  {
    title: 'Product Image',
    dataIndex: 'image',
    key: 'image',
    render: (_, record) => (
      <Space size="middle">
        <img alt='No Image' src={record.image} width={50}/>
      </Space>
    ),
  },
  
  
  {
      title: 'Update',
      key: 'Update',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" block>Update Product</Button>
        </Space>
      ),
  },
    
];
  return (
    <>
      <h1>Update Product</h1>
      <Table columns={columns} dataSource={product}/>
    
    </>
  )
}

export default UpdateProduct