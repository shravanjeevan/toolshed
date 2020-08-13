import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import OnClaps from './onClaps.png'
import OffClaps from './offClaps.png'

class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes:this.props.likes,
            liked:false,
            shared:false,
            flaged:false
        };
    }
    
    
    // change likes count
    likeit(){
        
        if (this.state.liked) {
            
        } else {
            this.setState({liked:true})
            this.props.updateLikes(this.state.likes)
        }
        
        
    }
    
    // change flag status
    flagit(){
    
        this.setState({flaged:!this.state.flaged})
        // this.props.updateLikes(this.state.flaged)
    }
    
    render() { 
        // interaction of like, share, flag
        let like, share, flag;
        
        // change date format
        let time = moment(this.props.date).format('YYYY-MM-DD HH:mm');
        
        // like icons
        if (this.state.liked) {
            like = <span>
                       <img
                          src= {OnClaps}
                          width="25"
                          height="25"
                          alt="OnClaps"
                        />
                    </span>
        } else {
            like = <span>
                        <img
                          src= {OffClaps}
                          width="25"
                          height="25"
                          alt="OffClaps"
                        />
                    </span>
        }
        
        // when the type is blog post we show likes and author, otherwise no
        let likeSection = this.props.type === 'blog_post' ?  <div>
                                                                <span 
                                                                class= 'mx-2' 
                                                                onClick = {this.likeit.bind(this)}> 
                                                                    {like} 
                                                                </span>
                                                                <span class='text-secondary'>
                                                                    {this.props.likes}
                                                                </span> 
                                                                <> | </>
                                                                {/* <span class = "postInteract">Like this post</span> */}
                                                            </div> : ''
                                                            
        // when the type is blog post we show profile icon, otherwise no                                                    
        let profile = this.props.type === 'blog_post' ? <div class="col-1">
                                                            <div class='ml-4'>
                                                                <img
                                                                  src={this.props.icon}
                                                                  width="60"
                                                                  height="60"
                                                                  className="profileIcon"
                                                                  alt="Profile Image"
                                                                />
                                                            </div>
                                                        </div> : ''
        // change margin to align                                   
        let margin = this.props.type === 'blog_post' ? "col-6 mt-2" : "col-6 mt-2 ml-4"
        
        // share icons
        share = <span>
                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-share" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M11.724 3.947l-7 3.5-.448-.894 7-3.5.448.894zm-.448 9l-7-3.5.448-.894 7 3.5-.448.894z"/>
                      <path fill-rule="evenodd" d="M13.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-11-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg> 
                </span>
        
        // flag icons
        if (this.state.flaged) {
            flag = <span>
                        <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-flag-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M3.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/>
                          <path fill-rule="evenodd" d="M3.762 2.558C4.735 1.909 5.348 1.5 6.5 1.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126a8.89 8.89 0 0 0 .593-.25c.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 0 1 9 9.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916A.5.5 0 0 1 3.5 9V3a.5.5 0 0 1 .223-.416l.04-.026z"/>
                        </svg>
                    </span>
        } else {
            flag = <span>
                        <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-flag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M3.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/>
                              <path fill-rule="evenodd" d="M3.762 2.558C4.735 1.909 5.348 1.5 6.5 1.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126a8.89 8.89 0 0 0 .593-.25c.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 0 1 9 9.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916a.5.5 0 1 1-.515-.858C4.735 7.909 5.348 7.5 6.5 7.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126.187-.068.376-.153.593-.25.058-.027.117-.053.18-.08.456-.204 1-.43 1.64-.512V2.543c-.433.074-.83.234-1.234.414l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 0 1 9 3.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916a.5.5 0 0 1-.554-.832l.04-.026z"/>
                        </svg>
                    </span>
        }
        
        return ( 
            <Fragment>
            <div class="row mt-3">
                {/* profile icon */}
                {profile}
                
                {/* change the margin of this part if it is knowledge base */}
                <div class={margin}>
                    {/* author name */}
                    {'Published by '}
                    <u>
                        <Link to={`/users/${this.props.authorId}`} class="text-primary">{this.props.name}</Link>
                    </u>
                    {/* date */}
                    <div class = "my-1 small font-italic"> {time} </div>
                </div>    
            </div>
                
            <div class="ml-4 mt-3 row">    
                
                {/* like interaction */}
                <span>{likeSection}</span>
                
                {/* share interaction */}
                <span>
                    <span data-toggle="modal" data-target="#flagModal"> 
                        <span class="ml-3 mr-1"> {share} </span>
                        <span class = "postInteract">Share</span>
                    </span>
                </span>
                
                {/* flag interaction */}
                <span> 
                    <span onClick = {this.flagit.bind(this)}> {flag} </span>
                    <span>Flag</span>
                </span>
            </div>
            
            <div class="modal fade" id="flagModal" role="dialog" aria-labelledby="FlagPost" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Share</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Link: 
                    <input 
                        type="text" 
                        class='w-75 ml-3 pl-2' 
                        value={window.location.href} 
                        disabled
                    />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">CANCEL</button>
                    
                    {/* <CopyToClipboard
                    text={window.location.href}
                    >
                    <button key="copy">Copy</button>
                </CopyToClipboard> */}
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => {navigator.clipboard.writeText(window.location.href)} }>COPY</button>
                  </div>
                </div>
              </div>
            </div>
                
      
            </Fragment>
        );
    }
}
 
export default PostDetails;