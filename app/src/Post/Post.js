import React from 'react';
import PostTags from './PostTags'
import PostHeader from './PostHeader'
import RelatedPostList from './RelatedPostList'
import CommentSection from './CommentSection'


const Post = () => (

    <div>
        <PostHeader />
        <hr />
        <div class="row">
            <div class="col-9"> mark </div>
            <div class="col-3"> 
                <PostTags />
                <br />
                <RelatedPostList />
            </div>
        </div>
        <hr />
        <CommentSection />

    
    </div>
)

export default Post
