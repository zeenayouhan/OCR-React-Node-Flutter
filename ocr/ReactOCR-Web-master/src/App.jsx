import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import CustomHeader from './components/CustomHeader'; 
import Download from './components/Download';
import FileUploader from './components/FileUploader';

  
class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
           <div class="jumbotron jumbotron-fluid">
                  <div className="components">
                    <CustomHeader />          
                    <Download />
                    <FileUploader/>
                    
                  </div>
              
            </div>
        
        </div> 
      </Router>
    );
  }
}

export default App;
