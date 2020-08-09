import React, { Component, Fragment } from 'react';
import axios from 'axios';
import CommentPost from './CommentPost'
import CommentCard from './CommentCard'


class CommentSection extends Component {
    state = {
        // change later
        authorId:this.props.authorId,
        comments:[],
        postId:this.props.postId
    }

    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        // change later
        var api = 'http://localhost:3000/comment.json';
        axios.get(api)
        .then((response)=>{this.setState({
            comments:response.data.reverse()
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    post(input){
        var api = 'http://localhost:3000/posts/:'+ this.state.commentId +'/comments'
        
        let data = {
            authorId:this.state.authorId,
            body:input,
            postId:this.state.postId
        }
        
        axios.post(api, data)
        .then((response)=>{
            console.log(response)
        })
    }

    render() { 
        return ( 
        <Fragment>
            <div >
                <h3 class='ml-4'> Comments | {this.props.commentCount} </h3>
                <div class='ml-4'> <CommentPost post={this.post.bind(this)} /> </div>
                <div > <CommentCard comments={this.state.comments} /> </div>
            </div>
        </Fragment>
        );
    }
}
 
export default CommentSection;