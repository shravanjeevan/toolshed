import React, { Component } from 'react';

import PostDetails from './PostDetails'
import DeletePost from './DeletePost'
import { Link } from 'react-router-dom';

class PostHeader extends Component {
    constructor(props) {
        super(props);
    }
    

    
    render() {
    
        return ( 
            <div class="ml-2">
                <div class="ml-4">
                    <h1 class="mt-2 text-dark"> {this.props.title} </h1>
                    <h5 class="mt-1 text-secondary"> {this.props.type == 'blog_post'? 'Blog Post' : 'Knowleage Base'} </h5>
                </div>
                <div class='mt-4'>
                    <PostDetails 
                    title = {this.props.title}
                    name = {this.props.name}
                    date = {this.props.date}
                    likes = {this.props.likes}
                    icon = {this.props.icon}
                    type = {this.props.type}
                    updateLikes = {this.props.updateLikes}
                    /> 
                </div> 
                
                <div class='ml-4 mt-3'>
                    <button type="button" class="btn btn-danger btn-sm"> <DeletePost deletePost={this.props.deletePost} /> </button>
                    <Link to={"/posts/edit/"+this.props.postId}> <button type="button" class="btn btn-secondary btn-sm ml-1"> Edit </button> </Link>
                </div>
                
            </div>
        );
    }
}
 
export default PostHeader;