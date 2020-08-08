import React from 'react';
import { Link } from 'react-router-dom';
import PostResult from '../../common/components/PostResult';
import {Button}  from 'react-bootstrap'

class BlogsList extends React.Component {
    render() {
        var data = [
            {
                id: 1,
                title: 'This is a Knowledge Base Post',
                isBlogPost: false,
                tags: ['Videoconferencing', 'Zoom', 'Security', 'Kebabs', 'Apple', 'Banana'],
                createdDate: '15 July 2020',
                author: 'Alvin',
                likes: 10,
                comments: 31,
                body:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                id: 2,
                title: 'This is a Blog Post',
                isBlogPost: true,
                tags: ['Videoconferencing', 'Zoom'],
                createdDate: '15 July 2020',
                author: 'Alvin',
                likes: 10,
                comments: 31,
                body:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                id: 3,
                title: 'This is a Blog Post',
                isBlogPost: true,
                tags: ['Shoes', 'Pizza', 'Baking'],
                createdDate: '20 July 2020',
                author: 'CoolBoy55',
                likes: 0,
                comments: 0,
                body:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
            },
            {
                id: 4,
                title: 'This is a Blog Post',
                isBlogPost: true,
                tags: [],
                createdDate: '20 July 2020',
                author: 'CoolBoy55',
                likes: 0,
                comments: 0,
                body: null,
            },
            {
                id: 5,
                title: 'This is a Knowledge Base Post',
                isBlogPost: false,
                tags: ['Snakes'],
                createdDate: '15 July 2020',
                author: null,
                likes: 0,
                comments: 0,
                body:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
            {
                id: 6,
                title: 'This is a Blog Post',
                isBlogPost: true,
                tags: ['Videoconferencing', 'Skype'],
                createdDate: '30 July 2020',
                author: 'Monday',
                likes: 1,
                comments: 3,
                body:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            },
        ];
        var blogs = data.filter(item => item.isBlogPost == true);

        var postsToShow = blogs.map((post) => {
            return (
                <div className="my-4">
                    <PostResult post={post} />
                </div>
            );
        });

        return (
            <div className="container">
                <div><h2>Blogs <Link className="button" to="posts/create"> Create Blog </Link></h2> </div>
                <div className="mt-4">{postsToShow}</div>
            </div>
        );
    }
}

export default BlogsList;
