import React, { Component} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';

class RichEditor extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   editorState: EditorState.createEmpty(),
    //   html:this.props.content
    // }
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
    const { editorState } = this.props;
    
    return (
      <div>
        {/* 3rd party library for rich text editor */}
        <div class = "editors ">
          <Editor
            editorState={editorState}
            editorStyle={{ border: "1px solid #C0C0C0", padding: '14px',height:'350px', borderRadius: '2px', width:'1015px'}}
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
            onEditorStateChange={this.props.onEditorStateChange}
          />
          
        </div>
        <br />
        
      </div>
    );
  }
}

export default RichEditor;