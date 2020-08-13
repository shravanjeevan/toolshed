import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import backend from '../../../bundles/apis/backend';

class RelatedPostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedTerm: null,
            related: [],
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.title !== this.props.title) {
            this.getData();
        }
    }

    getData = async () => {
        if (this.props && this.props.title !== '') {
            try {
                let res = await backend.get(
                    `/search?query=${this.props.title}&top=3`
                );
                let { data } = res;
                this.setState({
                    related: data,
                });
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
    };

    render() {
        console.log(this.props);

        let related;
        if (this.state.related && this.state.related.length > 0) {
            related = this.state.related.map((item, index) => {
                return (
                    <Link
                        className="card"
                        key={index + item}
                        to={`/posts/${item.id}`}
                    >
                        {/* <div class="card-body"> */}
                        <h5> {item.title} </h5>
                        <p> {item.type === 'blog_post' ? 'Blog Post' : 'Knowledge Base Item' } </p>
                        {/* </div> */}
                    </Link>
                );
            });
        } else {
            related = '';
        }

        return (
            <Fragment>
                <h3 class="mt-5 mb-3 ml-2">Related Posts {!this.props.title}</h3>
                <div>{related}</div>
                <br />
            </Fragment>
        );
    }
}

export default RelatedPostList;
