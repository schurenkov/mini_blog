import React, { FC, useEffect } from 'react';
import { IPost } from '@STORE/post/types';
import Post from '../main/components/Post';
import { IProps } from './types';

const AuthorPage: FC<IProps> = ({ match, handlerAuthorUser, loading, author, posts, handlerDeletePost, user }) => {
  useEffect(() => {
    if (match.params.id) {
      handlerAuthorUser(match.params.id);
    }
  }, [match.params.id]);

  return (
    <div className="author">
      <div className="author__wrap">
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            <div className="author__info">
              <h2>
                Author: {author.name} {author.surname}
              </h2>
              <h3>Bio: {author.biography}</h3>
            </div>
            <div className="author__posts">
              <h2>Posts: {posts.length}</h2>
              {posts.map((p: IPost) => (
                <Post
                  key={p._id}
                  data={p}
                  deleteShow={user._id === p.author._id}
                  handlerDeletePost={handlerDeletePost}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
