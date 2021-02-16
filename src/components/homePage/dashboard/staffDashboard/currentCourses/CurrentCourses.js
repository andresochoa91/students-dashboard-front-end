import React, { useState } from "react";
import { Card, Row, Col, Space, Typography, Modal, Form, Input } from "antd";
import styled from "styled-components";
import { PlusCircleTwoTone } from "@ant-design/icons";

//Form Constants
const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 },
};

const validateMessages = {
	required: "${label} is required!",
};

const CurrentCourses = () => {

	const TextBox = styled.div`
		width: 200px;
		height: 92.34px;
		margin: 25px;
		padding: 25px;
		text-align: center;
	`;

  //Modal
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	//Modal Form
	const onFinish = (values) => {
		console.log(values);
	};

	return (
		<>
			<Space direction="vertical">
				<Card
					type="inner"
					hoverable
					className="cards-border"
					style={{ paddingTop: 10 }}
				>
					<Typography.Title level={4} className="left">
						Current Courses
						<PlusCircleTwoTone
							style={{ paddingLeft: 420 }}
							onClick={showModal}
						/>
						<Modal
							title="Create Course"
							visible={isModalVisible}
							onOk={handleOk}
							onCancel={handleCancel}
						>
							<Form
								{...layout}
								name="nest-messages"
								onFinish={onFinish}
								validateMessages={validateMessages}
							>
								<Form.Item
									name={["user", "name"]}
									label="Class Name"
									rules={[{ required: true }]}
								>
									<Input />
								</Form.Item>

								<Form.Item
									name={["user", "introduction"]}
									label="Description"
									rules={[{ required: true }]}
								>
									<Input.TextArea />
								</Form.Item>
							</Form>
						</Modal>
					</Typography.Title>
					<br></br>

					<Row gutter={[16, 16]}>
						<Card
							type="inner"
							hoverable
							className="cards-border"
							style={{ margin: 3 }}
						>
							<Col span={12}>
								<TextBox>
									<h3>
										<strong>Phoenix II</strong>
									</h3>
									Front End II
								</TextBox>
							</Col>
						</Card>

						<Card
							type="inner"
							hoverable
							className="cards-border"
							style={{ margin: 3 }}
						>
							<Col span={12}>
								<TextBox>
									<h3>
										<strong>Pirana II</strong>
									</h3>
									Back End II
								</TextBox>
							</Col>
						</Card>
					</Row>

					<Row gutter={[16, 16]}>
						<Card
							type="inner"
							hoverable
							className="cards-border"
							style={{ margin: 3 }}
						>
							<Col span={12}>
								<TextBox>
									<h3>
										<strong>High Noon</strong>
									</h3>
									Full Stack
								</TextBox>
							</Col>
						</Card>
						<Card
							type="inner"
							hoverable
							className="cards-border"
							style={{ margin: 3 }}
						>
							<Col span={12}>
								<TextBox>
									<h3>
										<strong>Catarina</strong>
									</h3>
									Intro to Programming
								</TextBox>
							</Col>
						</Card>
					</Row>
				</Card>
			</Space>
		</>
	);
};
export default CurrentCourses;
