import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class CommentPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        };
    }

    show(e) {
        this.setState({
            input: e.target.value,
        });
    }

    commit() {
        this.props.post(this.state.input);

        this.setState({
            input: '',
        });
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        let renderComment = isAuthenticated ? (
            <Fragment>
                <textarea
                    rows="3"
                    class="commentInput"
                    value={this.state.input}
                    onChange={this.show.bind(this)}
                />
                <button class="commentPost" onClick={this.commit.bind(this)}>
                    {' '}
                    Post{' '}
                </button>
            </Fragment>
        ) : null;

        return <div>{renderComment}</div>;
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(CommentPost);
