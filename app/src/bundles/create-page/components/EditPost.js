import React, {Component} from 'react';
import CreateContent from './CreateContent'
import CreateTitle from './CreateTitle'
import CreateTags from './CreateTags'
import PublishPost from './PublishPost'
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import Navbar1 from '../../common/components/navbar';

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.updateTags=this.updateTags.bind(this)
        this.updateTitle=this.updateTitle.bind(this)
        this.updateContent=this.updateContent.bind(this)
        this.publish=this.publish.bind(this)
        this.state = { 
            tags:[],
            title:'',
            content:'',
        }
    }
    
    updateTags(tags) {
        this.setState({
            tags:tags,
        })
    }
    
    updateTitle(title) {
        this.setState({
            title:title
        })
    }
    
    updateContent(content) {
        this.setState({
            content:content,
        })
    }
    
    publish(version){
        let api = 'http://localhost:3000/blogs/create'
        let data = {
            tags:this.state.tags,
            title:this.state.title,
            content: btoa(draftToHtml(this.state.content)),
            stage:version
        }
        axios.post(api, data)
        .then((response)=>{
            console.log(JSON.stringfy(response))
        })
        .catch((error)=>{console.log(error)})
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/blog/draft'
        axios.get(api)
        .then((response)=>{this.setState({
            tags:response.data.tags,
            title:response.data.title,
            content:response.data.content
         })
        })
        .catch((error)=>{console.log(error)})
    }
    
    render() { 
        return ( 
            <div>
                <Navbar1 />
                <h2 class='my-3'>Create Blog Post</h2>
                <hr />
                <div>
                    <CreateTags update={this.updateTags} tags={this.state.tags}/>
                    <CreateTitle update={this.updateTitle} title={this.state.title}/>
                    <CreateContent update={this.updateContent} content={this.state.content}/>
                    <PublishPost submit={this.publish}/>
                </div>
            </div>
        );
    }
}
 
export default CreatePage;