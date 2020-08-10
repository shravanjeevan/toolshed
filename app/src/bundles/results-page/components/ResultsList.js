import React from 'react';

import backend from '../../apis/backend';
import PostResult from '../../common/components/PostResult';
import Searchterm from '../../common/components/SearchTerm';
import Searchbar from '../../common/components/searchbar';


class ResultsList extends React.Component {
    state = { 
        results: [],
        isLoading: false
     };

    componentDidMount() {
        this.getResults();
    }

    // This checks if the search query params are meangingfully different, and only get results if different
    componentDidUpdate(prevProps) {
        if (this.props.params.query !== prevProps.params.query) {
            this.getResults();
        }
    }

    getResults = async () => {
        this.setState({ isLoading: true });
        try {
            let res = await backend.get(`/search?query=${this.props.params.query}`);
            let { data } = res;
            this.setState({ results: data });
            console.log(this.state.results);
        } catch(e) {
            console.log(e);
        }
        this.setState({ isLoading: false });
    }
    render() {
        const expression = /.*=/
        var info = window.location.href.replace(expression, '');
        info = info.replace(/%20/g, ' ')
        var params = info.split("+")
        var searchitem = [
            {
                searchterm: params.slice(0,1),
                filters: params.slice(1),
            }
        ]
        
        let { results } = this.state;
        let postsToShow;


        if (this.state.isLoading) {
            postsToShow = <div className="alert alert-light">Fetching results...</div>;
        } else if (results && results.length > 0) {
            postsToShow = results.map((post) => {
                return (
                    <div className="my-4">
                        <PostResult post={post} />
                    </div>
                );
            });
        } else if (results && results.length === 0) {
            postsToShow = <div className="alert alert-light">No results found for "{this.props.params.query}". Try another search term.</div>;
        }

        var searchToShow = searchitem.map((term)=>{
            return (
                <div className="my-4">
                    <Searchterm term = {term} />
                </div>
            )
        })

        return (
            <div className="container">
                <h2>Results</h2>
                <Searchbar />
                <div className="mt-4">{searchToShow}</div>
                <div className="mt-4">{postsToShow}</div>
            </div>
        );
    }
}

export default ResultsList;
