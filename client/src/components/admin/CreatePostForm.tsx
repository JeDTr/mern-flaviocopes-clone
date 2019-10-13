import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getTags } from '../../actions/tagActions'
import { createPost } from '../../actions/postActions'
import './CreatePostForm.css'
import { ErrorState } from '../../types/errorTypes'
import { TagState } from '../../types/tagTypes'
import { AppState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import { History } from 'history'

interface Props {
  getTags: () => void
  errors: ErrorState
  tags: TagState
  history: History
}

const CreatePostForm: React.FC<Props> = ({
  getTags,
  errors,
  tags,
  history,
}) => {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')

  useEffect(() => {
    getTags()
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createPost({ title, subtitle, content, tag }, history)
  }

  return (
    <div>
      <h1 className='text-center'>Create Post</h1>
      <form onSubmit={onSubmit} noValidate>
        <input
          name='title'
          onChange={e => setTitle(e.target.value)}
          className={errors.title ? 'is-invalid' : ''}
          placeholder='Title'
        />
        {errors.title && (
          <span className='invalid-feedback'>{errors.title}</span>
        )}
        <input
          name='subtitle'
          onChange={e => setSubtitle(e.target.value)}
          className={errors.subtitle ? 'is-invalid' : ''}
          placeholder='Subtitle'
        />
        {errors.subtitle && (
          <span className='invalid-feedback'>{errors.subtitle}</span>
        )}
        <textarea
          name='content'
          onChange={e => setContent(e.target.value)}
          className={errors.content ? 'is-invalid' : ''}
          placeholder='Content'
        />
        {errors.content && (
          <span className='invalid-feedback'>{errors.content}</span>
        )}
        <select
          name='tag'
          onChange={e => setTag(e.target.value)}
          className={errors.tag ? 'is-invalid' : ''}
        >
          <option value=''>--Select Tag--</option>
          {tags.data &&
            tags.data.map(data => (
              <option value={data._id} key={data._id}>
                {data.name}
              </option>
            ))}
        </select>
        {errors.tag && <span className='invalid-feedback'>{errors.tag}</span>}
        <input type='submit' value='Publish' />
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
  { getTags, createPost },
)(CreatePostForm)
