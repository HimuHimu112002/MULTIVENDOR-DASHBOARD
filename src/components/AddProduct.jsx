import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Input, Row,Button,Select, Tag } from 'antd';
import { EditorState,convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';


// Select section ======================
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};
// Select section ====================== 

const AddProduct = () => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [store, setStore] = useState([]);
  const [productName, setproductName] = useState("");
  const [StoreName, setStoreName] = useState("");

  const [productNameerr, setproductNameerr] = useState("");
  const [StoreNameerr, setStoreNameerr] = useState("");
  const [discriptionerr, setdiscriptionerr] = useState("");

  const onEditorStateChange = (newEditorState) => {
  setEditorState(newEditorState);
  };


// Get All store====================================
useEffect(()=>{
  async function GetStore(){
    let arr = []
    let data = await axios.get("http://localhost:8000/api/v2/marchent/AllStore")
    data.data.map((item)=>{
      arr.push({
        value: item._id,
        label: item.storename
      })
    })
    setStore(arr)
  }
  GetStore()
},[])
let InputProductName = (e)=>{
  setproductName(e.target.value)
  setproductNameerr("")
}


//Add Product===============================
let handleProductUpload = async () =>{
  if(!productName){
    setproductNameerr("Please input product name")
  }else if(!StoreName){
    setStoreNameerr("Please select store name")
  }else if(!editorState){
    setdiscriptionerr("Please input product discription")
  }else{
    await axios.post("http://localhost:8000/api/v2/product/CreateProduct",{
      productname:productName,
      discription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      store:StoreName,
    })
  }
}


return (
  <Row>
    <Col span={14}>
    
      <h1>Add Your Product</h1>
      <h2>Product Name</h2>
      <Input onChange={InputProductName} placeholder="Product Name" />
      <p className='errSms'>{productNameerr}</p>
      <br />
      <br />
      <h2>Product Description</h2>
      <div className='borderS'>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <p className='errSms'>{discriptionerr}</p>
      <br />
      <h2>Select Product Store</h2>
      <Select
        onChange={(e)=>setStoreName(e)}
        mode="single"
        tagRender={tagRender}
        style={{width: '100%',}}
        options={store}
      />
      <p className='errSms'>{StoreNameerr}</p>
      <br/>
      <br/>
      <Button onClick={handleProductUpload} className='pt-4' type="primary">Upload Product</Button>
    </Col>
  </Row>
)
}
export default AddProduct