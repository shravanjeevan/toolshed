import React, { Component } from 'react';

class CreateTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div class="container"> 
                <div class="row">
                    <div class="col-2"> <h4> Title </h4> </div>
                    <div class="col-10"> 
                    <input type="text" value="" />
                    </div>
                </div>
            </div>            
        );
    }
}
 
export default CreateTitle;