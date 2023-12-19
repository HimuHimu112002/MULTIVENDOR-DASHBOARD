import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Space, Table,Button } from 'antd';

const DeleteProduct = () => {
    
let [product, setProduct] = useState([])
useEffect(()=>{
    async function allproduct(){
        let data = await axios.get("http://localhost:8000/api/v2/product/GetAllProduct")

        let arr = []
        data.data.map((item, index)=>{
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
      title: 'Delete',
      key: 'Delete',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={()=>handleDelete(record.key)} type="primary" danger>Delete Product</Button>
        </Space>
      ),
  },
    
];


let handleDelete = async (id) =>{
  let data = await axios.post("http://localhost:8000/api/v2/product/DeletProduct",{
    id
    
  })
}

return (
  <>
    <h1 className='text-center'>Delete Product</h1>
    <Table columns={columns} dataSource={product}/>

  </>
)
}
export default DeleteProduct