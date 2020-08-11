import React, {Component} from 'react';
import CreateContent from './CreateContent'
import CreateTitle from './CreateTitle'
import CreateTags from './CreateTags'
import PublishPost from './PublishPost'
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.updateTags=this.updateTags.bind(this)
        this.publish=this.publish.bind(this)
        this.state = { 
            editorState: EditorState.createEmpty(),
            tags:[],
            title:'',
            content:'',
        }
        
    }
    

    handleTitle (e) {
        this.setState({title:e.target.value})
    }
    
    updateTags(tags) {
        this.setState({
            tags:tags,
        })
    }
    
    onEditorStateChange = (editorState) => {
        this.setState({
          editorState: editorState
        })
        // this.props.update(convertToRaw(this.state.editorState.getCurrentContent()))
      }
    
    
    publish(){
        let api = 'http://localhost:3000/blogs/edit'
        let data = {
            tags:this.state.tags,
            title:this.state.title,
            // Object=>JSON=>HTML=>encode64
            content: btoa(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))),
        }
        axios.put(api, data)
        .then((response)=>{
            console.log(JSON.stringfy(response))
        })
        .catch((error)=>{console.log(error)})
    }
    
    
    getData=()=>{
        var api = 'http://localhost:3000/draft.json'
        axios.get(api)
        .then((response)=>{
            const html = atob(response.data.content)
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const editorState = EditorState.createWithContent(contentState);
              this.setState ({
                editorState:editorState
              });
            }
        
        this.setState({
            tags:response.data.tags,
            title:response.data.title,
         })
        })
        .catch((error)=>{console.log(error)})
        this.draft();
    }
    
    render() { 
        
        return ( 
            <div>
                <h2 class='my-3'>Create Blog Post</h2>
                <hr />
                <div>
                    <CreateTags update={this.updateTags} tags={this.state.tags}/>
                    <CreateTitle title={this.state.title} handleTitle={this.handleTitle.bind(this)}/>
                    <CreateContent onEditorStateChange={this.onEditorStateChange.bind(this)} editorState={this.state.editorState} />
                    <PublishPost submit={this.publish}/>
                </div>
            </div>
        );
    }
}
 
export default CreatePage;