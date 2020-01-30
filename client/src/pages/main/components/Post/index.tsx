import React, { FC } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const Post: FC<any> = ({ data: { _id, authorId, text, createdAt }, handlerDeletePost }) => (
  <div className="post">
    <div className="post__author">
      <Link to={`/author/${authorId}`}>{authorId}</Link>
      <p>{dayjs(createdAt).format('DD MMMM YYYY HH:mm:ss')}</p>
    </div>
    <div className="post__text">{text}</div>
    <div className="post__delete">
      <button className="post__delete-btn" onClick={() => handlerDeletePost(_id)}>
        Delete Post
      </button>
    </div>
  </div>
);

export default Post;
