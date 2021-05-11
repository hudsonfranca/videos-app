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
  children: {
    id: string
    comment: string
    createdAt: string
    updatedAt: string
  }[]
}

export interface CommentById {
  id: string
  comment: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    email: string
    username: string
    profilePicture: string
    createdAt: string
    updatedAt: string
  }
  video: {
    id: string
    name: string
    filename: string
    url: string
    thumbnail: string
    createdAt: string
    updatedAt: string
  }
  parent: {
    id: string
    comment: string
    createdAt: string
    updatedAt: string
    user: {
      id: string
      email: string
      username: string
      profilePicture: string
      createdAt: string
      updatedAt: string
    }
  }
}

export interface CurrentUser {
  id: string
  email: string
  username: string
  profilePicture: string
}
