import React, { Component } from 'react';
import PostTags from './PostTags';
import PostHeader from './PostHeader';
import RelatedPostList from './RelatedPostList';
import CommentSection from './CommentSection';
import PostBody from './PostBody';
import backend from '../../../bundles/apis/backend';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        const { match:{params} } = this.props;
        this.state = { 
            id: params.slug,
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
    
    getData = async () => {
        try {
            let res = await backend.get('/posts/'+this.state.id);
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
                commentCount:data.commentCount,
                body:data.content,
                authorId:data.createdById
             })
            console.log(data);
        } catch(e) {
            console.log(e);
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
        let userId
        const { user , isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
            userId = user.id
        }
        
    
        let comment = this.state.type === 'blog_post' ? <div>
                                                            <CommentSection 
                                                            commentCount = {this.state.commentCount} 
                                                            postId={this.state.id}
                                                            userId = {userId}
                                                            />
                                                        </div> : ''
    
        return ( 
            
            <div class='ml-3'>
                {/* post header section */}
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
                    /> 
                </div>
                
                <hr />
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
                        <RelatedPostList />
                    </div>
                </div>
                <hr />
                {/* comment section, only when the post is a blog */}
                {comment}
                {/* refresh page after deleting post */}
                <Link id='redir' to="/" />
        </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Post);
 
