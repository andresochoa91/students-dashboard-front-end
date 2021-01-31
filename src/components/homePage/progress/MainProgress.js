/** @format */

import React, { useState, useEffect } from "react";
import { Progress, Card, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

const MainProgress = () => {
    //Fetching data from airtable
    const getMentorsData = async () => {
        const response = await fetch(
            "https://api.airtable.com/v0/appm5NPkqO7P8ePUK/Progress?api_key=keyclOytaXo7NHQ8M&sort%5B0%5D%5Bfield%5D=id&sort%5B0%5D%5Bdirection%5D=asc"
        );
        const progressData = await response.json();
        return progressData;
    };

    const [progress, setProgress] = useState(null);

    useEffect(() => {
        getMentorsData().then((data) => setProgress(data));
    }, []);

    const { Meta } = Card;
    return (
        <>
            <Card hoverable className="cards-border">
                <Typography.Title level={4} className="left">
                    Your Progress
                </Typography.Title>
                <div>
                    <Row
                        gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }}
                        wrap={false}
                        className="center">
                        {progress
                            ? progress.records.map((week) => {
                                  return (
                                      <Col flex="auto">
                                          <Card
                                              hoverable
                                              style={{
                                                  height: 255,
                                                  textAlign: "center",
                                                  padding: "8px 0",
                                                  margin: "8px 0",
                                              }}
                                              cover={
                                                  <Link to="/home/assignments/">
                                                      {" "}
                                                      <Progress
                                                          type="circle"
                                                          strokeColor={{
                                                              "0%": "#108ee9",
                                                              "100%": "#87d068",
                                                          }}
                                                          percent={
                                                              week.fields.Progress
                                                          }
                                                      />
                                                  </Link>
                                              }>
                                              <Meta
                                                  title={week.fields.Unit}
                                                  description="This is the description"
                                              />
                                          </Card>
                                      </Col>
                                  );
                              })
                            : null}
                    </Row>
                </div>
            </Card>
        </>
    );
};
export default MainProgress;
