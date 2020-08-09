import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class CommentCard extends Component {
    constructor(props) {
        super(props);
    }
    
    render() { 
        return ( 
            <Fragment>
                {
                    this.props.comments.map((item,index)=>{
                        return (<div key = {index+item}>
                                    <div class="row">
                                        {/* icons */}
                                        <div class="col-1 mt-4 " id="commentAuthor">
                                            <img
                                              src={item.icon}
                                              width="45"
                                              height="45"
                                              alt="profile icon"
                                            />
                                        </div>
                                    
                                        <div class="col-7 mt-3" id="commentContent">
                                            <Link to="/user/:id" class="text-primary"> {item.author} </Link>
                                            <span class="text-secondary small mt-1"> {item.createdOn} </span>
                                            <p class="mt-3"> {item.body} </p>
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