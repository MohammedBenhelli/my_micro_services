const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/register', async (req, res) => {
    const {name,password,email} = req.body
    const details = {
        'name': name,
        'password': password,
        'email': email
    };

    let formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(req.body)
    fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then(r => r.text()).then(r => {
        console.log(r)
        res.send(r)
    })
})

app.post('/login', async (req, res) => {
    const {password,email} = req.body
    const details = {
        'password': password,
        'email': email
    };

    let formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(req.body)
    fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then(r => r.text()).then(r => {
        console.log(r)
        res.send(r)
    })
})

app.post('/message', async (req, res) => {
    const {sender, receiver, content} = req.body
    const details = {
        'sender': sender,
        'receiver': receiver,
        'content': content
    };
    console.log(req.headers.authorization)
    let formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(req.body)
    fetch('http://localhost:5555/message', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Authorization': req.headers.authorization,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then(r => r.text()).then(r => {
        console.log(r)
        res.send(r)
    })
})

app.listen(process.env.PORT || 4444, () => console.log(`port: ${process.env.PORT || 4444}`));
