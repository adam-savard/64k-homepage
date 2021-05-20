const express = require('express')
const app = express()
const port = 3000
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const createNewDoc = require('./htmlProcessing').createNewDoc;
const getPage = require('./getPage').getPage;
const updateAndDelete = require('./updateAndDelete');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/about.html'));
})

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/api.html'));
})

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/submit.html'));
})

app.get('/modify', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/modify.html'));
})

app.put('/update', async (req, res) => {
  let response = await updateAndDelete.update({
    creatorKey : req.body.creatorKey,
    html : req.body.html
  });

  res.send(response);
})

app.delete('/delete', async (req, res) => {
  let response = await updateAndDelete.deleteDoc({
    creatorKey : req.body.creatorKey
  });

  res.send(response);
})



app.post('/newDoc', async (req, res) => {
    let newURL = await createNewDoc(req.body.data);
    res.send(newURL);
})

app.get('/page:pageID', async (req, res) => {
    let text = await getPage(req.params.pageID);
    if(text.includes('rejected')){
      res.sendFile(path.join(__dirname, 'public/html/rejected.html'));
      return;
    }
    res.send(text);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})