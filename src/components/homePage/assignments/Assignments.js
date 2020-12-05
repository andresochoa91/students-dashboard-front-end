import React, { useState, useEffect, useContext, useReducer } from "react";
import { Link, Route, Switch } from "react-router-dom";
import {
    Card,
    Menu,
    Dropdown,
    Tabs,
    Button,
    Spin,
    Row,
    Col,
    Form,
    Steps,
    Space,
    message,
} from "antd";
import _ from "lodash";
import Icon, {
    FileDoneOutlined,
    DownOutlined,
    LineOutlined,
    YoutubeOutlined,
    GithubOutlined,
    SmileOutlined,
    CheckOutlined,
} from "@ant-design/icons";

import * as ROUTES from "../../../constants/routes";
import { StyledSection, StyledDiv, StyledDivSummary } from "./styles";
import UserContext from "../../contexts/UserContext";
import PrivateRoute from "../../routes/PrivateRoute";
import Instructions from "./Instructions";
import Summary from "./Summary";
import Videos from "./Resources";
import GithubLink from "./GithubLink";
import Done from "./Done";
import TodoList from "../dashboard/todoList/TodoList";
import SmallCalendar from "../dashboard/smallCalendar/SmallCalendar";
import HomeButtons from "../dashboard/homeButtons/HomeButtons";
const { TabPane } = Tabs;
const { Step } = Steps;

const INITIAL_STATE = {};

const ACTIONS = {
    SET_COURSE: "course",
    SET_UNITS: "units",
    SET_LESSONS: "lessons",
    SET_SOURCES: "sources",
    SET_ALL: "all",
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_COURSES:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS.SET_UNITS:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS.SET_LESSONS:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS.SET_SOURCES:
            return { ...state, [action.payload.field]: action.payload.value };
        case ACTIONS.SET_ALL:
            return { ...action.payload.value };
        default:
            throw new Error();
    }
};

