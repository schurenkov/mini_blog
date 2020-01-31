import React, { FC } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import IProps from './types';

const Post: FC<IProps> = ({ data: { _id, author, text, createdAt }, handlerDeletePost, deleteShow }) => (
  <div className="post">
    <div className="post__author">
      <Link to={`/author/${author._id}`}>{author.name}</Link>
      <p>{dayjs(createdAt).format('DD MMMM YYYY HH:mm:ss')}</p>
    </div>
    <div className="post__text">{text}</div>
    {deleteShow && (
      <div className="post__delete">
        <button className="post__delete-btn" onClick={() => handlerDeletePost(_id)}>
          Delete Post
        </button>
      </div>
    )}
  </div>
);

export default Post;
