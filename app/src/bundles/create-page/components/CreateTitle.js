import React, { Component } from 'react';

class CreateTitle extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            input:''
        }
    }
    
    show(e){
        this.setState({
            input:e.target.value
        })
        this.props.update(this.state.input)
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
                        value={this.state.input} 
                        onChange={this.show.bind(this)} 
                    />
                    </div>
                </div>
            </div>            
        );
    }
}
 
export default CreateTitle;