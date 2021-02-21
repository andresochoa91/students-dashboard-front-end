// import React, { useEffect, useState, useReducer } from 'react';
// import { Select, DatePicker, Steps, Button, Input, Row, Col, Spin, Typography, Table } from 'antd';
// import styled from "styled-components";
// import 'react-quill/dist/quill.snow.css';
// import _ from "lodash";
// import {
// 	FileDoneOutlined,
// 	YoutubeOutlined,
// 	GithubOutlined,
// 	SmileOutlined,
// } from "@ant-design/icons";

// import * as ROUTES from "../../../../constants/routes";
// import { StyledDivSummary } from "../../assignments/styles";
// import PrivateRoute from '../../../routes/PrivateRoute';
// import CreateInstructions from './createInstructions/CreateInstructions';

// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { Step } = Steps;

// const INITIAL_STATE = {};

// const ACTIONS_ASSIGNMENT_INFO = {
// 	SET_COURSE: 'course',
// 	SET_UNIT: 'unit',
// 	SET_LESSON: 'lesson',
// 	SET_DATE: 'date',
// 	SET_INSTRUCTIONS: 'instructions',
// 	SET_RESOURCES: 'resources',
// 	SET_SUBMISSION: 'submission',
// 	SET_DONE: 'done',
// 	SET_ALL: 'all',
// };

// const reducerAssignmentsInfo = (state, action) => {
// 	switch (action.type) {
// 		case ACTIONS_ASSIGNMENT_INFO.SET_COURSE:
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case ACTIONS_ASSIGNMENT_INFO.SET_UNIT:
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case ACTIONS_ASSIGNMENT_INFO.SET_LESSON:
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case ACTIONS_ASSIGNMENT_INFO.SET_DATE:
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case ACTIONS_ASSIGNMENT_INFO.SET_INSTRUCTIONS:
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case ACTIONS_ASSIGNMENT_INFO.SET_RESOURCES:
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case ACTIONS_ASSIGNMENT_INFO.SET_SUBMISSION:
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case ACTIONS_ASSIGNMENT_INFO.SET_DONE:
// 			return { ...state, [action.payload.field]: action.payload.value };
// 		case ACTIONS_ASSIGNMENT_INFO.SET_ALL:
// 			return { ...action.payload.value };
// 		default:
// 			throw new Error();
// 	}
// };

// const TabsContent = styled.div`
// 	margin: "0 20px";
// `;

// const HeaderStyle = styled.div`
// 	padding: 20px;
// `;

// const AddStudentStyle = styled.div`
// 	display: flex; 
// 	justify-content: flex-end; 
// 	align-items: center;
// 	padding: 0 10px;
// 	p{
// 		margin: 10px; 
// 		padding: 10px;
// 	}

// 	@media (max-width: 576px) {
// 		justify-content: flex-start; 
// 		${'' /* justify-content: center;  */}
// 	}
// `;

// const DropDownStyle = styled.div`
// 	display: flex;
// 	justify-content: flex-end;
// 	padding: 10px; 

// 	@media (max-width: 576px) {
// 		justify-content: flex-start; 
// 		${'' /* justify-content: center;  */}
// 		margin-left: 20px;
// 	}
// `;

// // Search
// const { Search } = Input;

// const CreateAssignments = ({ match, history }) => {
// 	const [stepStatus, setStepStatus] = useState({});
// 	const [assignments, dispatchAssignments] = useReducer(reducerAssignmentsInfo, INITIAL_STATE);
// 	const [current, setCurrent] = useState(0);
// 	const [step, setStep] = useState(0);
// 	const [info, setInfo] = useState();
// 	const [courses, setCourse] = useState();
// 	const [units, setUnits] = useState();
// 	const [lessons, setLessons] = useState();
// 	const [dueDate, setDueDate] = useState();

// 	const steps = [
// 		{
// 			title: "Instructions",
// 			link: `${ROUTES.HOME}/classes/assignments${ROUTES.INSTRUCTIONS}`,
// 			icon: <FileDoneOutlined />,
// 		},
// 		{
// 			title: "Resources",
// 			link: `${ROUTES.HOME}/classes/assignments${ROUTES.VIDEOS}`,
// 			icon: <YoutubeOutlined />,
// 		},
// 		{
// 			title: "Github Link",
// 			link: `${ROUTES.HOME}/classes/assignments${ROUTES.SUBMISSION}`,
// 			icon: <GithubOutlined />,
// 		},
// 		{
// 			title: "Done",
// 			link: `${ROUTES.HOME}/classes/assignments${ROUTES.DONE}`,
// 			icon: <SmileOutlined />,
// 		},
// 	];

