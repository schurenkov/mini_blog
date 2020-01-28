import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { AppState } from '@STORE/reducers';
import { getPosts, createPost, deletePost } from '@STORE/post/actions';
import { ThunkDispatch } from 'redux-thunk';
import { Post } from '@STORE/post/types';

const App = ({loading, posts, handlerGetPost, handlerCreatePost, handlerDeletePost}) => {
    
    const [popup, usePopup] = useState(false);
    const [model, useModel] = useState({
        autor: '',
        text: '',
    })

    useEffect(() => {
        handlerGetPost();
    }, [])

    const handlerChangeModel = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, type: string) => {
        const value = event.target.value;

        useModel(prev => ({...prev, [type]: value}))
    }


    const handlerButton = () => {
        handlerCreatePost(model)
        useModel({
            autor: '',
            text: '',
        })
    }

    return (
        <div>
            {loading 
                ? 
                    <p>Загрузка</p> 
                :   
                    <div>
                        {posts.map((p: Post) => (
                            <div>
                                {p.autor} - {p.text} - {p.createdAt}
                                <button onClick={() => handlerDeletePost(p._id)}>х</button>
                            </div>
                        ))}
                        <button onClick={() => usePopup(true)}>Написать статью</button>
                        {popup && (
                            <div>
                                <input type="text" value={model.autor} placeholder='Автор' onChange={(event) => handlerChangeModel(event, 'autor')} />
                                <textarea value={model.text} placeholder='Текст' onChange={(event) => handlerChangeModel(event, 'text')} />
                                <button onClick={handlerButton}>Отправить</button>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
}



const mapStateToProps = ({ postState }: AppState) => ({
    loading: postState.loading,
    posts: postState.posts,
  });
  
const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
    handlerGetPost: () => dispatch(getPosts()),
    handlerCreatePost: (model: any) => dispatch(createPost(model)),
    handlerDeletePost: (id: string) => dispatch(deletePost(id)),
});


export default hot(module)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  );
