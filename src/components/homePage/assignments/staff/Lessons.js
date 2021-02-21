import React from 'react';
import { Table, Spin } from "antd";

const Lessons = ({ lessons }) => {

    const columns = [
        {
            title: <strong>Lesson Name</strong>,
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            width: "25%"
        }
    ];

    const data = lessons.map((lesson) => {
        return {
            key: lesson.id,
            name: lesson.lesson_name
        }
    });

    return (
        <>
            {
                lessons.length ? (
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

export default Lessons;