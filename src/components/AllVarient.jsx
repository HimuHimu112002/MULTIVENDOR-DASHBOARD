import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Space, Table,Button} from 'antd';

const AllVarient = () => {

let [product, setProduct] = useState([])
useEffect(()=>{
    async function allproduct(){
        let data = await axios.get("http://localhost:8000/api/v2/product/GetAllVarient")

        let arr = []
        data.data.map((item, index)=>{
            arr.push({
                Index: index + 1,
                key: item._id,
                image: item.image,

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
        title: 'Variant Name',
        dataIndex: 'productname',
        key: 'productname',

    },

    {
        title: 'Variant Image',
        dataIndex: 'image',
        key: 'image',
        render: (_, record) => (
        <Space size="middle">
            <img alt='No Image' src={record.image} width={100}/>
        </Space>
        ),
    },
    {
        title: 'Action',
        key: 'Action',
        render: (_, record) => (
            <Space size="middle">
            <Button type="primary">Update</Button>
            <Button type="primary" danger>Delete</Button>
            </Space>
        ),
    },
    
    
];

return (
    <Table columns={columns} dataSource={product}/>
)
}
export default AllVarient