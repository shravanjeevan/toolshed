// dropdown list of tools

import React, {Component} from 'react';

class ToolDropdowns extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (         
        <div class="container"> 
            <div class="row">
                <div class="col-1 mt-1"> <h4> Tools </h4> </div>
                <div class="col-4"> 
                    <select class="form-control w-75 h-75 h6 " onChange={this.props.handleSelect}>
                    {
                        // iterating to show tools
                        this.props.tools.map((item, index) => {
                            return(
                                <option 
                                key = {index+item}
                                value = {item.id}
                                class=" " > 
                                    {item.name}
                                </option>
                            )
                        })
                    }
                    </select>

                </div>
            </div>
        </div> 
        
        );
    }
}
 
export default ToolDropdowns;