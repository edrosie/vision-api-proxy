export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST allowed' });
    }
  
    const { base64Image } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;
  
    const visionURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  
    const requestBody = {
      requests: [
        {
          image: { content: base64Image },
          features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
        },
      ],
    };
  
    const response = await fetch(visionURL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });
  
    const data = await response.json();
    res.status(200).json(data);
  }
  