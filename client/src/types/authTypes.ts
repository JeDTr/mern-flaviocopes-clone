export interface AuthState {
  isAuthenticated: boolean
  user?: UserData
}

export interface UserData {
  email: string
  password: string
}
