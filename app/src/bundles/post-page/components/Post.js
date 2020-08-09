import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostTags from './PostTags';
import PostHeader from './PostHeader';
import RelatedPostList from './RelatedPostList';
import CommentSection from './CommentSection';
import PostBody from './PostBody';
import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:-1,
            title:'',
            type:'',
            tags:[],
            createdOn:'',
            author:'',
            likeCount:0,
            commentCount:0,
            body:'',
            
            icon:'',
        }
    }
    
    // HTTP get all post's info from backend
    componentDidMount(){
        this.getData();
    }
    getData=()=>{
        var api = 'http://localhost:3000/test.json';
        axios.get(api)
        .then((response)=>{this.setState({
            id:response.data.id,
            title:response.data.title,
            type:response.data.type,
            tags:response.data.tags,
            createdOn:response.data.createdOn,
            author:response.data.author,
            likeCount:response.data.likeCount,
            commentCount:response.data.commentCount,
            body:response.data.body,
            
            icon:response.data.icon,
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    // HTTP update likes
    updateLikes=(value)=>{
        var api = '';
        this.setState({likes:value})
        // how to solve Asynchronous here ?
        console.log(this.state.likes)
        
        axios.post(api, this.state.likes)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{console.log(error)})
    }
    
    // HTTP delete post
    deletePost() {
        let api = 'http://localhost:3000/posts/:'+this.state.id;
        axios.delete(api,this.state.id)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{console.log(error)})
    }
    
    render() { 
        return ( 
            
            <div class='ml-3'>
                <div class="mt-2"> 
                    <PostHeader 
                    title = {this.state.title}
                    type = {this.state.type}
                    name = {this.state.author}
                    date = {this.state.createdOn}
                    likes = {this.state.likeCount}
                    icon = {this.state.icon}
                    deletePost = {this.deletePost.bind(this)}
                    updateLikes = {this.updateLikes.bind(this)}
                    /> 
                </div>
                <hr />
                <div className="row">
                    <div className="col-8" id="html-part">
                        {' '}
                        <PostBody body={this.state.body} />{' '}
                    </div>
                    <div className="col-3" id="aside">
                        <PostTags />
                        <br />
                        <RelatedPostList />
                    </div>
                </div>
                <hr />
                <div>
                    <CommentSection commentCount = {this.state.commentCount} postId={this.state.id}/>
                </div>
        </div>
        );
    }
}
 
export default () => {
    let { postId } = useParams();
    console.log('viewing post: ' + postId);
    return (
        <Post />
    )
};