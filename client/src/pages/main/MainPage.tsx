import React, { FC, useEffect, useRef, useState } from 'react';
import { IPost } from '@STORE/post/types';
import Post from './components/Post';
import dayjs from 'dayjs';
import IProps from './types';

const MainPage: FC<IProps> = ({ loading, posts, handlerGetPost, handlerDeletePost }) => {
  const author = useRef({ _id: '', name: ''});
  const [search, useSearch] = useState<string>('');
  const [searchAuthor, useSearchAuthor] = useState<string>('');
  const [filters, useFilters] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });
  useEffect(() => {
    const authorStorage: string = localStorage.getItem('author');
    if (authorStorage) {
      author.current = JSON.parse(authorStorage);
    }
    handlerGetPost();
  }, []);

  const handlerDates = (event, type) => {
    const value = event.target.value;
    useFilters(prev => ({ ...prev, [type]: value }));
  };

  const arrayFilter = () => {
    let copyPosts = [...posts];

    if (dayjs(filters.start).isValid()) {
      copyPosts = copyPosts.filter(f => dayjs(filters.start).isBefore(dayjs(f.createdAt)));
    }
    if (dayjs(filters.end).isValid()) {
      copyPosts = copyPosts.filter(f => dayjs(filters.end).isAfter(dayjs(f.createdAt)));
    }

    if (search.length > 0) {
      copyPosts = copyPosts.filter(f => f.text.indexOf(search) !== -1);
    }

    if (searchAuthor.length > 0) {
      copyPosts = copyPosts.filter(f => f.author.name.indexOf(searchAuthor) !== -1);
    }

    return copyPosts;
  };

  const arrayPosts = arrayFilter();

  return (
    <div className="main">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="main__wrap">
          <div className="main__posts">
            <h2>Posts: {arrayPosts.length}</h2>
            {arrayPosts.map((p: IPost) => (
              <Post
                key={p._id}
                data={p}
                deleteShow={author.current._id === p.author._id}
                handlerDeletePost={handlerDeletePost}
              />
            ))}
            {arrayPosts.length === 0 && <p>No posts.</p>}
          </div>
          <div className="main__filters">
            <h2>Filters</h2>
            <div className="main__filters-wrap">
              <div>
                <input placeholder="Search by text" value={search} onChange={event => useSearch(event.target.value)} />
              </div>
              <div>
                <input
                  placeholder="Search by author"
                  value={searchAuthor}
                  onChange={event => useSearchAuthor(event.target.value)}
                />
              </div>
              <div>
                <label>Start date</label>
                <input value={filters.start} type="datetime-local" onChange={event => handlerDates(event, 'start')} />
              </div>
              <div>
                <label>End date</label>
                <input value={filters.end} type="datetime-local" onChange={event => handlerDates(event, 'end')} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
