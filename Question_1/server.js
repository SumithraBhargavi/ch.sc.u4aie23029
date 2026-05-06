const express = require('express');
const app = express();
app.use(express.json());
// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


let users = [];
app.get('/users', (req, res) => {
    res.json(users);
});
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.json({
        message : 'User added successfully',
        data : users
    });
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < users.length) {
        users.splice(id, 1);
        res.json({
            message: 'User deleted successfully',
            data: users
        });
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});