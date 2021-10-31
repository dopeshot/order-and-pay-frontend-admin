import React from 'react';
import { useAppState } from '../../overmind';
import { Post } from '../../overmind/example/state';

export const Example: React.FunctionComponent = () => {
  const { posts, isLoadingPosts } = useAppState().example

  return (
    <div className="container mx-auto">
      <h3 className="text-xl font-bold pb-4 bg-red-100">Hello World!</h3>
      {isLoadingPosts ? <p>Loading posts...</p> : (
        <ul>
          {posts.map((post: Post, index) => (<li key={index}>{post.title}</li>))}
        </ul>
      )}
    </div>
  )
}
