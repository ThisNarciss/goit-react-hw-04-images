import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { pixabay } from 'api/pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { AppBox } from './App.styled';

export function App() {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!search) {
      return;
    }
    setLoading(true);
    pixabay
      .fetchGallery(page, search)
      .then(({ images, totalHits }) => {
        setGallery(state => [...state, ...images]);
        setTotalHits(totalHits);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => {
    return () => setSearch('');
  }, []);

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  const handleSubmit = values => {
    setPage(1);
    setSearch(values.search);
    setGallery([]);
  };

  return (
    <AppBox>
      <Searchbar onSubmit={handleSubmit} />
      <section>
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
