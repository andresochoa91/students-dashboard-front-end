import React, {useState, useRef, useEffect} from 'react';
import { Card, Row, Col, Space, Descriptions, Typography, Button, Input, Form, Tooltip} from 'antd';
// import { MailOutlined } from '@ant-design/icons';
import LoadPic from './LoadPic';

const { Text, Paragraph } = Typography;

const AO2 = () => {
const [editableStr, setEditableStr] = useState();                                     
const [size, setSize]= useState("large");
const [isInEditMode, setIsInEditMode] = useState(false);
const [inputValue, setInputValue] = useState("hello");
const textInput = useRef();
const color = "volcano"; {/*tooltip color*/}

// one way to edit using edit button needs functionality
const editButton = () => {
    setIsInEditMode(true);
    console.log('change');
};

// other way to edit fields by editing a text input
const editField = () => {
    setIsInEditMode(true);
    
    console.log("edit this field")
};

// MF:This is not working why?
const updateField = () => {
   setIsInEditMode(false);
    // setInputValue(textInput.inputValue);
    //inputValue(textInput.current); MF: fix this logic. says is not a function 
    console.log("update");
};
 useEffect(() =>{(
    editField() ? textInput.current.focus() : updateField()
)},[]);

const showEdit = () => {
    return  <div>
    <Input 
        type="text"
        defaultValue= {inputValue}
        ref={textInput}
        />
        <Button onClick={()=>{editField()}}>x</Button> {/*MF:doesnt close*/}
        <Button onClick={updateField}>ok</Button> {/*MF: this is doing the job of the close button*/}
    </div>
};

const showDefault = () => {
    return <div onDoubleClick={editField}>
    {inputValue}
    </div> ;  

};

console.log(showDefault(), "Test")
    
    return (
        <>
       
       {/*test*/}
       {/* { isInEditMode ?
      showEdit() : showDefault()} */}
 
    
        
   
        {/* <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph> */}
        <Card>
            <Typography.Title level={4}>Profile</Typography.Title>
            <Row>
                <Space size={size}>
                <Col>
                <LoadPic />
                </Col>
{/* need a left border vertical here */}
                <Col>
                {/* id feeds in from the database need an api call */}
                <Text strong>ID:</Text> 
                <Descriptions
                extra={<Button type="primary" onClick= {editButton}>Edit</Button>}
                >
                    <Descriptions.Item label = "Last Name"> <Paragraph editable={{ onChange: setEditableStr }}>Smith{editableStr}</Paragraph></Descriptions.Item>
                    
                    {/* <Input label="First Name" bordered={false}/> */}
                    
                    
                    <Descriptions.Item label = "First Name">  <Tooltip title="Double Click to Edit" color={color}>{ isInEditMode ?
                    showEdit() : showDefault()}  </Tooltip>
                     </Descriptions.Item>
                   
                   
                 <br />
                    <Descriptions.Item label = "Class">Sunrise</Descriptions.Item>
                    <Descriptions.Item label = "Email">Bob@gmail.com</Descriptions.Item>
                   
                </Descriptions>
                
                
                </Col>
                </Space>
            </Row>
            
        </Card>
        </>
    )
};



export default AO2 