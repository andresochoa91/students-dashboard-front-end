import React from 'react';
import { Row, Col } from "antd";

import { StyledList } from './styles';

const Resources = ({ lessons }) => {
  return (
    <StyledList>
      <Row
        type="flex"
        style={{ alignItems: "center" }}
        justify="center"
      >
        <Col>
          <h2><strong>Resources</strong></h2>
        </Col>
      </Row>
      <ul>
        {
          lessons.sources.map(source => <li key={source.id}><strong><a href={source.link} target="_blank" rel="noopener noreferrer">{source.source_title}</a></strong></li>)
        }
      </ul>
    </StyledList>
  )
}

export default Resources;