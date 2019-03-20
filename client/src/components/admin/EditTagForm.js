import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadTagData, editTag } from '../../actions/tagActions';

class EditTagForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: ''
        }
    }

    componentDidMount() {
        this.props.loadTagData(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tags.tag) {
            const { name, description } = nextProps.tags.tag;
            this.setState({
                name: name,
                description: description
            })
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.editTag(this.props.match.params.id, this.state);
    }

    render() {
        if (!this.props.tags.tag) {
            return (
                <h1>No Tag Found</h1>
            )
        }
        return (
            <div>
                <h1 className="text-center">Edit tag</h1>
                <form onSubmit={this.onSubmit} noValidate>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name'
                        value={this.state.name}
                        className={this.props.errors.name ? 'is-invalid' : ''}
                        onChange={this.onChange}
                    />
                    { this.props.errors.name &&
					<span className="invalid-feedback">{this.props.errors.name}</span>
                    }
                    <label htmlFor='description'>Description</label>
                    <input 
                        type='text' 
                        name='description' 
                        id='description'
                        value={this.state.description}
                        className={this.props.errors.description ? 'is-invalid' : ''}
                        onChange={this.onChange}
                    />
                    { this.props.errors.description &&
					<span className="invalid-feedback">{this.props.errors.description}</span>
					}
                    <input 
                        type='submit' 
                        name='Update' 
                    />
                </form>
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    errors: state.errors,
    tags: state.tags
})

export default connect(mapStateToProps, { editTag, loadTagData })(EditTagForm);