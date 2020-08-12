import React, { Component, Fragment } from 'react';
import backend from '../../../bundles/apis/backend';
import CommentPost from './CommentPost'
import CommentCard from './CommentCard'


class CommentSection extends Component {
    state = {
        comments:[],
    }

    componentDidMount(){
        this.getData();
    }
    
    // get comments underneath the post
    getData = async () => {
        try {
            let res = await backend.get(`/posts/${this.props.postId}/comments`);
            let { data } = res;
            this.setState({
                comments:data.reverse()
             })
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    }
    
    post = async (input) => {
        try {
            let data = {
                authorId:3,
                body:input,
                postId:this.props.postId
            }
            console.log(data)
            // let res = await backend.post(`/posts/${this.props.postId}/comments`,data);
            let res = await backend.post('/posts/comments/',data);
            console.log(res,data);
        } catch(e) {
            console.log(e);
        }
        this.getData();
    }

    render() { 
        return ( 
        <Fragment>
            <div >
                <h3 class='ml-4'> Comments | {this.props.commentCount} </h3>
                <div class='ml-4'> <CommentPost post={this.post.bind(this)} /> </div>
                <div > <CommentCard comments={this.state.comments} postId={this.props.postId}/> </div>
            </div>
        </Fragment>
        );
    }
}
 
export default CommentSection;