import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';

import { GalleryItemImage, GalleryItem } from './ImaeGalleryItem.styled';

export const ImageGalleryItem = ({
  item: { webformatURL, largeImageURL, tags },
}) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      <GalleryItem onClick={() => setIsShowModal(true)}>
        <GalleryItemImage src={webformatURL} alt={tags} />
      </GalleryItem>
      {isShowModal && (
        <Modal
          imageModal={largeImageURL}
          title={tags}
          onClose={() => {
            setIsShowModal(false);
          }}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
