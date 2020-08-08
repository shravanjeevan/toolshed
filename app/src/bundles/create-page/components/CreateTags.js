import React, { Component } from 'react';

class CreateTags extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div class="container"> 
                <div class="row">
                    <div class="col-2"> <h4> Tags </h4> </div>
                    <div class="col-4"> 
                        <input type="text" value="" /> 
                        <button type="button" class="btn btn-secondary btn-sm" > Add </button>
                    </div>
                </div>
            </div>            
        );
    }
}
 
export default CreateTags;