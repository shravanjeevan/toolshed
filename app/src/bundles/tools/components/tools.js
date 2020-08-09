import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ToolsList from './ToolsList';

class ToolsPage extends React.Component {
    render() {
        return (
            <div>
                <ToolsList />
            </div>
        );
    }
}

export default ToolsPage;