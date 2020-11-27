const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const DiscussionSchema = require('./controllers/discussion.controller');
const utils = require('./functions');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Discussion = mongoose.model('Discussion', DiscussionSchema);
// utils.create(Discussion, DiscussionSchema)
db.on('error ', console.error.bind(console, 'Connexion error on MongoDB : '));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/message', async (req, res) => {
    const {sender, receiver, content} = req.body;
    const verif = (await Discussion.find().exec()).filter(x => (x.users[0].email === sender && x.users[1].email === receiver) ||
        (x.users[1].email === sender && x.users[0].email === receiver))
    console.log(verif)
    if (verif.length === 0) {
        console.log('creation')
        utils.create(Discussion, sender, receiver, content);
    } else {
        console.log('update')
        verif[0].messages.push({author: sender, content: content, date: Date.now()})
        await verif[0].save()
    }
    res.sendStatus(200)
})

app.get('/message', async (req, res) => {
    const {sender, receiver} = req.body;
    const verif = (await Discussion.find().exec()).filter(x => (x.users[0].email === sender && x.users[1].email === receiver) ||
        (x.users[1].email === sender && x.users[0].email === receiver))
    res.send(verif)
})

app.delete('/message', async (req, res) => {
    const {sender, receiver} = req.body;
    const verif = (await Discussion.find().exec()).filter(x => (x.users[0].email === sender && x.users[1].email === receiver) ||
        (x.users[1].email === sender && x.users[0].email === receiver))
    if (verif.length > 0)
        verif[0].delete();
    res.sendStatus(200)
})

app.listen(process.env.PORT || 5555, () => console.log(`port: ${process.env.PORT || 5555}`));

