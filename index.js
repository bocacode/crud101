const express = require('express')
const admin = require('firebase-admin')

const credentials = require('./credentials.json')

const port = 3000

admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

const db = admin.firestore()

const app = express()

app.get('/yo', (request, response) => {
  response.send('Yo!')
})

app.get('/products', (request, response) => {
  db.collection('products').get()
    .then(collection => {
      let productsArray = []
      collection.forEach(doc => {
        const thisData = doc.data()
        const thisProduct = {
          id: doc.id,
          name: thisData.name || thisData.Name,
          category: thisData.category || thisData.Category,
          vendor: thisData.vendor || thisData.Vendor,
        }
        productsArray.push(thisProduct)
      })
      response.send(productsArray)
    })
    .catch(err => response.status(501).send('Error getting products: ', err))  
})

app.listen(port, () => {
  console.log('Listening to http://localhost:' + port)
})
