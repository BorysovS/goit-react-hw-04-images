import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <GalleryList>
      {items.map(item => {
        return <ImageGalleryItem key={item.id} item={item} />;
      })}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};
