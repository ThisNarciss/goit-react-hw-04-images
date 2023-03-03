import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
// import { useEffect, useRef } from 'react';

export function ImageGallery({ gallery, children }) {
  // Скролл на хуках в галереї

  // const listRef = useRef(null);
  // const currentListRef = listRef.current;

  // useEffect(() => {
  //   if (currentListRef) {
  //     const list = listRef.current;

  //     window.scrollBy({
  //       top: list.scrollHeight - list.scrollTop,
  //       behavior: 'smooth',
  //     });
  //   }
  // }, [gallery, currentListRef]);

  return (
    <>
      <Gallery>
        {gallery &&
          gallery.map(item => {
            return <ImageGalleryItem key={item.id} item={item} />;
          })}
      </Gallery>
      {children}
    </>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired
  ).isRequired,
  children: PropTypes.node,
};
