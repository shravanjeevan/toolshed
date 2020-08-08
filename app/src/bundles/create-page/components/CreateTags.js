import React, { Component } from 'react';

class CreateTags extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            input:'',
            tags:[]
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
        let list = this.state.tags
        list.push.apply(list,split)
        this.setState({
            tags:list,
            input:''
        })
        this.props.update(this.state.tags)
    }
    
    // remove tags added
    remove(index) {
        let list = this.state.tags
        list.splice(index, 1)
        this.setState({
            tags:list
        })
    }
    
    render() { 
        return ( 
            <div class="container"> 
                <div class="row">
                    <div class="col-1"> <h4> Tags </h4> </div>
                    
                    {/* add tags */}
                    <div class="col-5"> 
                        <input 
                        type="text" 
                        class = "w-100"
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
                            this.state.tags.map((item, index) => {
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