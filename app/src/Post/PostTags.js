import React, { Component, Fragment } from 'react';
import axios from 'axios';

class PostTags extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            tags:[]
        };
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/test.json';
        axios.get(api)
        .then((response)=>{this.setState({
            tags:response.data.tags,
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    fetchSearch(){
        this.setState({
            tags:[...this.state.tags,'newOne']
        })
    }
    
    render(){
        return  (
            <Fragment>
                <div>
                    <h3>Tags</h3>
                </div>
                    {
                        this.state.tags.map((item,index)=>{
                            return <div key = {index} class = "tags" onClick = {this.fetchSearch.bind(this)}> {item} </div>  
                        })
                    } 
                    
            </Fragment>
        )
    }
}
 
export default PostTags;