import { useState } from 'react';
import './App.css';

// Import components
import ImageUploader from './components/ImageUploader';
import ImagePreviewGrid from './components/ImagePreviewGrid';
import QueryInput from './components/QueryInput';
import ResultsDisplay from './components/DisplayResults';
import ErrorMessage from './components/ErrorMessage';


// Import API service
import { generateMockResponses, analyzeBatchImages } from './service/ApiService';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  
  const [apiKey, setApiKey] = useState('');
  const [useRealApi, setUseRealApi] = useState(false);

  
  const handleImagesSelected = (files) => {
    setError('');
    
    if (images.length + files.length > 4) {
      setError(`You can only upload up to 4 images. You've selected ${files.length} new images, but already have ${images.length}.`);
      return;
    }
    
    const newImages = files.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file)
    }));
    
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
    
    if (responses.some(response => response.imageId === id)) {
      const updatedResponses = responses.filter(response => response.imageId !== id);
      setResponses(updatedResponses);
    }
  };


  const handleSubmitQuery = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image before submitting a query.');
      return;
    }

    if (!query.trim()) {
      setError('Please enter a query about the images.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      let results;
      
      if (useRealApi && apiKey) {
        
        results = await analyzeBatchImages(images, query, apiKey);
      } else {
        
        results = generateMockResponses(images, query);
      
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setResponses(results);
    } catch (err) {
      setError(`Error: ${err.message || 'Failed to process your request. Please try again.'}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">BatchQuery Chatbot</h1>
          <p className="mt-2 text-gray-600">Upload images and ask questions about them all at once</p>
        </header>
        
        <main className="bg-white shadow rounded-lg p-6">
          <ErrorMessage message={error} />
          
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Step 1: Upload Images</h2>
            <ImageUploader 
              onImagesSelected={handleImagesSelected} 
              maxImages={4} 
            />
          </div>
          
          <ImagePreviewGrid 
            images={images} 
            onRemoveImage={handleRemoveImage} 
          />
          
          {images.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Step 2: Ask a Question</h2>
              <QueryInput 
                query={query}
                setQuery={setQuery}
                onSubmit={handleSubmitQuery}
                isLoading={loading}
                disabled={images.length === 0}
              />
              
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        checked={useRealApi}
                        onChange={(e) => setUseRealApi(e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-600">Use OpenAI API</span>
                    </label>
                  </div>
                  
                  {useRealApi && (
                    <div className="ml-4 flex-grow">
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your OpenAI API key"
                        className="block w-full px-3 py-2 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
                {!useRealApi && (
                  <p className="mt-2 text-xs text-gray-500">
                    Currently using mock responses. Toggle to use the OpenAI API.
                  </p>
                )}
              </div>
            </div>
          )}
          
          
          <ResultsDisplay 
            responses={responses} 
            images={images} 
            query={query}
          />
        </main>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>BatchQuery Chatbot for Image Analysis</p>
        </footer>
      </div>
    </div>
  );
}

export default App;