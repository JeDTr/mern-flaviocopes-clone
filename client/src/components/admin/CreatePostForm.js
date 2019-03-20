import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../actions/tagActions';
import { createPost } from '../../actions/postActions';

import './CreatePostForm.css';

class CreatePostForm extends PureComponent {

    componentDidMount() {
        this.props.getTags();
    }

    constructor() {
        super()
        this.state = {
            title: '',
            subtitle: '',
            content: '',
            tag: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createPost(this.state, this.props.history);
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Create Post</h1>
                <form onSubmit={this.onSubmit} noValidate>
                    <input 
                        name="title"
                        onChange={this.onChange}
                        className={this.props.errors.title ? 'is-invalid' : ''}
                        placeholder="Title"
                    />
                    { this.props.errors.title &&
					<span className="invalid-feedback">{this.props.errors.title}</span>
					}
                    <input 
                        name="subtitle"
                        onChange={this.onChange}
                        className={this.props.errors.subtitle ? 'is-invalid' : ''}
                        placeholder="Subtitle"
                    />
                    { this.props.errors.subtitle &&
					<span className="invalid-feedback">{this.props.errors.subtitle}</span>
					}
                    <textarea 
                        name="content"
                        onChange={this.onChange}
                        className={this.props.errors.content ? 'is-invalid' : ''}
                        placeholder="Content"
                    />
                    { this.props.errors.content &&
					<span className="invalid-feedback">{this.props.errors.content}</span>
					}
                    <select 
                        name="tag"
                        onChange={this.onChange}
                        className={this.props.errors.tag ? 'is-invalid' : ''}
                    >
                        <option value="">--Select Tag--</option>
                        {this.props.tags.data && this.props.tags.data.map(tag => (
                            <option value={tag._id} key={tag._id}>{tag.name}</option>
                        ))}
                    </select>
                    { this.props.errors.tag &&
					<span className="invalid-feedback">{this.props.errors.tag}</span>
					}
                    <input 
                        type="submit"
                        value="Publish"
                    />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    tags: state.tags
})    

export default connect(mapStateToProps, {getTags, createPost})(CreatePostForm);