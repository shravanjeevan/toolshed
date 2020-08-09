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
    
    commit(){
        this.props.post(this.state.input)
        
        this.setState({
            input:''
        })
    }
    
    render() {
        return (
            <Fragment>
                <textarea rows="3" class = "commentInput" value={this.state.input} onChange={this.show.bind(this)} />
                <button class="commentPost" onClick = {this.commit.bind(this)}> Post </button>
            </Fragment>
        );
    }
}
 
export default CommentPost;