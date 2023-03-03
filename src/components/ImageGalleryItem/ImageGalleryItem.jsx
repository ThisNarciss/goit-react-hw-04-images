import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { useEffect, useRef } from 'react';

export function ImageGalleryItem({
  item: { webformatURL, largeImageURL, tags, itemToScroll },
}) {
  const [showModal, setShowModal] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      // const rect = itemRef.current.getBoundingClientRect();
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
        // top: rect.top - 150,
      });
      // itemRef.current.scrollTop -= 20;
      // document.getElementById('containingDiv').scrollTop -= 10;
      // console.log(document.getElementById('containingDiv'));
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem ref={itemToScroll ? itemRef : null}>
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
    itemToScroll: PropTypes.bool.isRequired,
  }).isRequired,
};
