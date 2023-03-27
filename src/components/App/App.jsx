import { useEffect, useState } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import LoadMoreBtn from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import { getImages } from 'api/api';
import { Notify } from 'notiflix';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // setStatus(STATUS.PENDING);
    if (query !== '') {
      getImages(query, page)
        .then(res => {
          const { hits, totalHits } = res.data;
          if (hits.length !== 0) {
            setImages(prev => [...prev, ...hits]);
            setStatus(STATUS.RESOLVED);
            setTotalHits(totalHits);
            Notify.success(`We found ${totalHits} images`);
          } else {
            setStatus(STATUS.REJECTED);
            Notify.failure('There are no images by this query');
          }
        })
        .catch(error => {
          setStatus(STATUS.REJECTED);
          setError(error.message);
          Notify.failure('There are no images by this query');
        });
    }
  }, [page, query]);

  const handleClick = e => {
    setPage(page => page + 1);
  };

  const handleFormSubmit = value => {
    value.trim() !== ''
      ? setQuery(value) && setStatus(STATUS.PENDING)
      : Notify.failure('Please fill out the form');
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}

      {status === STATUS.RESOLVED && totalHits > images.length && (
        <LoadMoreBtn onClick={handleClick} />
      )}

      {status === STATUS.PENDING && images.length > 0 && <Loader />}

      {totalHits === images.length &&
        totalHits !== 0 &&
        Notify.info('That is all we have found')}
    </Container>
  );
}

// class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     status: STATUS.IDLE,
//     totalHits: 0,
//     error: null,
//   };

//   componentDidUpdate(_, prevState) {
//     if (this.state.query.trim() === '') {
//       Notify.failure('Please fill out the form');
//     }
//     if (prevState.query !== this.state.query) {
//       try {
//         getImages(this.state.query, 1).then(res => {
//           const { hits, totalHits } = res.data;

//           if (hits.length !== 0) {
//             this.setState({
//               images: [...hits],
//               status: STATUS.RESOLVED,
//               totalHits: totalHits,
//             });

//             Notify.success(`We found ${totalHits} images`);
//           } else {
//             //this.setState({ status: STATUS.REJECTED });
//             this.changeStatus(STATUS.REJECTED);

//             Notify.failure('There are no images by this query');
//           }
//         });
//       } catch (error) {
//         console.log(error.message);
//         // this.setState({ status: STATUS.REJECTED });
//         this.changeStatus(STATUS.REJECTED);
//         this.setState({ error: error.message });

//         Notify.failure('There are no images by this query');
//       }
//     }
//   }

//   handleFormSubmit = value => {
//     this.setState({ query: value, status: STATUS.PENDING });
//   };

//   loadMoreImages = page => {
//     try {
//       this.setState({ status: STATUS.PENDING });
//       getImages(this.state.query, page)
//         .then(res =>
//           this.setState(({ images }) => ({
//             images: [...images, ...res.data.hits],
//           }))
//         )
//         .then(this.changeStatus(STATUS.RESOLVED));
//     } catch (error) {
//       console.log(error.message);
//       this.setState({ error: error.message });
//       this.changeStatus(STATUS.REJECTED);
//     }
//   };

//   changeStatus = status => {
//     this.setState({ status });
//   };

//   render() {
//     const { images, status, totalHits } = this.state;

//     return (
//       <Container>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {images.length > 0 && <ImageGallery images={images} />}

//         {status === STATUS.RESOLVED && totalHits > images.length && (
//           <LoadMoreBtn page={this.loadMoreImages} />
//         )}

//         {status === STATUS.PENDING && images.length > 0 && <Loader />}

//         {totalHits === images.length &&
//           totalHits !== 0 &&
//           Notify.info('That is all we have found')}
//       </Container>
//     );
//   }
// }
