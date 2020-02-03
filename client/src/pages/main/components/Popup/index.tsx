import React, { FC, useEffect, useRef, useState } from 'react';
import { AppState } from '@STORE/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createPost } from '@STORE/post/actions';
import { connect } from 'react-redux';
import './style.scss';
import { IProps } from './types';
import { IAuthor } from '@STORE/author/types';
import { createUser } from '@STORE/user/actions';

const Popup: FC<IProps> = ({ user, handlerCreatePost, handlerCreateUser }) => {
  const maxCount = useRef(512);
  const [popup, usePopup] = useState<boolean>(false);
  const [text, useModel] = useState<string>('');
  const [userModel, useUserModel] = useState<IAuthor>({ name: '', surname: '', biography: '' });
  const [auth, useAuth] = useState<boolean>(false);

  useEffect(() => {
    useAuth(user._id.length > 0);
  }, [user]);

  const handlerSend = () => {
    if (auth) {
      handlerCreatePost(text);
      useModel('');
    } else {
      handlerCreateUser(userModel);
    }

    usePopup(false);
  };

  const handlerUserModel = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    type: string
  ) => {
    const value = event.target.value;
    useUserModel(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div>
      <button onClick={() => usePopup(true)}>{auth ? 'Create post' : 'Create author'}</button>
      {popup && (
        <div className="popup">
          <div className="popup__wrap">
            <div className="popup__close" onClick={() => usePopup(false)} />
            <div className="popup__content">
              <h3>{auth ? 'Create post' : 'Create author'}</h3>
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
                      value={userModel.name}
                      placeholder="Name"
                      onChange={event => handlerUserModel(event, 'name')}
                    />
                    <input
                      type="text"
                      value={userModel.surname}
                      placeholder="Surname"
                      onChange={event => handlerUserModel(event, 'surname')}
                    />
                  </div>
                  <textarea
                    value={userModel.biography}
                    placeholder="Bio"
                    onChange={event => handlerUserModel(event, 'biography')}
                  />
                </>
              )}
            </div>
            <div className="popup__wrap-btn">
              <button className="popup__btn" disabled={false} onClick={handlerSend}>
                {auth ? 'Send' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ userState }: AppState) => ({
  user: userState,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  handlerCreatePost: (text: string) => dispatch(createPost(text)),
  handlerCreateUser: (user: IAuthor) => dispatch(createUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
