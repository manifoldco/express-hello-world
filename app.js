const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const LogDNA = require('logdna');
const log = LogDNA.setupDefaultLogger(process.env.KEY, {});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

app.get('/', (_, res) => res.sendFile(__dirname + '/views/index.html'));
app.post('/api/log', (req, res) => {
  try {
    log.log(req.body.log);
    res.send(`Logged: ${req.body.log}`);
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
