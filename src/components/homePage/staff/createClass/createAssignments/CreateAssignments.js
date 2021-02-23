import React, { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Select, DatePicker, Steps, Button, Card } from 'antd';
import 'react-quill/dist/quill.snow.css';
import _ from "lodash";
import {
	FileDoneOutlined,
	YoutubeOutlined,
	GithubOutlined,
	SmileOutlined,
} from "@ant-design/icons";

import * as ROUTES from "../../../../../constants/routes";
import TextEditor from "../../../textEditor/TextEditor";
import { StyledDivSummary, StyledSection } from "../../styles";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const INITIAL_STATE = {};

const ACTIONS_ASSIGNMENT_INFO = {
	SET_COURSE: 'course',
	SET_UNIT: 'unit',
	SET_LESSON: 'lesson',
	SET_DATE: 'date',
	SET_INSTRUCTIONS: 'instructions',
	SET_RESOURCES: 'resources',
	SET_SUBMISSION: 'submission',
	SET_DONE: 'done',
	SET_ALL: 'all',
};

const reducerAssignmentsInfo = (state, action) => {
	switch (action.type) {
		case ACTIONS_ASSIGNMENT_INFO.SET_COURSE:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_UNIT:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_LESSON:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_DATE:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_INSTRUCTIONS:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_RESOURCES:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_SUBMISSION:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_DONE:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_ALL:
			return { ...action.payload.value };
		default:
			throw new Error();
	}
};


