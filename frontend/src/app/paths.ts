const paths = {
  posts: "/posts",
  post: (id: string) => {
    return `/posts/${id}`;
  },
};

export default paths;
