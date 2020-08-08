import React from 'react';
import { Route, Link } from 'react-router-dom';

import Post from '../../post-page/components/Post';
import './PostResult.css';

class SearchResult extends React.Component {
    render() {

        let { term } = this.props;

        // List of filters
        let filterToShow = term.filters.map((filter) => {
            return (
                <a href="#" className="mr-2 badge badge-secondary">
                    {filter}
                </a>
            );
        });

        return (
            <div>
            <h5 className="card-title">
                <div className="row">
                    {term.searchterm}
                </div>
            </h5>
            <h6 class="card-subtitle mb-3">
                <div className="text-muted">{filterToShow}</div>
            </h6>
            <hr />
            </div>
        );
    }
}

export default SearchResult;
