const express = require('express');
const { createUser, getAllUsers } = require('./routers/users.router');

const app = express();

app.get('/users', getAllUsers);
app.post('/users', createUser);

app.listen(3000, () => { console.log('App listening on port 3000') });