// 	useEffect(() => {
// 		const getData = async () => {
// 			const res = await fetch(process.env.REACT_APP_GET_STAFF_ASSIGNMENTS);
// 			const data = await res.json();
// 			setInfo(data);
// 		}
// 		getData();
// 	}, [])

// 	const handleCourseChange = (course) => {
// 		setCourse(course);
// 		dispatchAssignments({
// 			type: 'course',
// 			payload: { field: 'course', value: info[course] },
// 		})
// 		setUnits(info[course].units)
// 	}

// 	const handleUnitChange = (unit) => {
// 		dispatchAssignments({
// 			type: 'unit',
// 			payload: { field: 'unit', value: units[unit] },
// 		})
// 		setLessons(units[unit].weeks);
// 	}

// 	const handleLessonChange = (lesson) => {
// 		dispatchAssignments({
// 			type: 'lesson',
// 			payload: { field: 'lesson', value: lessons[lesson] }
// 		})
// 		setDueDate(lessons[lesson])
// 	}

// 	console.log(assignments)

// 	const handleSubmit = () => {
// 		setStepStatus({ ...stepStatus, [step]: 2 })
// 		// Set step to next step
// 		setStep(step + 1);
// 		if (step < 3) {
// 			// Go to the next step component
// 			history.push(`${steps[step + 1].link}`);
// 		}
// 	}

// 	const onDateChange = (date, dateString) => {
// 		console.log(date, dateString);
// 		dispatchAssignments({
// 			type: 'date',
// 			payload: { field: 'date', value: { date, dateString } }
// 		})
// 	}

// 	// return (
// 	// 	<>
// 	// 		<h4><strong>Assignments</strong></h4>
// 	// 		<Select defaultValue="Choose Course" style={{ width: 120 }} onChange={handleCourseChange} loading={info ? false : true}>
// 	// 			{
// 	// 				info ? info.map((course, index) => {
// 	// 					return (
// 	// 					<Option key={course.course_name} value={index}>{course.course_name}</Option>
// 	// 					)
// 	// 				})
// 	// 					: null
// 	// 			}
// 	// 		</Select>
// 	// 		<Select defaultValue="Choose Unit" style={{ width: 120 }} onChange={handleUnitChange} disabled={units ? false : true}>
// 	// 			{
// 	// 				units ? units.map((unit, index) => {
// 	// 					return (
// 	// 						<Option key={unit.unit_name} value={index}>{unit.unit_name}</Option>
// 	// 					)
// 	// 				}) : null
// 	// 			}
// 	// 		</Select>
// 	// 		<Select defaultValue="Choose Week" style={{ width: 120 }} onChange={handleLessonChange} disabled={lessons ? false : true}>
// 	// 			{
// 	// 				lessons ? lessons.map((week, index) => {
// 	// 					return (
// 	// 						<Option key={`${index}.${week.lesson.lesson_name}`} value={index}>{week.lesson.lesson_name}</Option>
// 	// 					)
// 	// 				}) : null
// 	// 			}
// 	// 		</Select>
// 	// 		<RangePicker onChange={onDateChange} disabled={dueDate ? false : true} />
// 	// 		<Steps current={current}>
// 	// 			{
// 	// 				steps.map((item, index) => (
// 	// 				index === 3 ?
// 	// 					<Step
// 	// 						id={index}
// 	// 						key={item.title}
// 	// 						status={stepStatus[index] === 2 ? 'finish' : null}
// 	// 						title={stepStatus[index] === 2 ?
// 	// 							<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link> :
// 	// 							item.title
// 	// 						}
// 	// 						icon={index !== 3 ? null : <SmileOutlined />}
// 	// 					/> :
// 	// 					<Step
// 	// 						id={index}
// 	// 						key={item.title}
// 	// 						status={stepStatus[index] === 2 ? 'finish' : null}
// 	// 						title={<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link>}
// 	// 						icon={index !== 3 ? null : <SmileOutlined />}
// 	// 					/>
// 	// 				))
// 	// 			}
// 	// 			{/* {!_.isEmpty(stepStatus) ? steps.map((item, index) => (
// 	// 			index === 3 ?
// 	// 				<Step
// 	// 				id={index}
// 	// 				key={item.title}
// 	// 				status={stepStatus[2] === 2 ? 'finish' : null}
// 	// 				title={stepStatus[2] === 2 ?
// 	// 					<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link> :
// 	// 					item.title
// 	// 				}
// 	// 				icon={index !== 3 ? null : <SmileOutlined />}
// 	// 				/> :
// 	// 				<Step
// 	// 				id={index}
// 	// 				key={item.title}
// 	// 				status={stepStatus[index] === 2 ? 'finish' : null}
// 	// 				title={<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link>}
// 	// 				icon={index !== 3 ? null : <SmileOutlined />}
// 	// 				/>
// 	// 			)) : null} */}
// 	// 		</Steps>
// 	// 		<div className="card-container">
// 	// 			<CreateInstructions dispatch={dispatchAssignments} step={step} />
// 	// 			{/* <Switch>
// 	// 			<PrivateRoute
// 	// 				exact
// 	// 				path={`${match.path}${ROUTES.ASSIGNMENTS}${ROUTES.INSTRUCTIONS}`}
// 	// 				component={CreateInstructions}
// 	// 			/>
// 	// 			</Switch> */}
// 	// 		</div>
// 	// 		<StyledDivSummary>
// 	// 			<Button
// 	// 				style={{ marginRight: "1rem" }}
// 	// 				type="primary"
// 	// 				htmlType="submit"
// 	// 				onClick={handleSubmit}
// 	// 			>
// 	// 				Save
// 	// 			</Button>
// 	// 			{
// 	// 				step > 0 && (
// 	// 					<Link to={ step > 0 ? steps[step - 1].link : match.path }>
// 	// 						<Button
// 	// 							style={{ margin: "0 8px" }}
// 	// 							onClick={() => setStep(step - 1)}
// 	// 						>
// 	// 							Previous
// 	// 						</Button>
// 	// 					</Link>
// 	// 				)
// 	// 			}
// 	// 			{
// 	// 				step < steps.length - 1 && (
// 	// 					<Link to={steps[step + 1].link}>
// 	// 					<Button type="primary" onClick={() => setStep(step + 1)}>
// 	// 						Next
// 	// 					</Button>
// 	// 					</Link>
// 	// 				)
// 	// 			}
// 	// 		</StyledDivSummary>
// 	// 	</>
// 	// )

