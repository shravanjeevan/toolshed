// Main Post page

import React, { Component } from 'react';
import PostTags from './PostTags';
import PostHeader from './PostHeader';
import RelatedPostList from './RelatedPostList';
import CommentSection from './CommentSection';
import PostBody from './PostBody';
import backend from '../../../bundles/apis/backend';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Post.css';

// the main page for blog post and knowledge base items

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title:'',
            type:'',
            tags:[],
            createdOn:'',
            author:'',
            authorId:0,
            likeCount:0,
            commentCount:0,
            body:'',
            // Mockup icon
            icon:'https://cdn.impactinit.com/cdn/x/x@77a40152ac/smss52/smsimg30//pv/ingimagecontributors/ing_47129_18590.jpg',
        }
    }
    
    // HTTP get all post's info from backend
    componentDidMount(){
        this.getData();
    }

    // When navigating from one post page to another, this forces a reload with new data
    componentDidUpdate(prevProps) {
        const {
            match: { params },
        } = this.props;
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.getData();
        }
    }
    
    // get the data from the database 
    getData = async () => {
        const { match:{params} } = this.props;
        let pathType = this.props.location.pathname.split('/')[1];      // either knowledge or posts

        try {
            let res = await backend.get(`/${pathType}/${params.slug}`);
            let { data } = res;
            
            this.setState({
                tags:data.tags,
                title:data.title,
                id:data.id,
                title:data.title,
                type:data.type,
                tags:data.tags,
                createdOn:data.createdOn,
                author:data.createdByDisplayName,
                likeCount:data.likeCount,
                body:data.content,
                authorId:data.createdById,
                toolName: data.toolName
            });
            console.log(data);
        } catch(e) {
            console.log(e);
            if (document.querySelector('#error')) {
                document.querySelector('#error').click();
            }
            
        }
    }
    
    // HTTP update likes
    updateLikes = async () => {
        try {
            let res = await backend.post('/like/'+this.state.id);
            console.log(res);
        } catch(e) {
            console.log(e);
        }
        this.getLikes();
    }
    
    // Grab number of likes for a post
    getLikes = async () => {
        try {
            let res = await backend.get('/like/'+this.state.id);
            let { data } = res;
            this.setState({
                likeCount:data.likeCount,
             })
            console.log(res);
        } catch(e) {
            console.log(e);
        }
    }
    
    // delete post from the data base
    deletePost = async () => {
        try {
            let res = await backend.delete('/posts/'+this.state.id);
            console.log(res);
        } catch(e) {
            console.log(e);
        }
        // redirect to the home page
        document.getElementById("redir").click()
    }
    
    render() {
        let userId;
        const { user, isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
            userId = user.id
        }
        // no need to show comment section for knowledge base item
        let comment = this.state.type === 'blog_post' ? <div>
                                                            <CommentSection
                                                            postId={this.state.id}
                                                            userId = {userId}
                                                            />
                                                        </div> : ''
    
        return ( 
            
            <div class='container' style={{ marginBottom: '100px', marginTop: '100px' }}>
                {/* post header section. Pass in parent-level data down to children */}
                <div class="mt-2"> 
                    <PostHeader 
                    title = {this.state.title}
                    type = {this.state.type}
                    name = {this.state.author}
                    date = {this.state.createdOn}
                    likes = {this.state.likeCount}
                    icon = {this.state.icon}
                    postId = {this.state.id}
                    deletePost = {this.deletePost.bind(this)}
                    updateLikes = {this.updateLikes.bind(this)}
                    userId = {userId}
                    authorId = {this.state.authorId}
                    toolName = {this.state.toolName}
                    /> 
                </div>
                
                <hr className="mb-5"/>
                {/* body section */}
                <div className="row">
                    <div className="col-8" id="html-part">
                        {' '}
                        <PostBody body={this.state.body} />{' '}
                    </div>
                    {/* tags and related posts*/}
                    <div className="col-3" id="aside">
                        <PostTags tags={this.state.tags}/>
                        <br />
                        <RelatedPostList title={this.state.title} />
                    </div>
                </div>
                <hr className="mb-3"/>
                {/* comment section, only when the post is a blog */}
                {comment}
                {/* refresh page after deleting post */}
                <Link id='redir' to="/" />
                <Link id="error" to="/404" replace />
        </div>
        );
    }
}

// hook component up to redux store
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Post);
 
