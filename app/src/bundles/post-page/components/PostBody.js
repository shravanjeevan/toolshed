import React, { Component } from 'react';

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