// 	const [selectedStudents, setSelectedStudents] = useState([]);
// 	const [assignments, setAssignments] = useState([]);
// 	const [course, setCourses] = useState([]);
// 	const [temporarySearch, setTemporarySearch] = useState("");
// 	const [currentAssignments, setCurrentAssignments] = useState([]);
// 	// const [student, setStudent] = useState({});

// 	//true when new student added
// 	const [assignmentAdded, setAssignmentAdded] = useState(false);
// 	//true when existing student was edit
// 	const [changedAssignmentInfo, setChangedAssignmentInfo] = useState(false);

// 	console.log(studentAdded);

// 	const onSearch = (event) => {
// 		const name = event.toLowerCase();
// 		console.log(name);
// 		setTemporarySearch(event);
// 		setCurrentStudents(students.filter((student) => {
// 			const firstName = student.first_name.toLowerCase();
// 			const lastName = student.last_name.toLowerCase();
// 			const fullName = `${firstName} ${lastName}`;
// 			return firstName.includes(name) || lastName.includes(name) || fullName.includes(name);
// 		}));
// 	};

// 	useEffect(() => {
// 		getStudents();
// 		getCourses();
// 	}, [assignmentAdded, changedAssignmentInfo])

// 	const getStudents = async () => {
// 		try {
// 			const res = await fetch('https://forked-student-dashboard.herokuapp.com/assignments', {
// 				method: 'GET',
// 				mode: 'cors',
// 				credentials: 'include',
// 				headers: { 'Content-Type': 'application/json' }
// 			})
// 			const data = res.json();
// 			console.log(data);
// 			setAssignments(data);
// 			setCurrentAssignments(data);
// 			setAssignmentAdded(false);
// 			setChangedAssignmentInfo(false);
// 		} catch (e) {
// 			console.log(e.message)
// 		}
// 	}

// 	const getCourses = async () => {
// 		try {
// 			const res = await fetch('https://forked-student-dashboard.herokuapp.com/courses', {
// 				method: 'GET',
// 				mode: 'cors',
// 				credentials: 'include',
// 				headers: { 'Content-Type': 'application/json' }
// 			})
// 			const data = res.json();
// 			console.log(data);
// 			setCourses(data)
// 		} catch (e) {
// 			console.log(e.message);
// 		}
// 	}

