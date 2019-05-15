import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { loadTagData, editTag } from '../../actions/tagActions';

function EditTagForm(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        props.loadTagData(props.match.params.id);
    }, [])

    useEffect(() => {
        if (props.tags.tag) {
            const { name, description } = props.tags.tag;
            setName(name);
            setDescription(description);
        }
    }, props.tags.tag)

    const onSubmit = (e) => {
        e.preventDefault();
        props.editTag(props.match.params.id, {name, description});
    }

    if (!props.tags.tag) {
        return (
            <h1>No Tag Found</h1>
        )
    }
    return (
        <div>
            <h1 className="text-center">Edit tag</h1>
            <form onSubmit={onSubmit} noValidate>
                <label htmlFor='name'>Name</label>
                <input 
                    type='text' 
                    name='name' 
                    id='name'
                    value={name}
                    className={props.errors.name ? 'is-invalid' : ''}
                    onChange={(e) => setName(e.target.value)}
                />
                { props.errors.name &&
                <span className="invalid-feedback">{props.errors.name}</span>
                }
                <label htmlFor='description'>Description</label>
                <input 
                    type='text' 
                    name='description' 
                    id='description'
                    value={description}
                    className={props.errors.description ? 'is-invalid' : ''}
                    onChange={(e) => setDescription(e.target.value)}
                />
                { props.errors.description &&
                <span className="invalid-feedback">{props.errors.description}</span>
                }
                <input 
                    type='submit' 
                    name='Update' 
                />
            </form>
        </div>
    )
} 

const mapStateToProps = (state) => ({
    errors: state.errors,
    tags: state.tags
})

export default connect(mapStateToProps, { editTag, loadTagData })(EditTagForm);