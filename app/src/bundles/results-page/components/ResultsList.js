// List of results on the /search route

import React from 'react';

import backend from '../../apis/backend';
import PostResult from '../../common/components/PostResult';
import Searchterm from '../../common/components/SearchTerm';
import Searchbar from '../../common/components/searchbar';

class ResultsList extends React.Component {
    state = {
        results: [],
        isLoading: false,
    };

    componentDidMount() {
        this.getResults();
    }

    // This checks if the search query params are meangingfully different, and only get results if different.
    componentDidUpdate(prevProps) {
        if (this.props.params.query !== prevProps.params.query) {
            this.getResults();
        }
    }

    getResults = async () => {
        this.setState({ isLoading: true });
        try {
            let res = await backend.get(
                // can only handle the query right now, additional filters not yet implemented
                `/search?query=${this.props.params.query}`
            );
            let { data } = res;
            this.setState({ results: data });
            console.log(this.state.results);
        } catch (e) {
            console.log(e);
        }
        this.setState({ isLoading: false });
    };

    render() {
        var searchitem = [
            {
                searchterm: this.props.params.query,
                filters: ['posted within last 5 days'],
            },
        ];

        let { results } = this.state;
        let postsToShow;

        // Generate posts if there's anything queried, otherwise show loading / none found messages
        if (this.state.isLoading) {
            postsToShow = (
                <div className="alert alert-light">Fetching results...</div>
            );
        } else if (results && results.length > 0) {
            postsToShow = results.map((post) => {
                return (
                    <div className="my-4">
                        <PostResult post={post} />
                    </div>
                );
            });
        } else if (results && results.length === 0) {
            postsToShow = (
                <div className="alert alert-light">
                    No results found for "{this.props.params.query}". Please try searching for something else:
                    <br/>
                    <br/>
                    <Searchbar />
                </div>
            );
        }

        // Removed as it doesn't grab filters properly
        // var searchToShow = searchitem.map((term) => {
        //     return (
        //         <div className="my-4">
        //             <Searchterm term={term} />
        //         </div>
        //     );
        // });

        return (
            <div className="container">
                <h2>Results</h2>
                <div className="mt-4">
                    Showing results for "<i>{this.props.params.query}</i>".   {results.length} posts found.
                </div>
                {/* <div className="mt-4">{searchToShow}</div> Removed as it isn't compatible with filters*/}
                <div className="mt-4">{postsToShow}</div>
            </div>
        );
    }
}

export default ResultsList;
