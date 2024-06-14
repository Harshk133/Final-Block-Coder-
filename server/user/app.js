const express = require('express');
const app = express();

app.get('/hwp', (req, res) => {
      res.send('hi world programmer!');
});

app.listen(5646, () => {
    console.log('Server running on port ' + 5646);
});
