import React, { Component } from 'react';

class CreateTitle extends Component {
    constructor(props) {
        super(props);
    }
    
    render() { 
        return ( 
            <div class="container"> 
                <div class="row">
                    <div class="col-1"> <h4> Title </h4> </div>
                    <div class="col-5"> 
                    <input 
                        type="text" 
                        placeholder='Enter your title...'
                        class='w-100' 
                        value={this.props.title} 
                        onChange={this.props.handleTitle} 
                    />
                    </div>
                </div>
            </div>            
        );
    }
}
 
export default CreateTitle;