import React from 'react';
import { Table, Spin } from "antd";

const Units = ({ units }) => {

    const columns = [
        {
            title: <strong>Unit Name</strong>,
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

    const data = units.map((unit) => {
        return {
            key: unit.id,
            name: unit.unit_name,
            description: <div dangerouslySetInnerHTML={{ __html: unit.description }}/>
        }
    });

    return (
        <>
            {
                units.length ? (
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

export default Units;