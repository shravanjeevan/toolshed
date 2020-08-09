import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Navbar1 from "../../common/components/navbar"
import ToolsList from './ToolsList';

class ToolsPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar1 />
                <ToolsList />
            </div>
        );
    }
}

export default ToolsPage;