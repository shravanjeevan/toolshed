import React from 'react';
import { Route, Link } from 'react-router-dom';

import './ToolResult.css';

class ToolResult extends React.Component {
    render() {
        let { tool } = this.props;
        var searchPath = `/search?query=${tool.name}`;

        return (
            <div className="post-card card rounded">
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="row">
                            <Link
                                to={searchPath}
                                className="title-text col-sm-8 text-decoration-none tool-title"
                            >
                                {tool.name}
                            </Link>
                            <div className="col-sm-4 text-right font-weight-light">
                                <img
                                    src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/pingus-icon-icon.png"
                                    width="60"
                                    height="60"
                                    className="d-inline-block align-top"
                                    alt={tool.name}
                                />
                            </div>
                        </div>
                    </h5>
                    <h6 class="card-subtitle mb-3">
                        <div className="text-muted">{tool.category}</div>
                    </h6>
                    <hr />
                    <p className="card-text tool-text">
                        <Link to={searchPath} className="text-decoration-none tool-content">
                            <div>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </div>
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default ToolResult;
