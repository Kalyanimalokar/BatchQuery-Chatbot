import React from 'react';

const QueryInput = ({ query, setQuery, onSubmit, isLoading, disabled }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled && !isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        <label htmlFor="query-input" className="block text-sm font-medium text-gray-700 mb-2">
          Ask a question about the images:
        </label>
        <div className="flex rounded-md shadow-sm">
          <input
            type="text"
            id="query-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., How many books are in this image?"
            disabled={isLoading || disabled}
          />
          <button
            type="submit"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white focus:outline-none ${
              isLoading || disabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
            disabled={isLoading || disabled}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Analyze Images'
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Your question will be applied to all selected images simultaneously.
        </p>
      </form>
    </div>
  );
};

export default QueryInput;