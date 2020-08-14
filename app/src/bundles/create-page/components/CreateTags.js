// The create tags feature on the main create/edit page

import React, { Component } from 'react';

class CreateTags extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            input:'',
        }
    }
    
    // enable edit
    show(e){
        this.setState({
            input:e.target.value
        })
    }
    
    // add tags
    addTags() {
        let split = this.state.input.split(',')
        let list = this.props.tags
        list.push.apply(list,split)
        this.setState({
            input:''
        })
        this.props.update(list)
    }
    
    // remove tags added
    remove(index) {
        let list = this.props.tags
        list.splice(index,1)
        this.props.update(list)
    }
    
    render() { 
        return ( 
            <div class="container"> 
                <div class="row mb-2">
                    <div class="col-1"> <h4> Tags </h4> </div>
                    
                    {/* add tags */}
                    <div class="col-5"> 
                        <input 
                        type="text" 
                        class = "w-100 editInput"
                        placeholder='Seperate tags with commas...' 
                        value={this.state.input} 
                        onChange={this.show.bind(this)} 
                        /> 
                    </div>
                    
                    <div class="col-1">
                        <button 
                        type="button" 
                        class="btn btn-secondary btn-sm mx-2" 
                        onClick = {this.addTags.bind(this)}> 
                            Add
                        </button>
                    </div>
                    
                    {/* show added tags */}
                    <div class='col-4'>
                        {
                            this.props.tags.map((item, index) => {
                                return(
                                    <button 
                                    key = {index+item}
                                    class="btn btn-outline-secondary btn-sm bg-light mx-1" 
                                    onClick = {this.remove.bind(this, index)}> 
                                        {item} 
                                    </button>
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div>            
        );
    }
}
 
export default CreateTags;