import React from 'react';
import { Table, Spin } from "antd";

const Courses = ({ courses }) => {

    const columns = [
        {
            title: <strong>Course Name</strong>,
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            width: "25%"
        },
        {
            title: <strong>Description</strong>,
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            width: "75%"
        }
    ];

    const data = courses.map((course) => {
        return {
            key: course.id,
            name: course.course_name,
            description: <div dangerouslySetInnerHTML={{ __html: course.description }}/>
        }
    });

    return (
        <>
            {
                courses.length ? (
                    <Table
                        columns={columns}
                        dataSource={data}
                        scroll={{ y: 500 }}
                        expandIconColumnIndex={2}
                    />
                ) : (
                    <Spin />
                )
            }
        </>
    );
};

export default Courses;
