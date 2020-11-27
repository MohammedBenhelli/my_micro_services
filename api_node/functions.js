module.exports = {
    create: (Model, sender, receiver, content) => {
        const dis = new Model({
            users: [{email: sender}, {email: receiver}],
            messages: [{
                content: content,
                author: sender,
                date: Date.now()
            }],
        });
        dis.save((err) => {
            if (err) throw err
        });
    },
}
