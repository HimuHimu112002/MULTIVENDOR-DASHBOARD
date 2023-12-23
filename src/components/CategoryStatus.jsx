import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const CategoryStatus = () => {

  let [data, setData] = useState([])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Himu',
          value: 'Himu',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: 'Approved',
          value: 'approved',
        },
        {
          text: 'Waiting',
          value: 'waiting',
        },
        {
          text: 'Cancel',
          value: 'rejected',
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      width: '40%',
    },
  ];
  const Showdata = [];
  
  useEffect(()=>{
    async function categoryData(){
      let allCategory = await axios.get(
        "http://localhost:8000/api/v2/category/GetCategory"
      )
      allCategory.data.map((item)=>{
        Showdata.push({
          key: '3',
          name: item.name,
          active: item.isActive ? "Active" : "Inactive",
          status: item.status,
          
        });
      })
      setData(Showdata)
    }
    categoryData()
    
  }, [])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <Table columns={columns} dataSource={data} onChange={onChange} />
  )
}

export default CategoryStatus