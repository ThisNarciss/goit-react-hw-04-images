import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import React, { Component } from 'react';

export class ImageGallery extends Component {
  static propTypes = {
    gallery: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired
    ).isRequired,
    children: PropTypes.node,
  };

  listRef = React.createRef(null);

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { gallery } = this.props;
    if (prevProps.gallery.length < gallery.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      window.scrollBy({
        top: snapshot,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { gallery, children } = this.props;

    return (
      <>
        <Gallery ref={this.listRef}>
          {gallery &&
            gallery.map(item => {
              return <ImageGalleryItem key={item.id} item={item} />;
            })}
        </Gallery>
        {children}
      </>
    );
  }
}
