import React, { Component } from 'react';
import Editor from './Editor'

class CreateContent extends Component {
    render() { 
        return ( 
            <div class="container"> 
                <div class="row">
                    <div class="col-2"> <h4> Content </h4> </div>
                    <div class="col-10"> <Editor/> </div>
                </div>
            </div>
        );
    }
}
 
export default CreateContent;