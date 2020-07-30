import React, { Component } from 'react';
import axios from 'axios';

class PostBody extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:0,
            html:''
        }
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/test.json'
        axios.get(api)
        .then((response)=>{this.setState({
            id:response.data.id,
            html:response.data.html
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    render() { 
        return ( 
            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: this.state.html}}
            />
        );
    }
}
 
export default PostBody;