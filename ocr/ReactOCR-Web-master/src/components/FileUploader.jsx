import React, { Component } from 'react'
import axios from 'axios';

export default class FileUploader extends Component {
        state={
        selectedFile:null
      }

      fileSelectedHandler = event => {
        this.setState({
          selectedFile: event.target.files[0]
    
        })
      } 
      fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('', fd, {
          onUploadProgress : ProgressEvent => {
            console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total*100) + '%')
          }
        })
          .then(res => {
            console.log(res);
        });
    
      }
    render() { 
        return ( 
            <div>
                <input type='file' onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Upload</button>
                <br/>
                <img scr={this.state.url || 'https://via.placeholder.com/400x500'} alt="Uploaded Image" height="400" width="500" />
            </div>
        )
    }
};
