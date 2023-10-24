


export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const generatePost = (data: Partial<Post> = {}): Post => {
  const post = {
    userId: -1,
    id: -1,
    title: '',
    body: ''
  };

  return Object.assign(post, data);
};