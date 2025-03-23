import React from 'react';

const ImagePreviewGrid = ({ images, onRemoveImage }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-2">Selected Images ({images.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
              <img
                src={image.url}
                alt={`Preview of ${image.file.name}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemoveImage(image.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Remove image"
            >
              ×
            </button>
            <div className="mt-1 text-xs text-gray-500 truncate px-1">
              {image.file.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewGrid;