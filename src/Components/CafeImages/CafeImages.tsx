/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import { useAppSelector } from '../../app/hooks';

export const CafeImages: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const { selectedCafe } = useAppSelector(
    (state) => state.selectedCafe
  );

  const images = selectedCafe?.images;

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="cafe-info__photo-section">
      {selectedCafe?.images.map((src, index) => (
        // eslint-disable-next-line
        <img
          src={ src }
          onClick={ () => openImageViewer(index) }
          width="100%"
          key={ src }
          style={{ margin: '2px' }}
          alt=""
          className="cafe-info__image"
        />
      ))}

      {isViewerOpen && images && (
        <ImageViewer
          src={ images }
          currentIndex={ currentImage }
          disableScroll
          closeOnClickOutside
          onClose={ closeImageViewer }
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.8)"
          }}
        />
      )}
    </div>
  );
};
