const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./../webpack.config.js');
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './../client/index.html'));
});

app.listen(3000, 'localhost', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');
});