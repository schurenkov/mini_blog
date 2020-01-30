import React, { useEffect, useState } from 'react';
import { IPost } from '@STORE/post/types';
import Post from './components/Post';
import dayjs from 'dayjs';

const MainPage = ({ loading, posts, handlerGetPost }) => {
  const [search, useSearch] = useState('');
  const [searchAuthor, useSearchAuthor] = useState('');
  const [filters, useFilters] = useState({
    start: '',
    end: '',
  });
  useEffect(() => {
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
      copyPosts = copyPosts.filter(f => f.author.indexOf(searchAuthor) !== -1);
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
              <Post key={p._id} data={p} />
            ))}
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
