import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Breadcrumb} from 'react-bootstrap'

class Breadcrumbs extends Component {
  
  generateBreadCrumb(pathname) {
    if (pathname == '/'){
      return(<div/>);
    }
    var paths = pathname.split("/");
    
    var breadcrumb = paths.map((path, index) => {
        
        // The first element should redirect to home
        if (index == 0) {
            return (<Breadcrumb.Item><Link key={index} to="/">Home</Link></Breadcrumb.Item>);
        }
        
        // Build the path for the current URL
        var url =  paths.slice(0, index+1).join('/');
        // replace the %20 code for a ' '
        var pathmod = path.replace('%20', ' ');
        
        // HTML structure for every link except the first
        return (<Breadcrumb.Item><Link to={url}>{pathmod}</Link></Breadcrumb.Item>);
    });
    
    // Return a list of links
    return (<Breadcrumb style={{'margin-top': '60px'}}>{breadcrumb}</Breadcrumb>);
  }


  render() {    
      return (
          <div>
              {this.generateBreadCrumb(window.location.pathname)}
          </div>
      );
  }
}
export default Breadcrumbs;