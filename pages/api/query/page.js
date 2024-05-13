import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Make a POST request to retrieve the PDF file
      const response = await axios({ 
        url: '127.0.0.1:8000/find',
        method: 'POST',
        data: req.body,
      });

      console.log(response,'inga');

      res.status(response.status).json(response.data);
    } catch (err) {
      // Handle errors
      console.log(err, 'error');
      res.status(400).json({ status: false, message: (err).message });
    }
  } else {
    // If the request method is not POST, send a method not allowed response
    res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }
}
