import React, { useState } from 'react';
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Typography, Modal } from "antd";

const ModalAdd = ({ handleOk, addTitle, children }) => {

	const [ isModalVisible, setIsModalVisible ] = useState(false);

    const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

    return (
        <Typography.Title level={5} className="left">
            { addTitle }
            <PlusCircleTwoTone
                style={{ paddingLeft: 10, paddingRight: 580 }}
                onClick={ showModal }
            />

            {/* <span style={{ paddingLeft: 632 }}>
                { addTitle }
            </span>
            <PlusCircleTwoTone
                onClick={ showModal }
                style={{ paddingLeft: 10 }}
            /> */}
            <Modal
                title={ addTitle }
                visible={isModalVisible}
                onOk={ handleOk }
                onCancel={handleCancel}
                width={ 1000 }
            >
                { children }
            </Modal>
        </Typography.Title>
    )
}

export default ModalAdd
