import { useRef } from 'react';

const ImageUploader = ({ onImagesSelected, maxImages = 4 }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      onImagesSelected(imageFiles);
      
      // Reset file input so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="mb-2 text-sm font-medium text-gray-700">
        Upload up to {maxImages} product images
      </p>
      <p className="text-xs text-gray-500 mb-4">
        PNG, JPG or JPEG (max. {maxImages} images)
      </p>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
        multiple
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Select Images
      </button>
    </div>
  );
};

export default ImageUploader;