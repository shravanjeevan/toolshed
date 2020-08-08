import React, { Component} from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      html:this.props.content
    }
  }
  
  componentDidMount(){
    this.draft();
  }
  
  draft=()=>{
    const html = atob(this.props.content)
    console.log('html')
    console.log(html)
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState ({
        editorState:editorState
      });
    }
    
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
    this.props.update(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  // code reference: https://blog.csdn.net/qq_20337865/article/details/84566229
  // to preview pic locally as base64
  imageUploadCallBack = file => new Promise(
    (resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let img = new Image();
      reader.onload = function (e) {
        img.src = this.result
        resolve({
          data: {
            link: img.src
          }
        })
      }
    }
  )


  render() {
    const { editorState } = this.state;
    // let tmp = btoa(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    
    return (
      <div>
        {/* 3rd party library for rich text editor */}
        <div class = "editors">
          <Editor
            editorState={editorState}
            editorStyle={{ border: "1px solid #C0C0C0"}}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              options:['inline','blockType','fontSize','fontFamily','textAlign','list','colorPicker','image','link','embedded'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              colorPicker: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: this.imageUploadCallBack,
                previewImage: true,
                inputAccept: 'image/*',
                alt: {present: false, mandatory: false}
              }
            }}
            onEditorStateChange={this.onEditorStateChange}
          />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
          
        </div>
        
        {/* <textarea
          disabled
          value = {tmp}
        />
        <pre><div dangerouslySetInnerHTML = {{__html:atob(tmp)}} ></div></pre>
        <p>{atob(tmp)}</p> */}
        <br />
        {/* <div> {this.state.content} </div>
        <div>{atob(this.props.content)}</div> */}
        
      </div>
    );
  }
}

export default RichEditor;