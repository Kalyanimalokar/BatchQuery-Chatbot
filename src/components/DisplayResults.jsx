import React from 'react';

const ResultsDisplay = ({ responses, images, query }) => {
  if (!responses || responses.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="border-b border-gray-200 pb-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Results</h2>
        <p className="text-sm text-gray-500">Query: "{query}"</p>
      </div>
      
      <div className="space-y-6">
        {responses.map((result) => {
          const image = images.find(img => img.id === result.imageId);
          if (!image) return null;
          
          return (
            <div key={result.imageId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3">
                  <img
                    className="h-48 w-full object-cover md:h-full"
                    src={image.url}
                    alt={`Analysis of ${image.file.name}`}
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="text-xs text-gray-500 mb-1">
                    {image.file.name}
                  </div>
                  <div className="text-gray-700 space-y-2">
                    <p>{result.response}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsDisplay;