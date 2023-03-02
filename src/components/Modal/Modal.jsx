import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  static propTypes = {
    largeImg: PropTypes.string.isRequired,
    onModalClose: PropTypes.func.isRequired,
    tag: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleClick = evt => {
    const { onModalClose } = this.props;
    if (evt.currentTarget === evt.target) {
      onModalClose();
    }
  };

  handleEscape = evt => {
    const { onModalClose } = this.props;
    if (evt.code === 'Escape') {
      onModalClose();
    }
  };
  render() {
    const { largeImg, tag } = this.props;

    return createPortal(
      <Overlay onClick={this.handleClick}>
        <ModalBox>
          <img src={largeImg} alt={tag} loading="lazy" />
        </ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}
