import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import backend from '../../../bundles/apis/backend';

class CommentCard extends Component {
    constructor(props) {
        super(props);
    }
    
    
    delete = async (postId,commentId) => {
        try {
            let res = await backend.delete('/posts/:'+postId+'/comments/:'+commentId);
            let { data } = res;
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    }
    
    render() { 
        return ( 
            <Fragment>
                {
                    this.props.comments.map((item,index)=>{
                        return (
                        <div key = {index+item}>
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
                                        {/* author */}
                                        <div class="col-7 mt-3" id="commentContent">
                                            <Link to="/user/:id" class="text-primary"> {item.author} </Link>
                                            {/* date */}
                                            <span class="text-secondary small mt-1"> {item.createdOn} </span>
                                            {/* delete button */}
                                            <button type="button" class="rounded float-right btn btn-link btn-sm"> 
                                                <span 
                                                data-toggle="modal" 
                                                data-target="#commentModal" 
                                                data-commentId={item.id}> 
                                                    &times; 
                                                </span>
                                            </button>
                                            <p class="mt-3"> {item.body} </p>
                                        </div>
                                    </div>
                                </div>
                        )  
                    })
                } 
                <div class="modal fade" id="commentModal" role="dialog" aria-labelledby="DeleteComment" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    
                    <div class="modal-body">
                        <h4 class="text-center text-dark"> Delete Comment </h4>
                        <p></p>
                        <p class="text-center text-dark">Are you sure you want to delete this comment?</p>
                      </div>
                      
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button 
                        type="button" 
                        class="btn btn-danger" 
                        data-dismiss="modal"
                        // onClick={this.delete.bind(this, item.id, this.props.postId)}
                        >
                            Delete
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </div>
                    
            </Fragment>
        );
    }
}

export default CommentCard;