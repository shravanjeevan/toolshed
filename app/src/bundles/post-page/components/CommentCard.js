import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import backend from '../../../bundles/apis/backend';
import moment from 'moment';

class CommentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:0,
        }
    }
    
    
    delete = async (commentId) => {
        try {
            let res = await backend.delete(`/posts/comments/${commentId}`);
            let { data } = res;
            console.log(data);
        } catch(e) {
            console.log(e);
        }
        this.props.update();
    }
    
    open(itemId) {
        this.setState({
            id:itemId
        })
        document.getElementById("del").click()
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
                                              src="https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png"
                                              width="45"
                                              height="45"
                                              alt="profile icon"
                                            />
                                        </div>
                                        {/* author */}
                                        <div class="col-7 mt-3" id="commentContent">
                                            <Link to="/users/:id" class="text-primary"> {item.author} </Link>
                                            {/* date */}
                                            <span class="text-secondary small mt-1"> {moment(item.createdOn).fromNow()} </span>
                                            {/* delete button */}
                                            {(this.props.userId == item.authorId ?
                                                (<button type="button" class="rounded float-right btn btn-link btn-sm" onClick={this.open.bind(this,item.id)}> 
                                                &times; 
                                                </button>):null)}
                                            <p class="mt-3"> {item.body} </p>
                                        </div>
                                    </div>
                                </div>
                        )  
                    })
                } 
                
                <span 
                    id="del"
                    data-toggle="modal" 
                    data-target={"#commentModal"}> 
                </span>
                
                
                
                <div class="modal fade" id={"commentModal"} role="dialog" aria-labelledby="DeleteComment" aria-hidden="true">
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
                        onClick={this.delete.bind(this, this.state.id)}
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