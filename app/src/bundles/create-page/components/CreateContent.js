import React, { Component } from 'react';
import RichEditor from './RichEditor'

class CreateContent extends Component {
    constructor(props) {
        super(props);
    }
    
    render() { 
        return ( 
            <div class="container"> 
                <div class="row">
                    <div class="col-1"> <h4> Content </h4> </div>
                    <div class="col-auto"> <RichEditor update={this.props.update} content={this.props.content}/> </div>
                </div>
            </div>
        );
    }
}
 
export default CreateContent;