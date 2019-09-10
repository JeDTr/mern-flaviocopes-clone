import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../actions/tagActions';
import { editPost, getPost } from '../../actions/postActions';

function EditPostForm(props) {

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');

    useEffect(() => {
        props.getPost(props.match.params.cuid);
        props.getTags();
    }, [])

    useEffect(() => {
        if (props.posts.post) {
            const { title, subtitle, content } = props.posts.post;
            const tag = props.posts.post.tag._id;
            setTitle(title);
            setSubtitle(subtitle);
            setContent(content);
            setTag(tag);
        }
    }, props.posts.post)

    const onSubmit = (e) => {
        e.preventDefault();
        props.editPost(props.match.params.cuid, {title, subtitle, content, tag});
    }

    return (
        <div>
            <h1 className="text-center">Edit Post</h1>
            <form onSubmit={onSubmit} noValidate>
                <label for="title">Title</label>
                <input 
                    name="title"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    className={props.errors.title ? 'is-invalid' : ''}
                    value={title}
                />
                { props.errors.title &&
                <span className="invalid-feedback">{props.errors.title}</span>
                }
                <label for="subtitle">Subtitle</label>
                <input 
                    name="subtitle"
                    id="subtitle"
                    onChange={(e) => setSubtitle(e.target.value)}
                    className={props.errors.subtitle ? 'is-invalid' : ''}
                    value={subtitle}
                />
                { props.errors.subtitle &&
                <span className="invalid-feedback">{props.errors.subtitle}</span>
                }
                <label for="content">Content</label>
                <textarea 
                    name="content"
                    id="content"
                    onChange={(e) => setContent(e.target.value)}
                    className={props.errors.content ? 'is-invalid' : ''}
                    value={content}
                />
                { props.errors.content &&
                <span className="invalid-feedback">{props.errors.content}</span>
                }
                <label for="tag">Tag</label>
                <select 
                    name="tag"
                    id="tag"
                    onChange={(e) => setTag(e.target.value)}
                    className={props.errors.tag ? 'is-invalid' : ''}
                >
                    <option value="">--Select Tag--</option>
                    {props.tags.data && props.tags.data.map(data => tag === data._id ?
                        (<option value={data._id} key={data._id} selected>{data.name}</option>)
                    :   
                        (<option value={data._id} key={data._id}>{data.name}</option>)
                    )}
                </select>
                { props.errors.tag &&
                <span className="invalid-feedback">{props.errors.tag}</span>
                }
                <input 
                    type="submit"
                    value="Update"
                />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    errors: state.errors,
    tags: state.tags,
    posts: state.posts
})    

export default connect(mapStateToProps, {getTags, editPost, getPost})(EditPostForm);