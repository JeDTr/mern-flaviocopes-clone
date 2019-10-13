import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getTags } from '../../actions/tagActions'
import { editPost, getPost } from '../../actions/postActions'
import { PostState } from '../../types/postTypes'
import { ErrorState } from '../../types/errorTypes'
import { TagState } from '../../types/tagTypes'
import { AppState } from '../../store'

interface Props {
  posts: PostState
  tags: TagState
  match: {
    params: {
      cuid: string
    }
  }
  editPost: typeof editPost
  errors: ErrorState
}

const EditPostForm: React.FC<Props> = ({
  posts,
  tags,
  match,
  editPost,
  errors,
}) => {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')

  useEffect(() => {
    getPost(match.params.cuid)
    getTags()
  }, [])

  useEffect(() => {
    if (posts.post) {
      const { title, subtitle, content } = posts.post
      const tag = posts.post.tag._id
      setTitle(title)
      setSubtitle(subtitle)
      setContent(content)
      setTag(tag)
    }
  }, [posts.post])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.table(['SUBMIT', title, subtitle, content, tag])
    editPost(match.params.cuid, { title, subtitle, content, tag })
  }

  return (
    <div>
      <h1 className='text-center'>Edit Post</h1>
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          id='title'
          onChange={e => setTitle(e.target.value)}
          className={errors.title ? 'is-invalid' : ''}
          value={title}
        />
        {errors.title && (
          <span className='invalid-feedback'>{errors.title}</span>
        )}
        <label htmlFor='subtitle'>Subtitle</label>
        <input
          name='subtitle'
          id='subtitle'
          onChange={e => setSubtitle(e.target.value)}
          className={errors.subtitle ? 'is-invalid' : ''}
          value={subtitle}
        />
        {errors.subtitle && (
          <span className='invalid-feedback'>{errors.subtitle}</span>
        )}
        <label htmlFor='content'>Content</label>
        <textarea
          name='content'
          id='content'
          onChange={e => setContent(e.target.value)}
          className={errors.content ? 'is-invalid' : ''}
          value={content}
        />
        {errors.content && (
          <span className='invalid-feedback'>{errors.content}</span>
        )}
        <label htmlFor='tag'>Tag</label>
        <select
          name='tag'
          id='tag'
          onChange={e => setTag(e.target.value)}
          className={errors.tag ? 'is-invalid' : ''}
        >
          <option value=''>--Select Tag--</option>
          {tags.data &&
            tags.data.map(data =>
              tag === data._id ? (
                <option value={data._id} key={data._id} selected>
                  {data.name}
                </option>
              ) : (
                <option value={data._id} key={data._id}>
                  {data.name}
                </option>
              ),
            )}
        </select>
        {errors.tag && <span className='invalid-feedback'>{errors.tag}</span>}
        <input type='submit' value='Update' />
      </form>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  errors: state.errors,
  tags: state.tags,
  posts: state.posts,
})

export default connect(
  mapStateToProps,
  { getTags, editPost, getPost },
)(EditPostForm)
