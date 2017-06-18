const express = require('express');

const app = express();

app.use(express.static('dist'));

app.listen(1373, () => {
      console.log('* http on 0.0.0.0:1373');
});
