import React, { Component, Fragment } from 'react';


class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type:this.props.type,
            likes:this.props.likes,
            liked:false,
        };
    }
    
    openProfile(){
        this.setState({name:"Bran"})
    }
    
    likeit(){
        var api = "";
    
        this.setState({liked:!this.state.liked})
        
        if (this.state.liked) {
            this.setState({likes:this.state.likes-1})
        } else {
            this.setState({likes:this.state.likes+1})
        }
        
        this.props.updateLikes(this.state.likes)
    }
    
    render() { 
        let like;
        if (this.state.liked) {
            like = <span class="fas fa-heart"></span>
        } else {
            like = <span class="fas fa-heart"></span>
        }
        
        return ( 
            <Fragment>
            <div class="row">
                <div class="col-md-7">
                    <div class="col-md-1">
                        <div class="profileIcon">
                            <img
                              src={this.props.icon}
                              width="60"
                              height="60"
                              className="profileIcon"
                              alt="profile image"
                            />
                        </div>
                    </div>
                    <div class="col-md-11">
                        {'published by '}
                        <u
                            onClick = {this.openProfile.bind(this)}
                        >
                            <a href="">{this.props.name}</a>
                        </u>
                        <div class = "postdate"> {this.props.date} </div>
                        <span> {this.state.likes} Likes </span> 
                        <> | </>
                        
                        <span onClick = {this.likeit.bind(this)}> {like} </span>
                        <span class = "postInteract">Like this post  </span>
                        <span class = "postInteract">
                        <span class="fas fa-share" data-toggle="modal" data-target="#myModal">Share </span>
                        </span>
                        <span class="fas fa-flag">Flag </span>
                    </div>
                </div>
            </div>
                
                <div class="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                	<div class="modal-dialog">
                		<div class="modal-content">
                			<div class="modal-header">
                				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                					&times;
                				</button>
                				<h4 class="modal-title" id="myModalLabel">
                                    Share
                				</h4>
                			</div>
                			<div class="modal-body">
                                share the link: 
                			</div>
                			<div class="modal-footer">
                				<button type="button" class="btn btn-default" data-dismiss="modal">close
                				</button>
                				<button type="button" class="btn btn-primary">
                					share
                				</button>
                			</div>
                		</div>
                	</div>
                </div>
                
      
            </Fragment>
        );
    }
}
 
export default PostDetails;