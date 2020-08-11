import React from 'react';
import ToolResult from './ToolResult';
import zlogo from './zoom-logo.png';
import dlogo from './Discord-logo.png';
import slogo from './skype-logo.png';
import tlogo from './teams-logo.png';


class ToolsList extends React.Component {
    render() {
        var tools = [
            {
                id: 1,
                name: 'Zoom',
                icon: zlogo,
                Categories: ['Videoconferencing', 'Zoom', 'Security', 'Kebabs', 'Apple', 'Banana'],
                developer: 'Alvin',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                id: 2,
                name: 'Skype',
                icon: slogo,
                Categories: ['Videoconferencing', 'Skype', 'Security', 'Kebabs', 'Apple', 'Banana'],
                developer: 'Microsoft',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                id: 3,
                name: 'Teams',
                icon: tlogo,
                Categories: ['Videoconferencing', 'teams', 'Security', 'Kebabs', 'Apple', 'Banana'],
                developer: 'Microsoft',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                id: 4,
                name: 'Discord',
                icon: dlogo,
                Categories: ['Videoconferencing', 'Zoom', 'Security', 'Kebabs', 'Apple', 'Banana'],
                developer: 'Discord Inc.',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
        ];

        var postsToShow = tools.map((post) => {
            return (
                <div className="my-4">
                    <ToolResult post={post} />
                </div>
            );
        });


        return (
            <div className="container">
                <h2>{name.toString().replace(/%20/g, ' ')}</h2>
                <div className="mt-4">{postsToShow}</div>
            </div>
        );
    }
}

export default ToolsList;
