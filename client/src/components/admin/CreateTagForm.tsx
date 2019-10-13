import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createTag } from '../../actions/tagActions'
import { History } from 'history'
import { ErrorState } from '../../types/errorTypes'
import { AppState } from '../../store'

interface Props {
  history: History
  errors: ErrorState
  createTag: typeof createTag
}

const CreateTagForm: React.FC<Props> = ({ history, errors, createTag }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTag({ name, description }, history)
  }

  return (
    <div>
      <h1 className='text-center'>Create Tag</h1>
      <form onSubmit={onSubmit} noValidate>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className={errors.name ? 'is-invalid' : ''}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <span className='invalid-feedback'>{errors.name}</span>}
        <input
          type='text'
          name='description'
          placeholder='Description'
          className={errors.description ? 'is-invalid' : ''}
          onChange={e => setDescription(e.target.value)}
        />
        {errors.description && (
          <span className='invalid-feedback'>{errors.description}</span>
        )}
        <input type='submit' name='Create' />
      </form>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  errors: state.errors,
})

export default connect(
  mapStateToProps,
  { createTag },
)(CreateTagForm)
