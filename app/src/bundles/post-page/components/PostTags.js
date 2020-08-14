import React, { Component, Fragment } from 'react';

import TagTab from '../../common/components/TagTab';

// component to show the related tags of a post

class PostTags extends Component {

    constructor(props) {
        super(props);
    }
    
    render(){
        return  (
            <Fragment>
                <div>
                    <h3 class="ml-1 mb-3">Tags</h3>
                </div>
                    {
                        this.props.tags.map((item,index)=>{
                            // return <div key = {index} class = "tags" onClick = {this.fetchSearch.bind(this)}> {item} </div>  
                            return <span class="mr-2 mb-2" key={index+item}><TagTab tagName={item}/></span>
                        })
                    } 
                    
            </Fragment>
        )
    }
}
 
export default PostTags;