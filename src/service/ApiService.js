export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  };
  
  // Function to call OpenAI API for image analysis
  export const analyzeImage = async (image, query, apiKey) => {
    try {
      const base64Image = await fileToBase64(image.file);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: query },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          max_tokens: 300
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }
      
      const data = await response.json();
      return {
        imageId: image.id,
        response: data.choices[0].message.content
      };
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      return {
        imageId: image.id,
        response: `Error: ${error.message || 'Failed to analyze this image'}`
      };
    }
  };
  
  // Function to analyze multiple images in batch
  export const analyzeBatchImages = async (images, query, apiKey) => {
    try {
      const promises = images.map(image => analyzeImage(image, query, apiKey));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error in batch processing:', error);
      throw error;
    }
  };
  
  // Function to generate mock responses (for testing without API)
  export const generateMockResponses = (images, query) => {
    const mockResponses = [
      "There appear to be 5 books stacked in this image. The books vary in color and size, with the largest one at the bottom of the stack.",
      "I can see 4 books in this image. They are neatly arranged in a pile on what appears to be a white surface.",
      "This image shows one green notebook. The notebook has a label on the front cover and appears to be resting on a yellow surface.",
      "There are no visible defects or issues with this product image. The lighting is good and the product is clearly visible against the clean background."
    ];
    
    return images.map((image, index) => ({
      imageId: image.id,
      response: mockResponses[index % mockResponses.length]
    }));
  };