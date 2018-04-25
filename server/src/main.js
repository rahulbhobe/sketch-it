import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import shortid from 'shortid';
import ForgeUtils from './forge_utils';
import base64 from 'base-64';

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
  let data = JSON.parse(base64.decode(req.body.data));
  let fileId = shortid.generate() + '.rvt';
  ForgeUtils.createSignedResource(fileId).then(signedUrl => {
    let payLoad = {
      activityId: 'SketchItDemo.SketchItActivity+test',
      arguments: {
        sketchItInput: {
          url: 'data:application/json,'+JSON.stringify(data)
        },
        result: {
          'verb': 'put',
          url: signedUrl
        }
      }
    };
    return ForgeUtils.postWorkitem(payLoad);
  }).then(id => {
    console.log(id);
    return ForgeUtils.getWorkitemStatusLoop(id);
  }).then(status => {
    console.log(status, '- generated ' + fileId);
    return ForgeUtils.translate(fileId);
  }).then(() => {
    return ForgeUtils.getDerivativesLoop(fileId);
  }).then(status => {
    console.log(status, '- translated ' + fileId);
  }).catch(err => {
    console.log(err)
  });

  res.send({fileId});
});

app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + server.address().port);
});

ForgeUtils.init();
