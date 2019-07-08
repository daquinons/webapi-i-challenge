const express = require('express');
const User = require('./data/db');

const server = express();
server.use(express.json());

server.get('/api/users', async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'The users information could not be retrieved.' });
  }
});

server.post('/api/users', async (req, res) => {
  try {
    const { body } = req;

    if (!body.name || !body.bio) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
      const idObject = await User.insert(body);
      const createdUser = await User.findById(idObject.id);

      res.status(201).json(createdUser);
    }
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while saving the user to the database'
    });
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    const { params } = req;
    const id = params.id;
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The user information could not be retrieved.' });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  try {
    const { params } = req;
    const id = params.id;
    const userToDelete = await User.findById(id);
    if (userToDelete) {
      await User.remove(id);
      res.json(userToDelete);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The user could not be removed' });
  }
});

server.put('/api/users/:id', async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    if (!data.name || !data.bio) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
      const userToUpdate = await User.findById(id);
      if (!userToUpdate) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        await User.update(id, data);
        res.json({ ...data, id });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The user information could not be modified.' });
  }
});

server.listen(3000, () => console.log('API running on port 3000'));
