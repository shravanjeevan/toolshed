import React, { Component, Fragment } from 'react';
import axios from 'axios';

class CommentPost extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            input:'',
        };
    }
    
    show(e){
        this.setState({
            input:e.target.value
        })
    }
    
    post(){
        var api = 'http://localhost:3000/comment.json'
        
        axios.post(api, this.state.input)
        .then((response)=>{
            console.log(response)
        })
        
        this.setState({
            input:''
        })
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/comment.json'
        axios.get(api)
        .then((response)=>{this.setState({
            comment:response.data.comment,
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    render() {
        return (
            <Fragment>
                <textarea rows="3" class = "commentInput" value={this.state.input} onChange={this.show.bind(this)} />
                <button class="commentPost" onClick = {this.post.bind(this)}> Post </button>
            </Fragment>
        );
    }
}
 
export default CommentPost;