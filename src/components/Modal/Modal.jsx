import { Overlay, ModalWindow } from './Modal.styled';
import { useEffect } from 'react';

const Modal = ({ src, tags, closeModal }) => {
  useEffect(() => {
    const closeModalByKeydown = e => {
      if (e.code === 'Escape') closeModal();
    };

    const closeModalByClick = e => {
      if (e.target.nodeName === 'DIV') closeModal();
    };

    window.addEventListener('click', closeModalByClick);
    window.addEventListener('keydown', closeModalByKeydown);
    return () => {
      window.removeEventListener('click', closeModalByClick);
      window.removeEventListener('keydown', closeModalByKeydown);
    };
  }, [closeModal]);

  return (
    <Overlay>
      <ModalWindow>
        <img src={src} alt={tags} width={'100%'} />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;
