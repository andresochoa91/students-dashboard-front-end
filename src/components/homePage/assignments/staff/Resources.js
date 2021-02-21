import React from 'react';
import { Table, Spin } from "antd";

const Resources = ({ resources }) => {

    const columns = [
        {
            title: <strong>Resource Title</strong>,
            dataIndex: "title",
            key: "title",
            ellipsis: true,
            width: "30%"
        },
        {
            title: <strong>Link</strong>,
            dataIndex: "link",
            key: "link",
            ellipsis: true,
            width: "70%"
        }
    ];

    const data = resources.map((resource) => {
        return {
            key: resource.id,
            title: resource.source_title,
            link: <a href={ resource.link } rel="noopener noreferrer" target="_blank" >{ resource.link }</a>
        }
    });

    return (
        <>
            {
                resources.length ? (
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

export default Resources;