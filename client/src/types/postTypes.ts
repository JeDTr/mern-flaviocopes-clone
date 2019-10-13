export interface PostData {
  cuid: string
  slug: string
  title: string
  subtitle: string
  content: string
  dateAdded?: string
  tag: {
    _id: string
    slug: string
    name: string
  }
}

export interface PostState {
  loading: boolean
  data: Array<PostData>
  page: number
  post?: PostData
}

export interface PostList {
  posts: PostState
  getPosts: (page?: number) => void
}
