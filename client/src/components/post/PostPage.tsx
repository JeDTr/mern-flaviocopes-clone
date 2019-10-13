import React, { useEffect } from 'react'
import Moment from 'react-moment'
import parse from 'html-react-parser'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import Sidebar from '../layout/Sidebar'
import { PostState } from '../../types/postTypes'
import { AppState } from '../../store'

interface PostPageProps {
  match: {
    params: {
      slugcuid: string
    }
  }
  posts: PostState
  getPost: (postCuid: string) => void
}

const PostPage: React.FC<PostPageProps> = ({ match, posts, getPost }) => {
  useEffect(() => {
    const postCuid: string = match.params.slugcuid.split('-').pop()
    getPost(postCuid)
  }, [])

  return (
    <div className='container'>
      <Sidebar />
      {posts.post && (
        <article className='post-container'>
          <h1>{posts.post.title}</h1>
          <p>{posts.post.subtitle}</p>
          <p className='single-post-date'>
            Published{' '}
            <Moment format='MMM DD YYYY'>{posts.post.dateAdded}</Moment>
          </p>
          <div className='single-post-content'>{parse(posts.post.content)}</div>
        </article>
      )}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  posts: state.posts,
})

export default connect(
  mapStateToProps,
  { getPost },
)(PostPage)
