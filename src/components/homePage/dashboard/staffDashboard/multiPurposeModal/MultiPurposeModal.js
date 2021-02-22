import React, { useState } from 'react';
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Typography, Modal, Button } from "antd";

const MultiPurposeModal = ({ typeModal="add", handleOk, addTitle, children }) => {

	const [ isModalVisible, setIsModalVisible ] = useState(false);

    const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

    return (
        <Typography.Title level={5} className="left">
            {
                typeModal !== "add" ? (
                    <Button 
                        type={ typeModal === "delete" ? "danger" : "primary"}
                        onClick={ showModal } 
                    >
                        { typeModal === "delete" ? "Delete" : "Edit"}
                    </Button> 
                ) : (
                    <>
                        { addTitle }
                        <PlusCircleTwoTone
                            style={{ paddingLeft: 10, paddingRight: 580 }}
                            onClick={ showModal }
                        />
                    </>
                )
            }

            <Modal
                title={ addTitle }
                visible={isModalVisible}
                onOk={ handleOk }
                okText={ typeModal === "edit" ? "Update" : addTitle }
                okType={ typeModal === "delete" ? "danger" : "primary" }
                onCancel={handleCancel}
                width={ typeModal === "delete" ? 500 : 800 }
            >
                { children }
            </Modal>
        </Typography.Title>
    );
};

export default MultiPurposeModal;
