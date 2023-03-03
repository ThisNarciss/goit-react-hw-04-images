import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { pixabay } from 'api/pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { AppBox, Error } from './App.styled';

export function App() {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    pixabay
      .fetchGallery(page, search, signal)
      .then(({ images, totalHits }) => {
        setGallery(state => [...state, ...images]);
        setTotalHits(totalHits);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));

    return () => {
      abortController.abort();
    };
  }, [page, search]);

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  const handleSubmit = values => {
    setPage(1);
    if (search !== values.search) {
      setSearch(values.search);
    } else {
      setSearch('');
    }
    setGallery([]);
  };

  return (
    <AppBox>
      <Searchbar onSubmit={handleSubmit} />
      <section>
        {error && <Error>Bad request</Error>}
        {loading && page === 1 && <Loader />}
        {Boolean(gallery.length) && (
          <ImageGallery gallery={gallery}>
            {loading && <Loader />}
            {Boolean(gallery.length) && gallery.length < totalHits && (
              <Button onBtnClick={handleLoadMore} />
            )}
          </ImageGallery>
        )}
      </section>
    </AppBox>
  );
}
