import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { getPosts } from '../../actions/postActions'
import { PostList as PostListType } from '../../types/postTypes'
import { AppState } from '../../store'

import Sidebar from '../layout/Sidebar'

import './PostList.css'

const PostList: React.FC<PostListType> = ({ posts, getPosts }) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const { page } = posts

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    console.log(page)
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page > 1) {
        console.log('INTERSECTING')
        getPosts(page)
      }
    })
    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }
    return () => observer.disconnect()
  }, [page])

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
                      className={`button-tag bg-${post.tag.slug}`}
                      to={`/tag/${post.tag.slug}`}
                    >
                      {post.tag.name}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <div ref={bottomRef} />
      </article>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  posts: state.posts,
})

export default connect(
  mapStateToProps,
  { getPosts },
)(PostList)
