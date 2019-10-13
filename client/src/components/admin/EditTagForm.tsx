import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getTag, editTag } from '../../actions/tagActions'
import { TagState } from '../../types/tagTypes'
import { ErrorState } from '../../types/errorTypes'
import { AppState } from '../../store'

interface Props {
  match: {
    params: {
      id: string
    }
  }
  tags: TagState
  errors: ErrorState
  getTag: typeof getTag
}

const EditTagForm: React.FC<Props> = ({ match, tags, errors, getTag }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    getTag(match.params.id)
  }, [])

  useEffect(() => {
    if (tags.tag) {
      const { name, description } = tags.tag
      setName(name)
      setDescription(description)
    }
  }, [tags.tag])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    editTag(match.params.id, { name, description })
  }

  if (tags.loading) {
    return <h1>Loading...</h1>
  } else if (!tags.tag) {
    return <h1>No Tag Found</h1>
  }
  return (
    <div>
      <h1 className='text-center'>Edit tag</h1>
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          className={errors.name ? 'is-invalid' : ''}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <span className='invalid-feedback'>{errors.name}</span>}
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          id='description'
          value={description}
          className={errors.description ? 'is-invalid' : ''}
          onChange={e => setDescription(e.target.value)}
        />
        {errors.description && (
          <span className='invalid-feedback'>{errors.description}</span>
        )}
        <input type='submit' name='Update' />
      </form>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  errors: state.errors,
  tags: state.tags,
})

export default connect(
  mapStateToProps,
  { editTag, getTag },
)(EditTagForm)
