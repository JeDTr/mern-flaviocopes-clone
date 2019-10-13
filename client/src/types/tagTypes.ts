export interface TagData {
  _id?: string
  name: string
  slug?: string
  description: string
}

export interface TagState {
  data?: Array<TagData>
  tag?: TagData
  loading: boolean
}
