import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class CommentPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        };
    }
    // track the input value
    show(e) {
        this.setState({
            input: e.target.value,
        });
    }
    // commit the comment
    commit() {
        this.props.post(this.state.input);

        this.setState({
            input: '',
        });
    }

    render() {
        // Checks if user is authenticated and only show the comment post section if logged in
        const { isAuthenticated } = this.props.auth;
        // if login we show this part, not show otherwise
        let renderComment = isAuthenticated ? (
            <Fragment>
                <textarea
                    rows="3"
                    class="commentInput"
                    value={this.state.input}
                    onChange={this.show.bind(this)}
                />
                {/* post button */}
                <button class="commentPost" onClick={this.commit.bind(this)}>
                    {' '}
                    Post{' '}
                </button>
            </Fragment>
        ) : null;

        return <div>{renderComment}</div>;
    }
}

// hook component up to redux store
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(CommentPost);
