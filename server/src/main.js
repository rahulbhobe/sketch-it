import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import shortid from 'shortid';

let app =  express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../../www'));
app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
app.use(favicon(__dirname + '/../../www/res/favicon.png'));
app.set('views', __dirname + '/../../www');
app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.get('/*', (req, res) => {
  let url = req.path.substring(1);
  if (!url) {
    res.render('index');
    return;
  }
});

app.post('/create', (req, res) => {
  let {data} = req.body;
  res.send({fileId: shortid.generate()});
});

app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + server.address().port);
});