const CreateAssignments = ({ match, history }) => {
	const [stepStatus, setStepStatus] = useState({});
	const [description, setDescription] = useState("");
	const [assignments, dispatchAssignments] = useReducer(reducerAssignmentsInfo, INITIAL_STATE);
	const [current, setCurrent] = useState(0);
	const [step, setStep] = useState(0);
	const [info, setInfo] = useState();
	const [courses, setCourse] = useState();
	const [units, setUnits] = useState();
	const [lessons, setLessons] = useState();
	const [dueDate, setDueDate] = useState();

	const steps = [
		{
			title: "Instructions",
			link: `${ROUTES.HOME}/classes/assignments${ROUTES.INSTRUCTIONS}`,
			step: 0,
			icon: <FileDoneOutlined />,
		},
		{
			title: "Resources",
			link: `${ROUTES.HOME}/classes/assignments${ROUTES.VIDEOS}`,
			step: 1,
			icon: <YoutubeOutlined />,
		},
		{
			title: "Github Link",
			link: `${ROUTES.HOME}/classes/assignments${ROUTES.SUBMISSION}`,
			step: 2,
			icon: <GithubOutlined />,
		},
		{
			title: "Done",
			link: `${ROUTES.HOME}/classes/assignments${ROUTES.DONE}`,
			step: 3,
			icon: <SmileOutlined />,
		},
	];

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(process.env.REACT_APP_GET_COURSES);
			const data = await res.json();
			setInfo(data);
		}
		getData();
	}, [])

	useEffect(() => {
		const page = `${history.location.pathname
			.split("/")[4]}`;
		console.log(page)
		// setStep(item.step);
	}, [step])

	const handleCourseChange = (course) => {
		setCourse(course);
		dispatchAssignments({
			type: 'course',
			payload: { field: 'course', value: info[course] },
		})
		setUnits(info[course].units)
	}

	const handleUnitChange = (unit) => {
		dispatchAssignments({
			type: 'unit',
			payload: { field: 'unit', value: units[unit] },
		})
		setLessons(units[unit].weeks);
	}

	const handleLessonChange = (lesson) => {
		dispatchAssignments({
			type: 'lesson',
			payload: { field: 'lesson', value: lessons[lesson] }
		})
		setDueDate(lessons[lesson])
	}

	console.log(stepStatus)

	const handleSubmit = () => {
		setStepStatus({ ...stepStatus, [step]: 2 })

		if (step < 3) {
			// Set step to next step
			setStep(step + 1);
			// Go to the next step component
			history.push(`${steps[step + 1].link}`);
		}
	}

	const onDateChange = (date, dateString) => {
		console.log(date, dateString);
		dispatchAssignments({
			type: 'date',
			payload: { field: 'date', value: { date, dateString } }
		})
	}

	console.log(step)

	const changeStepLink = () => {
		setStepStatus({ ...stepStatus, [step]: 2 })

		if (step < 3) {
			// Set step to next step
			setStep(step + 1);
		}
		return steps[step].link
	}

	return (
		<>
			<Select defaultValue="Choose Course" style={{ width: 120 }} onChange={handleCourseChange} loading={info ? false : true}>
				{
					info ? info.map((course, index) => {
						return (
							<Option key={course.course_name} value={index}>{course.course_name}</Option>
						)
					})
						: null
				}
			</Select>
			<Select defaultValue="Choose Unit" style={{ width: 120 }} onChange={handleUnitChange} disabled={units ? false : true}>
				{
					units ? units.map((unit, index) => {
						return (
							<Option key={unit.unit_name} value={index}>{unit.unit_name}</Option>
						)
					}) : null
				}
			</Select>
			<Select defaultValue="Choose Week" style={{ width: 120 }} onChange={handleLessonChange} disabled={lessons ? false : true}>
				{
					lessons ? lessons.map((week, index) => {
						return (
							<Option key={`${index}.${week.lesson.lesson_name}`} value={index}>{week.lesson.lesson_name}</Option>
						)
					}) : null
				}
			</Select>
			<RangePicker onChange={onDateChange} disabled={dueDate ? false : true} />
			<Card>
				<h2>Preview {steps[step].title}</h2>
				<StyledSection>
					<div className="card-container"></div>
				</StyledSection>
			</Card>
			<Steps current={current}>
				{
					steps.map((item, index) => (
						<Step
							id={index}
							key={item.title}
							status={stepStatus[index] === 2 ? 'finish' : null}
							title={item.title}
							onClick={() => setStep(index)}
							// title={<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link>}
							icon={index !== 3 ? null : <SmileOutlined />}
						/>
					))
				}
				{/* {!_.isEmpty(stepStatus) ? steps.map((item, index) => (
				index === 3 ?
					<Step
					id={index}
					key={item.title}
					status={stepStatus[2] === 2 ? 'finish' : null}
					title={stepStatus[2] === 2 ?
						<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link> :
						item.title
					}
					icon={index !== 3 ? null : <SmileOutlined />}
					/> :
					<Step
					id={index}
					key={item.title}
					status={stepStatus[index] === 2 ? 'finish' : null}
					title={<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link>}
					icon={index !== 3 ? null : <SmileOutlined />}
					/>
				)) : null} */}
			</Steps>
			<div className="card-container">
				<TextEditor
					text={description}
					setText={setDescription}
				/>
				{/* <CreateInstructions dispatch={dispatchAssignments} step={step} /> */}
				{/* <Switch>
				<PrivateRoute
					exact
					path={`${match.path}${ROUTES.ASSIGNMENTS}${ROUTES.INSTRUCTIONS}`}
					component={CreateInstructions}
				/>
				</Switch> */}
			</div>
			<StyledDivSummary>
				{/* <Link to={() => changeStepLink()}> */}
				<Button
					style={{ marginRight: "1rem" }}
					type="primary"
					htmlType="submit"
					onClick={handleSubmit}
				>
					Save
				</Button>
				{/* </Link> */}
				{
					step > 0 && (
						// <Link to={steps[step - 1].link}>
						<Button
							style={{ margin: "0 8px" }}
							onClick={() => setStep(step - 1)}
						>
							Previous
						</Button>
						// </Link>
					)
				}
				{
					step < steps.length - 1 && (
						// <Link to={steps[step + 1].link}>
						<Button type="primary" onClick={() => setStep(step + 1)}>
							Next
						</Button>
						// </Link>
					)
				}
			</StyledDivSummary>
		</>
	)
}

export default CreateAssignments;