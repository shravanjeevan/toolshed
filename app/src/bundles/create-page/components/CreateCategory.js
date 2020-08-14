// No longer used

import React, { Component } from 'react';

class CreateTags extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            input:'',
            tags:[]
        }
    }
    
    render() { 
        return ( 
            <div class="container"> 
                <div class="row">
                    <div class="col-2"> <h4> Category </h4> </div>
                    <div class="col-4"> 
                        <button type="button" class="btn btn-primary btn-sm" > Videoconferencing </button>
                        <button type="button" class="btn btn-primary btn-sm" > Collaboration </button>
                        <button type="button" class="btn btn-primary btn-sm" > Project Management </button>
                    </div>
                </div>
            </div>            
        );
    }
}
 
export default CreateTags;