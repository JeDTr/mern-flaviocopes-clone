import React, { useEffect } from 'react';
import Moment from 'react-moment';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';

import Sidebar from '../layout/Sidebar';

function PostPage (props) {
    
    useEffect(() => {
        const postCuid = props.match.params.slugcuid.split('-').pop();
        props.getPost(postCuid);
    }, [])

    return (
        <div class="container">
            <Sidebar />
            {props.posts.post && (
                <article className="post-container">
                    <h1>{props.posts.post.title}</h1>
                    <p>{props.posts.post.subtitle}</p>
                    <p className="single-post-date">Published <Moment format="MMM DD YYYY">{props.posts.post.dateAdded}</Moment></p>
                    <div className="single-post-content">
                        {parse(props.posts.post.content)}
                    </div>
                </article>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, {getPost})(PostPage);