import React, {Component} from 'react';
import CreateContent from './CreateContent'
import CreateTitle from './CreateTitle'
import CreateTags from './CreateTags'
import PublishPost from './PublishPost'
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.updateTags=this.updateTags.bind(this)
        this.updateTitle=this.updateTitle.bind(this)
        this.updateContent=this.updateContent.bind(this)
        this.publish=this.publish.bind(this)
        this.state = { 
            tags:[],
            title:'demo',
            content:'PHA+SGV5IHRoaXMgPHN0cm9uZz5lZGl0b3I8L3N0cm9uZz4gcm9ja3M8L3A+',
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
        let api = 'http://localhost:3000/blogs/edit'
        let data = {
            tags:this.state.tags,
            title:this.state.title,
            content: btoa(draftToHtml(this.state.content)),
            stage:version
        }
        axios.put(api, data)
        .then((response)=>{
            console.log(JSON.stringfy(response))
        })
        .catch((error)=>{console.log(error)})
    }
    
    componentDidMount(){
        this.getData();
    }
    
    getData=()=>{
        var api = 'http://localhost:3000/draft.json'
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
                <h2 class='my-3'>Create Blog Post</h2>
                <hr />
                <div>
                    <CreateTags update={this.updateTags} tags={this.state.tags}/>
                    <CreateTitle update={this.updateTitle} title={this.state.title}/>
                    <CreateContent update={this.updateContent} content={this.state.content}/>
                    <PublishPost submit={this.publish}/>
                </div>
                
                {console.log(this.state.title)}
                {/* {this.state.title} */}
            </div>
        );
    }
}
 
export default CreatePage;