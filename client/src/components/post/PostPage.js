import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';

import Sidebar from '../layout/Sidebar';

class PostPage extends PureComponent {
    
    componentDidMount() {
        const postCuid = this.props.match.params.slugcuid.split('-').pop();
        this.props.getPost(postCuid);
    }

    render() {
        return (
            <div class="container">
                <Sidebar />
                {this.props.posts.post && (
                    <article className="post-container">
                        <h1>{this.props.posts.post.title}</h1>
                        <p>{this.props.posts.post.subtitle}</p>
                        <p className="single-post-date">Published <Moment format="MMM DD YYYY">{this.props.posts.post.dateAdded}</Moment></p>
                        <div className="single-post-content">
                            {parse(this.props.posts.post.content)}
                        </div>
                    </article>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, {getPost})(PostPage);