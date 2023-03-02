import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem({
  item: { webformatURL, largeImageURL, tags },
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={toggleModal}
      />
      {showModal && (
        <Modal tag={tags} largeImg={largeImageURL} onModalClose={toggleModal} />
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
