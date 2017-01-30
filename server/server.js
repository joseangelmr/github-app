import got from 'got';

const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./../webpack.config.js');
const app = express();
const compiler = webpack(config);
const since = 0;

function getUsers(query) {
    const URL = 'https://api.github.com/users'
    return got.get(URL, {
        query: {
            since: query.since,
            per_page : 100
        }
    })
}

function searchUsers(query) {
    const URL = 'https://api.github.com/search/users'
    return got.get(URL, {
        query: {
            q : query.q,
            per_page : 100
        }
    })
}

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './../client/index.html'));
});

app.post('/users', function (req, res) {
    getUsers(req.query)
        .then(response => {
            res.send(response.body)
        })
        .catch(error => {
            console.log('err', error)
            res.send(error);
        });
})

app.get('/search/users', function (req, res) {
    searchUsers(req.query)
        .then(response => {
            res.send(response.body)
        })
        .catch(error => {
            console.log('err', error)
            res.send(error);
        });
})


app.listen(3000, 'localhost', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');
});