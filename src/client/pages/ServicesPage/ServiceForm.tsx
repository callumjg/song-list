import React, { useState } from 'react';
import useListReducer from '../../hooks/useListReducer';
import useResource from '../../hooks/useResource';
import SongSelector from './SongSelector';
import './ServiceForm.scss';

interface Props {
  onSubmit: (...args: any[]) => void;
  onDismiss: () => void;
}

const ServiceForm: React.FC<Props> = (props) => {
  const [search, setSearch] = useState('');
  const [inputTag, setInputTag] = useState('');
  const [date, setDate] = useState('');

  const [songs, songDispatch] = useListReducer([], {
    target: '_id',
  });
  const [tags, tagDispatch] = useListReducer([]);
  const url = search.length > 1 ? `/songs?limit=5&search=${search}` : null;
  const [resource, error, isLoading] = useResource(url, null);
  const searchSongs = resource ? resource.songs : [];

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await props.onSubmit({ songs, date, tags });
      props.onDismiss();
    } catch (err) {
      console.log(err);
    }
  };

  const onSongSelect = (payload) => {
    songDispatch({ type: 'ADD', payload });
    setSearch('');
  };

  const addTag = () => {
    tagDispatch({ type: 'ADD', payload: inputTag });
    setInputTag('');
  };

  const removeTag = (payload: any) => tagDispatch({ type: 'REMOVE', payload });

  const onTagKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  return (
    <form onSubmit={onSubmit} className="service-form container">
      {error && <div className="alert alert-danger">{error}</div>}
      <section className="form-group">
        <h4>Date</h4>
        <input
          className="form-control"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </section>

      {/* Tags Section */}
      <section>
        <h4>Tags</h4>
        {tags.length > 0 && (
          <ol className="list tags-list">
            {tags.map((tag: any, i: number) => (
              <li key={i}>
                {tag}
                <button className="btn btn-sm btn-outline-danger" type="button">
                  <i className="ui trash icon" onClick={() => removeTag(i)} />
                </button>
              </li>
            ))}
          </ol>
        )}

        <div className="form-group d-flex justify-content-between">
          <input
            type="text"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            onKeyPress={onTagKeyPress}
            className="form-control"
            placeholder="Add tag..."
          />
        </div>
      </section>

      {/* Songs section */}
      <section>
        <h4>Songs</h4>
        <ol className="list songs-list">
          {songs.length > 0 &&
            songs.map((song: any) => {
              const { title, _id } = song;
              return (
                <li key={_id}>
                  {title}
                  <button className="btn btn-sm btn-outline-danger">
                    <i
                      className="ui trash icon"
                      onClick={() =>
                        songDispatch({ type: 'REMOVE', payload: _id })
                      }
                    />
                  </button>
                </li>
              );
            })}
        </ol>
      </section>
      <section className="search form-group">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          placeholder="Search songs..."
        />
        <SongSelector
          songs={searchSongs}
          isLoading={isLoading}
          onSelect={onSongSelect}
        />
      </section>
      <section className="d-flex justify-content-end">
        <button className="btn btn-sm btn-outline-primary mr-2">Save</button>
        <button
          type="button"
          onClick={props.onDismiss}
          className="btn btn-sm btn-outline-info mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            tagDispatch({ type: 'CLEAR' });
            songDispatch({ type: 'CLEAR' });
          }}
          className="btn btn-sm btn-outline-secondary"
        >
          Clear
        </button>
      </section>
    </form>
  );
};

export default ServiceForm;
