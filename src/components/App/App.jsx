import { useEffect, useState } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import LoadMoreBtn from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import { getImages } from 'api/api';
import { Notify } from 'notiflix';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    async function foo() {
      const res = await getImages(query, page);
      const { hits, totalHits } = res.data;
      if (hits.length !== 0) {
        setImages(prev => [...prev, ...hits]);
        setIsLoading(false);
        setTotalHits(totalHits);
        page === 1 && Notify.success(`We found ${totalHits} images`);
      } else {
        Notify.failure('There are no images by this query');
        setIsLoading(false);
      }
    }
    foo();
  }, [page, query]);

  const handleClick = e => {
    setPage(page => page + 1);
  };

  const handleFormSubmit = value => {
    setPage(1);
    setQuery(value);
    setImages([]);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} />
      {isLoading && page !== 1 && <Loader />}
      {!isLoading && totalHits > images.length && (
        <LoadMoreBtn onClick={handleClick} />
      )}
      {totalHits === images.length &&
        totalHits !== 0 &&
        Notify.info('That is all we have found')}
    </Container>
  );
}
