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
            comments:response.data.comments
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    render() { 
        return ( 
            <Fragment>
                {
                    this.state.comments.map((item,index)=>{
                        return (<div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col-1">
                                            <p> {item.author} </p>
                                            </div>
                                            <div class="col-5">
                                            <p> {item.date} </p>
                                            <p> {item.content} </p>
                                            <p> <span class="glyphicon glyphicon-heart-empty"></span> Likes {item.likes} </p>
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