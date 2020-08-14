// Main page to edit and create posts/knowledge items. One component that changes depending on whether it's edit/create and knowledge/blog post

import React, {Component} from 'react';
import CreateContent from './CreateContent'
import CreateTitle from './CreateTitle'
import CreateTags from './CreateTags'
import PublishPost from './PublishPost'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import backend from '../../../bundles/apis/backend';
import ToolDropdowns from './ToolDropdowns';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Prompt } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class EditPage extends Component {
    constructor(props) {
        super(props);
        const { match:{params} } = this.props;
        this.updateTags=this.updateTags.bind(this)
        this.publish=this.publish.bind(this)
        var path = window.location.pathname
        // Handle dynamic state based on current URL path
        // edit post
        if (path.match("edit") && path.match("posts"))  {
            this.state = { 
                create:false,
                knowledge:false,
                editorState: EditorState.createEmpty(),
                tags:[],
                title:'',
                content:'',
                id:params.id,
            }
        // create post 
        } else if (path.match("create")&&path.match("posts")) {
            this.state = { 
                create:true,
                knowledge:false,
                editorState: EditorState.createEmpty(),
                tags:[],
                title:'',
                content:'',
                id : -1,
            }
        // create knowledge
        } else if (path.match("create")&&path.match("knowledge")) {
            this.state = { 
                create:true,
                knowledge:true,
                editorState: EditorState.createEmpty(),
                tags:[],
                title:'',
                content:'',
                tools:[],
                toolId:1,
                id : -1,
            }
        // edit knowledge base item
        } else if (path.match("edit") && path.match("knowledge")) {
            this.state = { 
                create:false,
                knowledge:true,
                editorState: EditorState.createEmpty(),
                tags:[],
                title:'',
                content:'',
                tools:[],
                toolId:1,
                id:params.id,
            }
        }
    }
    
    componentDidMount(){
        // get different data according to the current URL
        if (this.state.create === false) {
            this.getData();
        }
        if (this.state.knowledge === true) {
            this.getTools();
        }
        
    }
    
    // force to refresh page if the url changed
    componentWillUpdate(nextProps) { 
        if (this.props.location.pathname !== nextProps.location.pathname){
            window.location.reload(false);  
        }
    }
    
    // Store title value
    handleTitle (e) {
        this.setState({title:e.target.value})
    }
    
    // Store tag values
    updateTags(tags) {
        this.setState({
            tags:tags,
        })
    }
    
    // track the content changed 
    onEditorStateChange = (editorState) => {
        this.setState({
          editorState: editorState
        })
      }
    
    // publish this post
    publish = async (e,userId) => {
        // stop bubbling event
        e.stopPropagation();
        // send data using POST
        try {
            let data, res;
            if (!this.state.knowledge) {
                data = {
                    tags:this.state.tags,
                    title:this.state.title,
                    // Object=>JSON=>HTML  (=x=>encode64)
                    content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                    authorId:userId,
                }
            } else {
                data = {
                    tags:this.state.tags,
                    title:this.state.title,
                    // Object=>JSON=>HTML  (=x=>encode64)
                    content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
                    authorId:userId,
                    type:"knowledge_base",
                    toolId:this.state.toolId,
                }
            }
            // if create
            if (this.state.create) {res = await backend.post('/posts/',data)}
            // if edit
            else if (!this.state.create) {res = await backend.put(`/posts/${this.state.id}`,data);}
            console.log(res);
            this.setState({id:res.data.id})
            document.getElementById("refre").click()
        } catch(e) {
            console.log(e);
        }
    }
    
    // Fetches data from different endpoints depending on if it's knowledge or blog post
    getData = async () => {
        try {
            let res;
            if (this.state.knowledge) {res = await backend.get(`/knowledge/${this.state.id}`)}
            else {res = await backend.get(`/posts/${this.state.id}`)}
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
    
    // Gets the full list of tools to be used for knowledge create
    getTools = async () => {
        try {
            let res = await backend.get('/tools/');
            let { data } = res;
            this.setState({
                tools: data
             })
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    }
    
    // track the tools choosed
    handleSelect(e){
        this.setState({
            toolId: e.target.value
        })
    }
    
    
    render() { 
        const { user , isAuthenticated } = this.props.auth;
        let userId
        if (isAuthenticated) {
            userId = user.id
        } 
        // change infomation according to url
        let head, tail, url, tool
        if (this.state.create) {
            head = 'Create'
        } else {
            head = 'Edit'
        }
        
        // show tools only if it is knowledge base
        if (this.state.knowledge) {
            tail = 'Knowledge Base'
            tool = <ToolDropdowns tools={this.state.tools} handleSelect = {this.handleSelect.bind(this)}/>
            url = 'knowledge'
        } else {
            tail = 'Blog'
            url='posts'
        }
        
        return ( 
            <div>
                <h2 class='class=my-4 ml-5'> {head} {tail} Post </h2>
                <hr />
                <div>
                    <CreateTitle title={this.state.title} handleTitle={this.handleTitle.bind(this)}/>
                    <CreateTags update={this.updateTags} tags={this.state.tags}/>
                    {tool}
                    <CreateContent onEditorStateChange={this.onEditorStateChange.bind(this)} editorState={this.state.editorState} />
                    <PublishPost publish={this.publish} userId={userId}/>
                </div>
                
                {/* <Prompt
                  message="Are you sure you want to leave?"
                /> */}
                
                <Link id='refre' to={`/${url}/${this.state.id}/`} />
                
            </div>
            
            
            
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(EditPage);