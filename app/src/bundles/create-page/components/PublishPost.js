// publish post button

import React, { Component } from 'react';

class PublishPost extends Component {
    constructor(props) {
        super(props);
    }
    
    
    render() { 
        return ( 
            <div class='container'>
                <div class="row">
                    <div class = 'col-1'> 
                    </div>
                    <div>
                        <button 
                        type="button" 
                        class="btn btn-success ml-3" 
                        onClick={(e)=>this.props.publish(e,this.props.userId)}
                        // onClick = {this.props.publish(this.props.userId)}
                        > 
                            PUBLISH 
                        </button>
                        
                        {/* <button 
                        type="button" 
                        class="btn btn-primary mx-3" 
                        onClick = {this.props.submit()}> 
                            SAVE AS DRAFT 
                        </button> */}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default PublishPost;