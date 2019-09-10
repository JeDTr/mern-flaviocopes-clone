import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../actions/tagActions';
import { createPost } from '../../actions/postActions';

import './CreatePostForm.css';

function CreatePostForm(props) {

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');

    useEffect(() => {
        props.getTags();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        props.createPost({title, subtitle, content, tag}, props.history);
    }

    return (
        <div>
            <h1 className="text-center">Create Post</h1>
            <form onSubmit={onSubmit} noValidate>
                <input 
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    className={props.errors.title ? 'is-invalid' : ''}
                    placeholder="Title"
                />
                { props.errors.title &&
                <span className="invalid-feedback">{props.errors.title}</span>
                }
                <input 
                    name="subtitle"
                    onChange={(e) => setSubtitle(e.target.value)}
                    className={props.errors.subtitle ? 'is-invalid' : ''}
                    placeholder="Subtitle"
                />
                { props.errors.subtitle &&
                <span className="invalid-feedback">{props.errors.subtitle}</span>
                }
                <textarea 
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    className={props.errors.content ? 'is-invalid' : ''}
                    placeholder="Content"
                />
                { props.errors.content &&
                <span className="invalid-feedback">{props.errors.content}</span>
                }
                <select 
                    name="tag"
                    onChange={(e) => setTag(e.target.value)}
                    className={props.errors.tag ? 'is-invalid' : ''}
                >
                    <option value="">--Select Tag--</option>
                    {props.tags.data && props.tags.data.map(data => (
                        <option value={data._id} key={data._id}>{data.name}</option>
                    ))}
                </select>
                { props.errors.tag &&
                <span className="invalid-feedback">{props.errors.tag}</span>
                }
                <input 
                    type="submit"
                    value="Publish"
                />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    errors: state.errors,
    tags: state.tags
})    

export default connect(mapStateToProps, {getTags, createPost})(CreatePostForm);