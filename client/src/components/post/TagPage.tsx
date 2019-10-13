import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { getPostsByTagSlug } from '../../actions/postActions'
import { AppState } from '../../store'
import { PostState } from '../../types/postTypes'

import Sidebar from '../layout/Sidebar'

import './PostList.css'

interface TagPageProps {
  match: {
    params: {
      tag: string
    }
  }
  posts: PostState
}

const TagPage: React.FC<TagPageProps> = ({ match, posts }) => {
  useEffect(() => {
    getPostsByTagSlug(match.params.tag)
  }, [match.params.tag])

  return (
    <div className='container'>
      <Sidebar />
      <article className='post-container'>
        <ul className='post-list'>
          {posts.data &&
            posts.data.map(post => (
              <li key={post.cuid} className='post-item'>
                <Link to={`/post/${post.slug}-${post.cuid}`}>
                  <h3 className='title'>{post.title}</h3>
                  <p className='subtitle'>{post.subtitle}</p>
                </Link>
                <div className='date-tag'>
                  <Moment format='MMM DD YYYY'>{post.dateAdded}</Moment>
                  <div className='tag'>
                    <Link
                      to={`/tag/${post.tag.slug}`}
                      className={`button-tag bg-${post.tag.slug}`}
                    >
                      {post.tag.name}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </article>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  posts: state.posts,
})

export default connect(
  mapStateToProps,
  { getPostsByTagSlug },
)(TagPage)
