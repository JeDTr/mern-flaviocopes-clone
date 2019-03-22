import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createTag } from '../../actions/tagActions';

class CreateTagForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: ''
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.createTag(this.state, this.props.history);
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Create Tag</h1>
                <form onSubmit={this.onSubmit} noValidate>
                    <input 
                        type='text' 
                        name='name' 
                        placeholder="Name"
                        className={this.props.errors.name ? 'is-invalid' : ''}
                        onChange={this.onChange}
                    />
                    { this.props.errors.name &&
					<span className="invalid-feedback">{this.props.errors.name}</span>
					}
                    <input 
                        type='text' 
                        name='description' 
                        placeholder="Description"
                        className={this.props.errors.description ? 'is-invalid' : ''}
                        onChange={this.onChange}
                    />
                    { this.props.errors.description &&
					<span className="invalid-feedback">{this.props.errors.description}</span>
					}
                    <input 
                        type='submit' 
                        name='Create' 
                    />
                </form>
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createTag })(CreateTagForm);