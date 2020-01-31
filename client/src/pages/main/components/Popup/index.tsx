import React, { FC, useEffect, useRef, useState } from 'react';
import { AppState } from '@STORE/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createPost } from '@STORE/post/actions';
import { connect } from 'react-redux';
import './style.scss';
import axios from 'axios';
import { IProps, ILocalAuthor } from './types';
import { IAuthor } from '@STORE/user/types';

const Popup: FC<IProps> = ({ handlerCreatePost }) => {
  const maxCount = useRef(512);
  const [popup, usePopup] = useState<boolean>(false);
  const [text, useModel] = useState<string>('');
  const [auth, useAuth] = useState<ILocalAuthor>({ _id: '', name: '' });
  const [user, useUser] = useState<IAuthor>({ name: '', surname: '', biography: '' });

  useEffect(() => {
    const author: string = localStorage.getItem('author');

    if (author) {
      useAuth(JSON.parse(author));
    }
  }, []);

  const handlerSend = () => {
    if (auth._id.length > 0) {
      handlerCreatePost({ text, author: auth });
      useModel('')
    } else {
      createUser();
    }

    usePopup(false);
  };

  const createUser = async () => {
    try {
      const author = await axios.post('/api/author', user);
      await useAuth({ _id: author.data.id, name: author.data.name });
      localStorage.setItem('author', JSON.stringify({ _id: author.data.id, name: author.data.name }));
    } catch (e) {
      console.error(e);
    }
  };

  const handlerUserModel = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    type: string
  ) => {
    const value = event.target.value;
    useUser(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div>
      <button onClick={() => usePopup(true)}>{auth._id.length > 0 ? 'Create post' : 'Create user'}</button>
      {popup && (
        <div className="popup">
          <div className="popup__wrap">
            <div className="popup__close" onClick={() => usePopup(false)} />
            <div className="popup__content">
              <h3>{auth._id.length > 0 ? 'Create post' : 'Create user'}</h3>
              {auth._id.length > 0 ? (
                <>
                  <textarea
                    maxLength={maxCount.current}
                    value={text}
                    placeholder="Text"
                    onChange={event => useModel(event.target.value)}
                  />
                  <p className="popup__count">
                    {text.length} / {maxCount.current}
                  </p>
                </>
              ) : (
                <>
                  <div className="popup__users">
                    <input
                      type="text"
                      value={user.name}
                      placeholder="Name"
                      onChange={event => handlerUserModel(event, 'name')}
                    />
                    <input
                      type="text"
                      value={user.surname}
                      placeholder="Surname"
                      onChange={event => handlerUserModel(event, 'surname')}
                    />
                  </div>
                  <textarea
                    value={user.biography}
                    placeholder="Bio"
                    onChange={event => handlerUserModel(event, 'biography')}
                  />
                </>
              )}
            </div>
            <div className="popup__wrap-btn">
              <button className="popup__btn" disabled={false} onClick={handlerSend}>
                {auth._id.length > 0 ? 'Send' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  handlerCreatePost: (model: { author: ILocalAuthor; text: string }) => dispatch(createPost(model)),
});

export default connect(null, mapDispatchToProps)(Popup);
