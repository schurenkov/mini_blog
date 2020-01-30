import React, { FC, useEffect } from 'react';
import { IPost } from '@STORE/post/types';
import Post from '../main/components/Post';

const AuthorPage: FC<any> = ({ match, handlerGetUser, loading, author, posts }) => {
  useEffect(() => {
    if (match.params.id) {
      handlerGetUser(match.params.id);
    }
  }, []);

  return (
    <div className="author">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="author__wrap">
          <div className="author__info">
            <h2>
              Author: {author.name} {author.surname}
            </h2>
            <h3>Bio: {author.biography}</h3>
          </div>
          <div className="author__posts">
            <h2>Posts: {posts.length}</h2>
            {posts.map((p: IPost) => (
              <Post key={p._id} data={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
