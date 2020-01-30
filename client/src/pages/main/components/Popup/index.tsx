import React, { FC, useEffect, useRef, useState } from 'react';
import { AppState } from '@STORE/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createPost } from '@STORE/post/actions';
import { connect } from 'react-redux';
import './style.scss';
import axios from 'axios';

const Popup: FC<any> = ({ handlerCreatePost }) => {
  const maxCount = useRef(512);
  const [popup, usePopup] = useState(false);
  const [text, useModel] = useState('');
  const [auth, useAuth] = useState('');
  const [user, useUser] = useState({ name: '', surname: '', biography: '' });

  useEffect(() => {
    useAuth(localStorage.getItem('authorId'));
  }, []);

  const handlerSend = () => {
    if (auth) {
      handlerCreatePost({ text, authorId: auth });
    } else {
      createUser();
    }

    usePopup(false);
  };

  const createUser = async () => {
    try {
      const author = await axios.post('/api/author', user);
      useAuth(author.data.id);
      localStorage.setItem('authorId', author.data.id);
    } catch (e) {
      console.log(e);
    }
  };

  const handlerUserModel = (event, type) => {
    const value = event.target.value
    useUser(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div>
      <button onClick={() => usePopup(true)}>{auth ? 'Create post' : 'Create user'}</button>
      {popup && (
        <div className="popup">
          <div className="popup__wrap">
            <div className="popup__close" onClick={() => usePopup(false)} />
            <div className="popup__content">
              <h3>{auth ? 'Create post' : 'Create user'}</h3>
              {auth ? (
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
              <button
                className="popup__btn"
                disabled={false}
                onClick={handlerSend}
              >
                {auth ? 'Send' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  handlerCreatePost: (model: any) => dispatch(createPost(model)),
});

export default connect(null, mapDispatchToProps)(Popup);
