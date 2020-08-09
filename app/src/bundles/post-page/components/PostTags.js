import React, { Component, Fragment } from 'react';
import axios from 'axios';

import TagTab from '../../common/components/TagTab';

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
                    <h3 class="ml-1 mb-3">Tags</h3>
                </div>
                    {
                        this.state.tags.map((item,index)=>{
                            // return <div key = {index} class = "tags" onClick = {this.fetchSearch.bind(this)}> {item} </div>  
                            return <span class="mr-2 mb-2" key={index+item}><TagTab tagName={item}/></span>
                        })
                    } 
                    
            </Fragment>
        )
    }
}
 
export default PostTags;