const Assignments = ({ match, history }) => {
    const [state, setState] = useState({ key: "Week 1" });
    const { key } = state;
    const [clickedUnitKey, setClickedUnitKey] = useState(0);
    const [clickedLessonKey, setClickedLessonKey] = useState(0);
    const [stepStatus, setStepStatus] = useState([])
    const [current, setCurrent] = useState(-1);
    const [step, setStep] = useState(-1);
    const [classInfo, dispatchClass] = useReducer(reducer, INITIAL_STATE);
    const [userInfo, dispatchUser] = useContext(UserContext);

    useEffect(() => {
        const getAssignments = async () => {
            const dataUnits = await fetch(
                `https://students-dashboard-back-end.herokuapp.com/courses/${userInfo.courseID}`
            );
            const resUnits = await dataUnits.json();
            dispatchClass({
                type: "all",
                payload: { field: "all", value: resUnits.course },
            });
        };
        getAssignments();
    }, []);

    useEffect(() => {
        determineStep(history.location.pathname);
    }, [history.location.pathname])

    const determineStep = (pathLocation) => {
        switch (pathLocation) {
            case '/home/assignments':
                setStep(-1);
                break;
            case '/home/assignments/instructions':
                setStep(0);
                break;
            case '/home/assignments/videos':
                setStep(1);
                break;
            case '/home/assignments/submission':
                setStep(2);
                break;
            case '/home/assignments/done':
                setStep(3);
                break;
        }
    }

    console.log(step)

    const menu = () => {
        return (
            <Menu onClick={({ key }) => setClickedUnitKey(key)}>
                {classInfo
                    ? classInfo.units.map((unit, index) => {
                        return (
                            <Menu.Item key={index}>
                                <a target="_blank" rel="noopener noreferrer">
                                    {unit.unit_name}
                                </a>
                            </Menu.Item>
                        );
                    })
                    : null}
            </Menu>
        );
    };

    const AssignmentsDropdown = () => {
        return (
            <Dropdown overlay={menu}>
                <Button
                    type="primary"
                    className="ant-dropdown-link"
                    to="#"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}>
                    Your Units <DownOutlined />
                </Button>
            </Dropdown>
        );
    };

    const steps = [
        {
            title: "Instructions",
            link: `${match.path}${ROUTES.INSTRUCTIONS}`,
            icon: <FileDoneOutlined />,
        },
        {
            title: "Resources",
            link: `${match.path}${ROUTES.VIDEOS}`,
            icon: <YoutubeOutlined />,
        },
        {
            title: "Github Link",
            link: `${match.path}${ROUTES.SUBMISSION}`,
            icon: <GithubOutlined />,
        },
        {
            title: "Done",
            link: `${match.path}${ROUTES.DONE}`,
            icon: <SmileOutlined />,
        },
    ];

    const nextStep = () => {
        console.log('inside of func', step)
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleSubmit = () => {
        setStepStatus([...stepStatus, step])
        nextStep();
        history.push(`${steps[step + 1].link}`);
    };

    console.log(classInfo)

    const tabPanes = (classKey) => {
        return classInfo.units[classKey].lessons.map((lesson, index) => {
            console.log(lesson)
            return (
                <TabPane
                    tab={<Link to={match.path}>Week {index + 1}</Link>}
                    key={`${index}`}>
                    <Steps current={current}>
                        {steps.map((item, index) => (
                            index === 3 ?
                                <Step
                                    id={index}
                                    key={item.title}
                                    status={stepStatus.includes(2) ? 'finish' : null}
                                    title={stepStatus.includes(2) ?
                                        <Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link> :
                                        item.title
                                    }
                                    icon={index !== 3 ? null : <SmileOutlined />}
                                /> :
                                <Step
                                    id={index}
                                    key={item.title}
                                    status={stepStatus.includes(index) ? 'finish' : null}
                                    title={<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link>}
                                    icon={index !== 3 ? null : <SmileOutlined />}
                                />
                        ))}
                    </Steps>
                    <div className="cardContent">
                        <Switch>
                            <PrivateRoute
                                exact
                                path={`${match.path}`}
                                lesson={lesson.lesson_name}
                                weekNumber={index + 1}
                                unit={classInfo ? classInfo.units[clickedUnitKey] : null}
                                component={Summary}
                            />
                            <PrivateRoute
                                exact
                                path={`${match.path}${ROUTES.INSTRUCTIONS}`}
                                lesson={lesson.lesson_name}
                                component={Instructions}
                            />
                            <PrivateRoute
                                exact
                                path={`${match.path}${ROUTES.VIDEOS}`}
                                lessons={
                                    classInfo.units[clickedUnitKey].lessons[
                                    clickedLessonKey
                                    ]
                                }
                                component={Videos}
                            />
                            <PrivateRoute
                                exact
                                path={`${match.path}${ROUTES.SUBMISSION}`}
                                lesson={lesson}
                                component={GithubLink}
                            />
                            <PrivateRoute
                                exact
                                path={`${match.path}${ROUTES.DONE}`}
                                component={Done}
                            />
                        </Switch>
                        <StyledDivSummary>
                            {step !== -1 && step !== 3 ?
                                <Button
                                    id={index}
                                    style={{ marginRight: "1rem" }}
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleSubmit}
                                >
                                    Save Progress
                                </Button>
                                : null
                            }
                            {step > -1 && (
                                <Link
                                    to={
                                        step > 0
                                            ? steps[step - 1].link
                                            : match.path
                                    }>
                                    <Button
                                        style={{ margin: "0 8px" }}
                                        onClick={() => prevStep()}>
                                        Previous
                                    </Button>
                                </Link>
                            )}
                            {step < steps.length - 1 &&
                                (
                                    step === 2 ?
                                        <Link to={steps[step + 1].link}>
                                            <Button type="primary" disabled={stepStatus.includes(2) ? null : true} onClick={() => nextStep()}>
                                                Next
                                        </Button>
                                        </Link>
                                        :
                                        <Link to={steps[step + 1].link}>
                                            <Button type="primary" onClick={() => nextStep()}>
                                                Next
                                        </Button>
                                        </Link>
                                )
                            }
                        </StyledDivSummary>
                    </div>
                </TabPane>
            );
        });
    };

    return (
        <div className="container-fluid">
            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
                    <StyledDiv>
                        {!_.isEmpty(classInfo) ?
                            <Card
                                className="cards-border"
                                title={
                                    !_.isEmpty(classInfo)
                                        ? classInfo.units[clickedUnitKey].unit_name
                                        : null
                                }
                                extra={<AssignmentsDropdown />}
                                activeTabKey={key}>
                                <StyledSection>
                                    <div className="card-container">
                                        <Tabs
                                            type="card"
                                            onChange={(key) =>
                                                setClickedLessonKey(key)
                                            }>
                                            {tabPanes(clickedUnitKey)}
                                        </Tabs>

                                    </div>
                                </StyledSection>
                            </Card>
                            : (
                                <Row>
                                    <Col span={12} offset={12}>
                                        <Spin size="large" />
                                    </Col>
                                </Row>
                            )
                        }
                    </StyledDiv>
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={10}
                    xl={8}
                    xxl={6}
                    className="site-layout-right">
                    <Space direction="vertical">
                        <HomeButtons />
                        <TodoList />
                        <SmallCalendar history={history} />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default Assignments;