const connection = require('./connection')

//shows all the receipts
function getReceipts(auth0_id, db = connection) {
  return db('receipts').select().where({ auth0_id })
}

//show a single receipt

function getReceipt(id, db = connection) {
  return db('receipts').select().where('id', id).first()
}

//gets all stores from receipts in an array

function getStores(auth0_id, db = connection) {
  return db('receipts').select('store').where({ auth0_id })
}

//gets all types from categories

function getTypes(auth0_id, db = connection) {
  return db('categories').select('type').where({ auth0_id })
}

//add to a list of receipts

function addReceipt(auth0_id, receipts, db = connection) {
  const newReceipt = {
    auth0_id: auth0_id,
    name: receipts.name,
    image: receipts.image,
    purchase_date: receipts.purchaseDate,
    store: receipts.store,
    price: receipts.price,
    note: receipts.note,
  }
  return db('receipts').insert(newReceipt)
}

// update receipt by id
function updateReceipt(id, updatedReceipt, db = connection) {
  return db('receipts').where('id', id).update(updatedReceipt)
}

// delete receipt by id
function deleteReceipt(id, db = connection) {
  return db('receipts').where('id', id).del()
}

module.exports = {
  getReceipts,
  getReceipt,
  addReceipt,
  deleteReceipt,
  updateReceipt,
  getStores,
  getTypes,
}
