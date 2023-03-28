import { ImageCard } from './ImageGalleryItem.styled';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = e => setIsShowModal(true);

  const closeModal = () => setIsShowModal(false);

  return (
    <>
      <ImageCard onClick={showModal}>
        <img src={webformatURL} alt={tags} />
      </ImageCard>

      {isShowModal && (
        <Modal src={largeImageURL} tags={tags} closeModal={closeModal} />
      )}
    </>
  );
};

export default ImageGalleryItem;
