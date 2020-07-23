import React, { Component, Fragment } from 'react';
import axios from 'axios';


class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type:'',
            date:'',
            name:'',
            icon:'',
            likes:0,
            liked:false,
        };
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/test.json';
        axios.get(api)
        .then((response)=>{this.setState({
            name:response.data.name,
            date:response.data.date,
            likes:response.data.likes,
            type:response.data.type,
            icon:response.data.icon,
            liked:response.data.liked
         })
        })
        .catch((error)=>{console.log(error)})
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
        
        axios.post(api, this.state.likes)
        .then((response)=>{
            console.log(response)
        })
    }
    
    render() { 
        let like;
        if (this.state.liked) {
            like = <span class="glyphicon glyphicon-heart"></span>
        } else {
            like = <span class="glyphicon glyphicon-heart-empty"></span>
        }
        
        return ( 
            <Fragment>
            <div class="row">
            <div class="col-1">
                <img
              src={this.state.icon}
              width="45"
              height="45"
              className="profileIcon"
              alt="profile image"
            />
            </div>
            <div class="col-8">
                {'published by '}
                <u
                    onClick = {this.openProfile.bind(this)}
                >
                    <a href="">{this.state.name}</a>
                </u>
                <p> {this.state.date} </p>
                <span> {this.state.likes} Likes </span> 
                <> | </>
                
                <span onClick = {this.likeit.bind(this)}> {like} </span>
                <>Like this post  </>
                <span class="glyphicon glyphicon-share" data-toggle="modal" data-target="#myModal">Share </span>
                <span class="glyphicon glyphicon-flag">Flag </span>
            </div>
            </div>
                
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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