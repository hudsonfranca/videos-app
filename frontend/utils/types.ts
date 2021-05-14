export interface Video {
  id: string
  name: string
  filename: string
  url: string
  thumbnail: string
}

export interface VideoByID {
  id: string
  name: string
  filename: string
  url: string
  thumbnail: string
  videotags: {
    id: string
    tag: string
    createdAt: string
    updatedAt: string
  }[]
}

export interface CommentInterface {
  id: string
  comment: string
  createdAt: string
  updatedAt: string
}

export interface CommentById {
  id: string
  comment: string
  user: {
    id: string
    email: string
    username: string
    profilePicture: string
  }
  video: {
    id: string
    name: string
    url: string
    thumbnail: string
  }
}

export interface CurrentUser {
  id: string
  email: string
  username: string
  profilePicture: string
}
