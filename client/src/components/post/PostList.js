import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getPosts } from '../../actions/postActions';

import Sidebar from '../layout/Sidebar';

import './PostList.css';

class PostList extends PureComponent {

    componentDidMount() {
        this.props.getPosts();
    }

    render () {
        return (
            <div className="container">
                <Sidebar />
                <article className="post-container">
                    <ul className="post-list">
                        {this.props.posts.data && this.props.posts.data.map(post => (
                            <li key={post.cuid} className="post-item">
                                <Link to={`/post/${post.slug}-${post.cuid}`}>
                                    <h3 className="title">{post.title}</h3>
                                    <p className="subtitle">{post.subtitle}</p>
                                </Link>
                                <div className="date-tag">
                                    <Moment format="MMM DD YYYY">{post.dateAdded}</Moment>
                                    <div className="tag">
                                        <Link className={`button-tag bg-${post.tag.slug}`} to={`/tag/${post.tag.slug}`}>{post.tag.name}</Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, {getPosts})(PostList);