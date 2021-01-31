import React, { useState, useContext, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import moment from 'moment';

import { INITIAL_EVENTS, createEventId } from "./event-utils";
import CalendarContext from "../../contexts/CalendarContext";

const FullCalendarDashboard = ({ menuKey, setSelectedKey }) => {
    const [selectedDate, setSelectedDate] = useContext(CalendarContext);
    const [visible, setVisibility] = useState(false);

    const [state, setState] = useState({
        weekendsVisible: true,
        visible: false,
        currentEvents: [],
    });

    useEffect(() => {
        setSelectedKey(menuKey);
    }, [])

    useEffect(() => {
        const getWeeksData = async () => {
            const data = await fetch('https://students-dashboard-back-end.herokuapp.com/courses/4/weeks');
            const res = await data.json();
            console.log(res)
        }
        getWeeksData();
    }, [])

    const showModal = (selectInfo) => {
        setVisibility(true);
    };

    const handleOk = (e) => {
        console.log(e);
        setVisibility(false);
    };

    const handleCancel = (e) => {
        setVisibility(false);
    };

    const handleDateSelect = (selectInfo) => {
        // let title = prompt("Please enter a new title for your event");
        showModal();

        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        // if (title) {
        //     calendarApi.addEvent({
        //         id: createEventId(),
        //         title,
        //         start: selectInfo.startStr,
        //         end: selectInfo.endStr,
        //         allDay: selectInfo.allDay,
        //     });
        // }
    };

    const handleEventClick = (clickInfo) => {
        console.log(clickInfo)
        if (
            window.confirm(
                `Are you sure you want to delete the event '${clickInfo.event.title}'`
            )
        ) {
            clickInfo.event.remove();
        }
    };

    const handleEvents = (events) => {
        setState({
            ...state, currentEvents: events,
        });
    };

    return (
        <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}>
            <Modal
                title="Add Event"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <form>
                    <label for="event">Event Name:</label>
                    <input type="text"></input>
                </form>
            </Modal>
            <div className="container-fluid">
                <FullCalendar
                    theme={true}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    dateClick={(info) => { console.log(info) }}
                    now={selectedDate ? selectedDate._d : null}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={state.weekendsVisible}
                    themeSystem="Lux"
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
                />
            </div>
        </div>
    );


}

function renderEventContent(eventInfo) {
    return (
        <>
            <div>
                <strong> {eventInfo.timeText} </strong>
                <span>
                    <em> {eventInfo.event.title} </em>
                </span>
            </div>
        </>
    );
}

export default FullCalendarDashboard;
