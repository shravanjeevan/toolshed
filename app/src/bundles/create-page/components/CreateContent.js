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
                    <div class="col-11"> <RichEditor update={this.props.update} onEditorStateChange={this.props.onEditorStateChange} editorState={this.props.editorState} content={this.props.content}/> </div>
                </div>
            </div>
        );
    }
}
 
export default CreateContent;