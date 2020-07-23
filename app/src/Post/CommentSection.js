import React, { Component, Fragment } from 'react';
import axios from 'axios';
import CommentPost from './CommentPost'
import CommentCard from './CommentCard'

class CommentSection extends Component {
    state = {
        number:0
    }

    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/comment.json';
        axios.get(api)
        .then((response)=>{this.setState({
            number:response.data.number
         })
        })
        .catch((error)=>{console.log(error)})
    }

    render() { 
        return ( 
        <Fragment>
            <h3>Comments| {this.state.number} </h3>
            <div>
                <CommentPost />
                <CommentCard />
            </div>
        </Fragment>
        );
    }
}
 
export default CommentSection;