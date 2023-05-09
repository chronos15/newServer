const express = require('express');
const axios = require('axios');
const app = express();

const apiUrl = 'http://177.86.172.152:3040/SOFTWORKMOBILE/Imagens';

// endpoint para listar os nomes das imagens
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    const images = response.data.split('\n')
      .filter(item => item.includes('.jpg'))
      .map(item => item.match(/href="(.*)"/)[1]);
    res.send(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

// endpoint para retornar a imagem pelo nome
app.get('/:imageName', async (req, res) => {
  const imageName = req.params.imageName;
  const imageUrl = `${apiUrl}/${imageName}`;
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
