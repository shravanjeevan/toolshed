import React, { Component } from "react";
import { Form,FormControl, Container, Button} from 'react-bootstrap'
import styled from "styled-components"


class SearchBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="input-group mx-auto" style={{
          justifyContent: "center"
        }}>
            <Form inline>
                <FormControl className="topnav input" type="text" placeholder="Search"/>
            </Form>
            <div class="input-group-append" >
              <Button className="button" href="/results"> Search </Button>
            </div>
            <div class="input-group-append">
                        <button
                            class="button"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Filters
                        </button>
                        <div class="dropdown-menu">
                            <a class="button" href="#">
                                Filter 1
                            </a>
                            <a class="button" href="#">
                                Filter 2
                            </a>
                            <a class="button" href="#">
                                Filter 3
                            </a>
                            <div
                                role="separator"
                                class="dropdown-divider"
                            ></div>
                            <a class="button" href="#">
                                Filter 4
                            </a>
                        </div>
                    </div>
        </div>
      </React.Fragment>
    );
  }
}
 
export default SearchBar;