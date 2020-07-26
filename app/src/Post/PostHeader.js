import React, { Component } from 'react';
import axios from 'axios';
import PostDetails from './PostDetails'

class PostHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title:'',
            type:'',
            date:'',
            name:'',
            icon:'',
            likes:0,
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
            name:response.data.name,
            date:response.data.date,
            likes:response.data.likes,
            icon:response.data.icon,
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    updateLikes=(value)=>{
        var api = '';
        this.setState({likes:value})
        // how to solve Asynchronous here ?
        console.log(this.state.likes)
        
        axios.post(api, this.state.likes)
        // .then((response)=>{
        //     console.log(response)
        // })
        // .catch((error)=>{console.log(error)})
    }
    
    render() {
        let details = this.state.type == "BlogPost" ? <PostDetails 
                                                        title = {this.state.title}
                                                        type = {this.state.type}
                                                        name = {this.state.name}
                                                        date = {this.state.date}
                                                        likes = {this.state.likes}
                                                        icon = {this.state.icon}
                                                        updateLikes = {this.updateLikes.bind(this)}
                                                        /> : ''
    
        return ( 
            <div>
                <div id="post-header">
                    <h1> {this.state.title} </h1>
                    <h4> {this.state.type} </h4>
                </div>
                <div id="details"> </div> {details}
            </div>
        );
    }
}
 
export default PostHeader;