import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import shortid from 'shortid';
import ForgeSDK from 'forge-apis';
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

app.get('/*', (req, res, next) => {
  let url = req.path.substring(1);
  if (!url) {
    res.render('index');
    return;
  }
  next();
});

app.get('/token', (req, res) => {
  let url = 'https://developer.api.autodesk.com/da/us-east/v3';
  let clientId = process.env.CLIENT_ID || '';
  let clientSecret = process.env.CLIENT_SECRET || '';
  let authScope    = ['data:write', 'data:create', 'data:read', 'bucket:read', 'bucket:update', 'bucket:create', 'bucket:delete', 'viewables:read', 'code:all'];
  let oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(clientId, clientSecret, authScope, true);

  oAuth2TwoLegged.authenticate().then(token => {
    res.json(token);
  });
});

app.get('/thumbnail', (req, res) => {
  let {fileId} = req.query;
  ForgeUtils.getDerivatives(fileId).then(_ => {
    return ForgeUtils.getThumbnail(fileId);
  }).then(thumbnail => {
    res.json({found: true,  thumbnail});
  }).catch(_ => {
    res.json({found: false, thumbnail: ''});
  });
});

app.get('/download', (req, res) => {
  let {fileId} = req.query;
  ForgeUtils.createSignedResource(fileId).then(signedUrl => {
    res.json({found: true,  signedUrl});
  }).catch(_ => {
    res.json({found: false, thumbnail: ''});
  });
});

app.post('/create', (req, res) => {
  let {elements} = req.body;
  let fileId = shortid.generate() + '.rvt';

  ForgeUtils.createEmptyResource(fileId).then(_ => {
    return ForgeUtils.createSignedResource(fileId, 'write');
  }).then(signedUrl => {
    let payLoad = {
      activityId: 'SketchItDemo.SketchItActivity+test',
      arguments: {
        sketchItInput: {
          url: 'data:application/json,'+JSON.stringify(elements)
        },
        result: {
          'verb': 'put',
          url: signedUrl
        }
      }
    };
    return ForgeUtils.postWorkitem(payLoad);
  }).then(id => {
    console.log('posted -', id);
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
  res.json({fileId});
});

app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + server.address().port);
});

ForgeUtils.init();
