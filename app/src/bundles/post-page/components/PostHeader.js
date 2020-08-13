import React, { Component } from 'react';

import PostDetails from './PostDetails'
import DeletePost from './DeletePost'
import { Link } from 'react-router-dom';

class PostHeader extends Component {
    constructor(props) {
        super(props);
    }
    

    
    render() {
        let url = this.props.type === 'blog_post' ? 'posts' : 'knowledge'
        const dele = this.props.userId == this.props.authorId ? <div class='ml-4 mt-3'>
                    <button type="button" class="btn btn-danger btn-sm"> <DeletePost deletePost={this.props.deletePost} /> </button>
                    <Link to={`/${url}/${this.props.postId}/edit/`}> <button type="button" class="btn btn-secondary btn-sm ml-1"> Edit </button> </Link>
                </div> : null
        
        return ( 
            <div class="ml-2">
                <div class="ml-4">
                    <h1 class="mt-2 text-dark"> {this.props.title} </h1>
                    <h5 class="mt-1 text-secondary"> {this.props.type === 'blog_post'? 'Blog Post' : 'Knowledge Base'} </h5>
                </div>
                <div class='mt-4'>
                    <PostDetails 
                    title = {this.props.title}
                    name = {this.props.name}
                    authorId = {this.props.authorId}
                    date = {this.props.date}
                    likes = {this.props.likes}
                    icon = {this.props.icon}
                    type = {this.props.type}
                    updateLikes = {this.props.updateLikes}
                    /> 
                </div> 
                {dele}
                
            </div>
        );
    }
}
 
export default PostHeader;