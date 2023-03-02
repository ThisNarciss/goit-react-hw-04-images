import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export function Modal({ onModalClose, largeImg, tag }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  });

  const handleClick = evt => {
    if (evt.currentTarget === evt.target) {
      onModalClose();
    }
  };

  function handleEscape(evt) {
    if (evt.code === 'Escape') {
      onModalClose();
    }
  }

  return createPortal(
    <Overlay onClick={handleClick}>
      <ModalBox>
        <img src={largeImg} alt={tag} loading="lazy" />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};
