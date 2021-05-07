export interface Video {
  id: string,
  name:  string,
  filename:  string,
  url:  string,
  thumbnail:  string
}

export interface VideoByID {
  id: string,
  name:  string,
  filename:  string,
  url:  string,
  thumbnail:  string,
  videotags:{
      id: string,
      tag:string,
      createdAt:string,
      updatedAt: string
    }[]
}
