const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

async function find() {
  return await db('users');
}

async function findById(id) {
  return await db('users')
    .where({ id: Number(id) })
    .first();
}

async function insert(user) {
  return await db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

async function update(id, user) {
  return await db('users')
    .where('id', Number(id))
    .update(user);
}

async function remove(id) {
  return await db('users')
    .where('id', Number(id))
    .del();
}
