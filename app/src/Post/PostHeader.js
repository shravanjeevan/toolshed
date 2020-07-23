import React, { Component } from 'react';
import axios from 'axios';
import PostDetails from './PostDetails'

class PostHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title:'',
            type:'',
        };
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/test.json';
        axios.get(api)
        .then((response)=>{this.setState({
            title:response.data.title,
            type:response.data.type,
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    render() {
        let details = this.state.type == "BlogPost" ? <PostDetails /> : ''
    
        return ( 
            <div>
                <h1> {this.state.title} </h1>
                <h4> {this.state.type} </h4>
                <br />
                {details}
            </div>
        );
    }
}
 
export default PostHeader;