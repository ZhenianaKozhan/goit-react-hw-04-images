import { ImageCard } from './ImageGalleryItem.styled';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = e => setShowModal(true);

  const closeModal = () => setShowModal(false);

  return (
    <>
      <ImageCard onClick={handleItemClick}>
        <img src={webformatURL} alt={tags} />
      </ImageCard>

      {showModal && (
        <Modal src={largeImageURL} tags={tags} closeModal={closeModal} />
      )}
    </>
  );
};

export default ImageGalleryItem;
