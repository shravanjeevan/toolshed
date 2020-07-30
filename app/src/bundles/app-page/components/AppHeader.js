import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../Global_Components/searchbar'


class AppHeader extends React.Component {
    render() {
        return (
            <div class="jumbotron bg-light">
                <h1 class="display-4 text-center">The Toolshed</h1>
                <div class="lead text-center">
                    <p>
                        This is a simple hero unit, a simple jumbotron-style
                        component for calling extra attention to featured
                        content or information.
                    </p>
                    <p>Lots of interesting information here.</p>
                </div>
                <hr class="my-4" />
                <SearchBar />
                
            </div>
        );
    }
}

export default AppHeader;


{/* TODO: Placeholder search bar, replace with Component 
                <div class="input-group w-50 mx-auto">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search here"
                        aria-label="Search Bar"
                        aria-describedby="button-addon4"
                    />
                    <div class="input-group-append" id="button-addon4">
                        <button class="btn btn-outline-secondary" type="button">
                            <Link to="/results">Search</Link>
                        </button>
                    </div>
                    <div class="input-group-append">
                        <button
                            class="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Filters
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">
                                Filter 1
                            </a>
                            <a class="dropdown-item" href="#">
                                Filter 2
                            </a>
                            <a class="dropdown-item" href="#">
                                Filter 3
                            </a>
                            <div
                                role="separator"
                                class="dropdown-divider"
                            ></div>
                            <a class="dropdown-item" href="#">
                                Filter 4
                            </a>
                        </div>
                    </div>
                </div>
                */}