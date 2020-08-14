import React, { Component } from 'react';

// the component to render the content of a post
class PostBody extends Component {
    constructor(props) {
        super(props);
    }
    
    render() { 
        return ( 
            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: this.props.body}}
            />
        );
    }
}
 
export default PostBody;