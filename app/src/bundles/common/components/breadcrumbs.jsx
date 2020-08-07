import React, { Component } from "react";
import { Breadcrumb} from 'react-bootstrap'
import styled from "styled-components"

const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 15px;
    padding: 7px 40px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
  `;

class Breadcrumbs extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb>
          <Breadcrumb.Item href='home'>Home</Breadcrumb.Item>
        </Breadcrumb>
      </React.Fragment>
    );
  }
}
 
export default Breadcrumbs;