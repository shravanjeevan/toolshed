import React from 'react';
import PostTags from './PostTags'
import PostHeader from './PostHeader'
import RelatedPostList from './RelatedPostList'
import CommentSection from './CommentSection'
import PostBody from './PostBody'
import AppHeader from '../bundles/app-page/components/AppHeader';
import "./post.css"

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Post = () => (

    <div>
        <div> <AppHeader /> </div>
        <PostHeader />
        <hr />
        <div className="row">
            <div className="col-md-8" id="html-part"> <PostBody /> </div>
            <div className="col-md-3" id="aside"> 
                <PostTags />
                <br />
                <RelatedPostList />
            </div>
        </div>
        <hr />
        <div class="commentSection"><CommentSection /></div>

    
    </div>
)

export default Post
