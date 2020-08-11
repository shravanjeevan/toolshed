import React, {Component} from 'react';
import CreateContent from './CreateContent'
import CreateTitle from './CreateTitle'
import CreateTags from './CreateTags'
import PublishPost from './PublishPost'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import backend from '../../../bundles/apis/backend';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Prompt, Link } from 'react-router'

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.updateTags=this.updateTags.bind(this)
        this.publish=this.publish.bind(this)
        if (window.location.pathname != "/posts/:id/edit") {
            this.state = { 
                create:false,
                editorState: EditorState.createEmpty(),
                tags:[],
                title:'',
                content:'',
                id:window.location.pathname.slice(12),
            }
            
        } else {
            this.state = { 
                create:true,
                editorState: EditorState.createEmpty(),
                tags:[],
                title:'',
                content:'',
            }
        }
        
    }
    
    componentDidMount(){
        if (this.state.create == false) {
            this.getData();
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
      }
    
    // publish(){
    //     let api = 'http://localhost:8000/posts/'
    //     let data = {
    //         tags:this.state.tags,
    //         title:this.state.title,
    //         // Object=>JSON=>HTML=>encode64
    //         content: btoa(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))),
    //         authorId:1
    //     }
    //     axios.post(api, data)
    //     .then((response)=>{
    //         console.log(JSON.stringfy(response))
    //     })
    //     .catch((error)=>{console.log(error)})
    // }
    
    publish = async () => {
        try {
            let data = {
                tags:this.state.tags,
                title:this.state.title,
                // Object=>JSON=>HTML  (=x=>encode64)
                content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                authorId:1
            }
            let res = await backend.post('/posts/',data);
            console.log(res);
        } catch(e) {
            console.log(e);
        }
    }
    
    getData = async () => {
        try {
            let res = await backend.get('/posts/'+this.state.id);
            let { data } = res;
            const html = data.content
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const editorState = EditorState.createWithContent(contentState);
              this.setState ({
                editorState:editorState
              });
            }
            this.setState({
                tags:data.tags,
                title:data.title,
             })
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    }
    
    render() { 
    
        let head
        if (this.state.create) {
            head = 'Create'
        } else {
            head = 'Edit'
        }
        
        return ( 
            <div>
                <h2 class='class=my-4 ml-5'> Edit Blog Post </h2>
                <hr />
                <div>
                    <CreateTags update={this.updateTags} tags={this.state.tags}/>
                    <CreateTitle title={this.state.title} handleTitle={this.handleTitle.bind(this)}/>
                    <CreateContent onEditorStateChange={this.onEditorStateChange.bind(this)} editorState={this.state.editorState} />
                    <PublishPost publish={this.publish}/>
                </div>
            </div>
            
            // <Prompt
            //   message="Are you sure you want to leave?"
            // />
            // <Link id='succs' to="/" />
        );
    }
}
 
export default CreatePage;