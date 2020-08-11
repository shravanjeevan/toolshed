import React, { Component } from 'react';

class DeletePost extends Component {
    constructor(props) {
        super(props);
    }
    
    render() { 
        return (
            <div>
                <span data-toggle="modal" data-target="#deleteModal">
                  Delete
                </span>
                
                <div class="modal fade" id="deleteModal" role="dialog" aria-labelledby="DeletePost" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-body">
                        <h4 class="text-center text-dark"> Delete Post </h4>
                        <p></p>
                        <p class="text-center text-dark">Are you sure you want to remove this post?</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button 
                        type="button" 
                        class="btn btn-danger" 
                        data-dismiss="modal"
                        onClick={this.props.deletePost}
                        >
                            Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>  
                
            </div>
        );
    }
}
 
export default DeletePost;