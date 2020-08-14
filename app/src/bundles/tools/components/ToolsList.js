import React from 'react';
import backend from '../../apis/backend';

import ToolResult from './ToolResult';
import zlogo from './zoom-logo.png';
import dlogo from './Discord-logo.png';
import slogo from './skype-logo.png';
import tlogo from './teams-logo.png';

class ToolsList extends React.Component {
    state = {
        tools: [],
        category: null,
    };

    componentDidMount() {
        if (!this.state.category) {
            this.setState({ category: this.props.category });
            this.getTools();
        }
        this.getTools();
    }

    componentDidUpdate(prevProps) {
        if (this.state.category !== this.props.category) {
            this.setState({ category: this.props.category });
            this.getTools();
        }
    }

    comp;

    getTools = async () => {
        // Decide whether to fetch tools from all categories or a specific category depending on the URL slug
        let path =
            this.props.category === 'all'
                ? `/tools/`
                : `/categories/${this.props.category}`;

        try {
            let res = await backend.get(path);
            let { data } = res;
            let sortedTools = data.sort((a, b) => (a.name > b.name) ? 1 : -1);

            this.setState({ tools: sortedTools });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        // var tools = [
        //     {
        //         id: 1,
        //         name: 'Zoom',
        //         icon: zlogo,
        //         Categories: ['Videoconferencing', 'Zoom', 'Security', 'Kebabs', 'Apple', 'Banana'],
        //         developer: 'Alvin',
        //         description:
        //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        //     },
        //     {
        //         id: 2,
        //         name: 'Skype',
        //         icon: slogo,
        //         Categories: ['Videoconferencing', 'Skype', 'Security', 'Kebabs', 'Apple', 'Banana'],
        //         developer: 'Microsoft',
        //         description:
        //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        //     },
        //     {
        //         id: 3,
        //         name: 'Teams',
        //         icon: tlogo,
        //         Categories: ['Videoconferencing', 'teams', 'Security', 'Kebabs', 'Apple', 'Banana'],
        //         developer: 'Microsoft',
        //         description:
        //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        //     },
        //     {
        //         id: 4,
        //         name: 'Discord',
        //         icon: dlogo,
        //         Categories: ['Videoconferencing', 'Zoom', 'Security', 'Kebabs', 'Apple', 'Banana'],
        //         developer: 'Discord Inc.',
        //         description:
        //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        //     },
        // ];

        let toolsToShow = <div>No tools found.</div>;

        // Generate a list of tools and represent as a list of ToolResult components
        if (this.state.tools && this.state.tools.length > 0) {
            toolsToShow = this.state.tools.map((tool) => {
                return (
                    <div className="my-4 col-lg-6">
                        <ToolResult tool={tool} />
                    </div>
                );
            });
        }

        return (
            <div className="container">
                <h2>
                    {this.props.category === 'all'
                        ? 'All Tools'
                        : this.props.category}
                </h2>
                <div className="mt-4 row">{toolsToShow}</div>
            </div>
        );
    }
}

export default ToolsList;
