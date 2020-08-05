import React, { Component, Fragment } from 'react';
import axios from 'axios';

class CommentCard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments:[]
        };
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/comment.json';
        axios.get(api)
        .then((response)=>{this.setState({
            comments:response.data.comments.reverse()
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    render() { 
        return ( 
            <Fragment>
                {
                    this.state.comments.map((item,index)=>{
                        return (<div key = {index}>
                                    <div class="row">
                                        <div class="col-md-8" id="commentCard">
                                            <div class="col-md-1" id="commentAuthor">
                                                <img
                                                  src={item.icon}
                                                  width="45"
                                                  height="45"
                                                  className="profileIcon"
                                                  alt="profile icon"
                                                />
                                            </div>
                                        
                                            <div class="col-md-11" id="commentContent">
                                                <a href="" > {item.author} </a>
                                                <span class="commentDate"> {item.date} </span>
                                                <p class="comment"> {item.content} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )  
                    })
                } 
                    
            </Fragment>
        );
    }
}

export default CommentCard;