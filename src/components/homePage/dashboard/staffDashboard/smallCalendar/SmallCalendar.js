import React, { useState, useContext } from "react";
import { Calendar, Badge, Space, Select, Radio, Col, Row, Typography } from "antd";

import "../../../HomePage.css";
import CalendarContext from "../../../../contexts/CalendarContext";
import { StyledDiv, StyledLegend, StyledEvents } from "./styles";
import * as ROUTES from "../../../../../constants/routes";

function onPanelChange(value, mode) {
    console.log(value, mode);
}

const SmallCalendar = ({ history }) => {
    const [selectedDate, setSelectedDate] = useContext(CalendarContext);
    function getListData(value) {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: "warning", content: "" },
                    { type: "success", content: "" },
                ];
                break;
            case 10:
                listData = [{ type: "warning", content: "" }];
                break;
            case 15:
                listData = [{ type: "warning", content: "" }];
                break;
            default:
        }
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <StyledEvents>
                {listData.map((item, index) => (
                    <div key={index}>
                        <Badge status={item.type} text={item.content} />
                    </div>
                ))}
            </StyledEvents>
        );
    }

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }
    function onSelect(selectedDate) {
        setSelectedDate(selectedDate);
        history.push(`${ROUTES.STAFFHOME}${ROUTES.CALENDAR}`);
    }
    return (
        <>
            <Space direction="vertical" className="center">
                <StyledDiv className="shadow cards-border ">
                    <Calendar
                        fullscreen={false}
                        dateCellRender={dateCellRender}
                        onSelect={onSelect}
                        monthCellRender={monthCellRender}
                        headerRender={({ value, type, onChange, onTypeChange }) => {
                            const start = 0;
                            const end = 12;
                            const monthOptions = [];

                            const current = value.clone();

                            const localeData = value.localeData();
                            const months = [];
                            for (let i = 0; i < 12; i++) {
                                current.month(i);
                                months.push(localeData.monthsShort(current));
                            }

                            for (let index = start; index < end; index++) {
                                monthOptions.push(
                                    <Select.Option
                                        className="month-item"
                                        key={`${index}`}>
                                        {months[index]}
                                    </Select.Option>
                                );
                            }
                            const month = value.month();

                            const year = value.year();
                            const options = [];
                            for (let i = year - 10; i < year + 10; i += 1) {
                                options.push(
                                    <Select.Option
                                        key={i}
                                        value={i}
                                        className="year-item">
                                        {i}
                                    </Select.Option>
                                );
                            }
                            return (
                                <div style={{ padding: 8 }}>
                                    <Typography.Title level={4} className="center">
                                        Calendar
                                    </Typography.Title>
                                    <Row gutter={8}>
                                        <Col>
                                            <Radio.Group
                                                size="small"
                                                onChange={(e) =>
                                                    onTypeChange(e.target.value)
                                                }
                                                value={type}>
                                                <Radio.Button value="month">
                                                    Month
                                                </Radio.Button>
                                                <Radio.Button value="year">
                                                    Year
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                className="my-year-select"
                                                onChange={(newYear) => {
                                                    const now = value
                                                        .clone()
                                                        .year(newYear);
                                                    onChange(now);
                                                }}
                                                value={String(year)}>
                                                {options}
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                value={String(month)}
                                                onChange={(selectedMonth) => {
                                                    const newValue = value.clone();
                                                    newValue.month(
                                                        parseInt(selectedMonth, 10)
                                                    );
                                                    onChange(newValue);
                                                }}>
                                                {monthOptions}
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        }}
                        onPanelChange={onPanelChange}
                    />
                </StyledDiv>
            </Space>
            <Space direction="vertical ">
                <StyledLegend className="cal-legend align-self-start">
                    <Badge status="success" text="Week Start" />
                    <br />
                    <Badge status="error" text="Mentor Session" />
                    <br />
                    <Badge status="default" text="Due Day" />
                    <br />
                    <Badge status="processing" text="Holiday" />
                </StyledLegend>
            </Space>
        </>
    );
};

export default SmallCalendar;