// 	// Table
// 	const columns = [
// 		{
// 			title: 'Name',
// 			dataIndex: 'name',
// 		},
// 		{
// 			title: 'ID',
// 			dataIndex: 'id',
// 			width: '10%',
// 			sorter: {
// 				compare: (a, b) => a.id - b.id,
// 			},
// 		},
// 		{
// 			title: 'Email',
// 			dataIndex: 'email',
// 		},
// 		{
// 			title: 'Course',
// 			dataIndex: 'course',
// 		},
// 	];
// 	// Dropdawn menu
// 	// const menu = (
// 	//   <Menu>
// 	//     {courses.map( course => (
// 	//         <Menu.Item key={course.id} >
// 	//           <Checkbox onChange={onChange}>{course.course_name}</Checkbox>
// 	//         </Menu.Item>
// 	//     ))
// 	//     }
// 	//   </Menu>
// 	// );

// 	// function onChange(e) {
// 	//   console.log(`checked = ${e.target.checked}`);
// 	// }

// 	const data = [];

// 	currentStudents.map(student => (
// 		data.push({
// 			key: student.student_id,
// 			id: student.student_id,
// 			name: student.first_name + ' ' + student.last_name,
// 			email: student.user.email,
// 			course: student.student_course.course.course_name,
// 		})
// 		// students.map( student => (
// 		//   data.push({
// 		//     key: student.student_id,
// 		//     id: student.student_id,
// 		//     name: student.first_name + ' ' + student.last_name,
// 		//     email: student.user.email,
// 		//     course: student.student_course.course.course_name,
// 		//   })
// 	))

// 	const onSelectChange = selectedRowKey => {
// 		console.log('selectedStudents changed: ', selectedRowKey);
// 		setSelectedStudents(selectedRowKey);
// 		// setStudent(students.)
// 	};

// 	const rowSelection = {
// 		selectedStudents,
// 		onChange: onSelectChange,
// 	};

// 	return (
// 		<>
// 			{
// 				students.length ? (
// 					<TabsContent>
// 						<Row>
// 							<Col
// 								xs={24}
// 								sm={12}
// 								md={12}
// 								lg={12}
// 							>
// 								<HeaderStyle>
// 									<Typography.Title level={5}>
// 										CTD Students's List
// 									</Typography.Title>
// 									{/* <h3 style={{fontWeight: 'bold'}}>CTD Students's  List</h3> */}
// 									<Search
// 										placeholder="Search"
// 										allowClear
// 										onSearch={onSearch}
// 										enterButton
// 										style={{ width: 200 }}
// 									/>
// 									{
// 										temporarySearch && (
// 											<div>
// 												<br />
// 												<p>
// 													{temporarySearch}&nbsp;
// 													<Button
// 														type="danger"
// 														shape="circle"
// 														onClick={() => {
// 															setTemporarySearch("")
// 															setCurrentStudents(students);
// 														}}
// 													>
// 														x
// 													</Button>
// 												</p>
// 											</div>
// 										)
// 									}
// 								</HeaderStyle>
// 							</Col>
// 							<Col
// 								xs={24}
// 								sm={12}
// 								md={12}
// 								lg={12}
// 							>
// 								<AddStudentStyle>
// 									<p>Add Student</p>
// 									{/* <ModalStudent
// 										courses={courses}
// 										setStudentAdded={setStudentAdded}
// 									/> */}
// 								</AddStudentStyle>

// 								<DropDownStyle>
// 									{/* <ActionButton
// 										students={students}
// 										selectedStudents={selectedStudents}
// 										courses={courses}
// 										setChangedStudentInfo={setChangedStudentInfo}
// 									/> */}
// 								</DropDownStyle>
// 							</Col>
// 						</Row>

// 						<Row>
// 							<Col span={24}>
// 								<Table
// 									pagination={{ pageSize: 10 }}
// 									style={{ margin: '20px 10px' }}
// 									rowSelection={rowSelection}
// 									columns={columns}
// 									dataSource={data}
// 									// scroll={{ x: 1000 }}
// 									scroll={{ y: 1000, x: 800 }}
// 								// scroll={{ y: 1000}}
// 								/>
// 							</Col>
// 						</Row>
// 					</TabsContent>
// 				) : (
// 						<Row>
// 							<Col span={12} offset={12}>
// 								<Spin size="large" />
// 							</Col>
// 						</Row>
// 					)
// 			}
// 		</>
// 	);
// }

// export default CreateAssignments;