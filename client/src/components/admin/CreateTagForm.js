import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createTag } from '../../actions/tagActions';

function CreateTagForm(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        props.createTag({name, description}, props.history);
    }

    return (
        <div>
            <h1 className="text-center">Create Tag</h1>
            <form onSubmit={onSubmit} noValidate>
                <input 
                    type='text' 
                    name='name' 
                    placeholder="Name"
                    className={props.errors.name ? 'is-invalid' : ''}
                    onChange={(e) => setName(e.target.value)}
                />
                { props.errors.name &&
                <span className="invalid-feedback">{props.errors.name}</span>
                }
                <input 
                    type='text' 
                    name='description' 
                    placeholder="Description"
                    className={props.errors.description ? 'is-invalid' : ''}
                    onChange={(e) => setDescription(e.target.value)}
                />
                { props.errors.description &&
                <span className="invalid-feedback">{props.errors.description}</span>
                }
                <input 
                    type='submit' 
                    name='Create' 
                />
            </form>
        </div>
    )
} 

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createTag })(CreateTagForm);