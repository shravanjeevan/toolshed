import React from 'react';

import backend from '../../apis/backend';
import PostResult from '../../common/components/PostResult';
import Searchterm from '../../common/components/SearchTerm';
import Searchbar from '../../common/components/searchbar';

class ResultsList extends React.Component {
    state = { 
        results: []
     };

    componentDidMount() {
        this.getResults();
    }

    getResults = async () => {
        try {
            let res = await backend.get(`/search?query=${this.props.params.query}`);
            let { data } = res;
            this.setState({ results: data });
            console.log(this.state.results);
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        var searchitem = [
            {
                searchterm: this.props.params.query,
                filters: ["posted within last 5 days"],
            }
        ];

        let { results } = this.state;
        let postsToShow;

        if (results) {
            postsToShow = results.map((post) => {
                return (
                    <div className="my-4">
                        <PostResult post={post} />
                    </div>
                );
            });
        } else {
            postsToShow = <div>No results found.</div>;
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
