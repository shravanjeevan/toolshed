import React from 'react';
import queryString from 'query-string';

import ResultsList from './ResultsList';

class ResultsPage extends React.Component {
    render() {
        // const match = matchPath(this.props.history.location.pathname, {
        //     path: '/search',
        //     exact: true,
        //     strict: false
        //   })

        // console.log(match);
        // const { match: { params } } = this.props;
        // console.log(this.props);
        // console.log(params);

        const params = queryString.parse(this.props.location.search);       // turns the query parameters as found in the URL into an object
        return (
            <div>
                <ResultsList params={params}/>
            </div>
        );
    }
}

export default ResultsPage;
