import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../actions/tagActions';
import { editPost, getPost } from '../../actions/postActions';

class EditPostForm extends PureComponent {

    constructor() {
        super()
        this.state = {
            title: '',
            subtitle: '',
            content: '',
            tag: ''
        }
    }

    componentDidMount() {
        this.props.getPost(this.props.match.params.cuid);
        this.props.getTags();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.posts.post) {
            const { title, subtitle, content} = nextProps.posts.post;
            const tag = nextProps.posts.post.tag._id;
            this.setState({ title, subtitle, content, tag });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.editPost(this.props.match.params.cuid, this.state);
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Edit Post</h1>
                <form onSubmit={this.onSubmit} noValidate>
                    <label for="title">Title</label>
                    <input 
                        name="title"
                        id="title"
                        onChange={this.onChange}
                        className={this.props.errors.title ? 'is-invalid' : ''}
                        value={this.state.title}
                    />
                    { this.props.errors.title &&
					<span className="invalid-feedback">{this.props.errors.title}</span>
                    }
                    <label for="subtitle">Subtitle</label>
                    <input 
                        name="subtitle"
                        id="subtitle"
                        onChange={this.onChange}
                        className={this.props.errors.subtitle ? 'is-invalid' : ''}
                        value={this.state.subtitle}
                    />
                    { this.props.errors.subtitle &&
					<span className="invalid-feedback">{this.props.errors.subtitle}</span>
                    }
                    <label for="content">Content</label>
                    <textarea 
                        name="content"
                        id="content"
                        onChange={this.onChange}
                        className={this.props.errors.content ? 'is-invalid' : ''}
                        value={this.state.content}
                    />
                    { this.props.errors.content &&
					<span className="invalid-feedback">{this.props.errors.content}</span>
                    }
                    <label for="tag">Tag</label>
                    <select 
                        name="tag"
                        id="tag"
                        onChange={this.onChange}
                        className={this.props.errors.tag ? 'is-invalid' : ''}
                    >
                        <option value="">--Select Tag--</option>
                        {this.props.tags.data && this.props.tags.data.map(tag => this.state.tag === tag._id ?
                            (<option value={tag._id} key={tag._id} selected>{tag.name}</option>)
                        :   
                            (<option value={tag._id} key={tag._id}>{tag.name}</option>)
                        )}
                    </select>
                    { this.props.errors.tag &&
					<span className="invalid-feedback">{this.props.errors.tag}</span>
					}
                    <input 
                        type="submit"
                        value="Update"
                    />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    tags: state.tags,
    posts: state.posts
})    

export default connect(mapStateToProps, {getTags, editPost, getPost})(EditPostForm);