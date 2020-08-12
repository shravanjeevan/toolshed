import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import backend from '../../../bundles/apis/backend';

class RelatedPostList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            related:[]
        };
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData = async () => {
        try {
            let res = await backend.get('/posts/related');
            let { data } = res;
            this.setState({
                related:data.related
             })
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    }
    
    render() { 
        return ( 
            <Fragment> 
            <h3 class = "mt-5 mb-3 ml-2" >Related Posts</h3>
            
            <div>
            {
                    this.state.related.map((item,index)=>{
                        return (<Link className="card" key={index+item} to={`/posts/${item.title}`}>
                                    {/* <div class="card-body"> */}
                                        <h5> {item.title} </h5>
                                        <p> {item.type} </p>
                                    {/* </div> */}
                                </Link>
                        )  
                    })
                }
            </div>
            <br />
            
            </Fragment>
            
        );
    }
}
 
export default RelatedPostList;
