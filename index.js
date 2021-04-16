const admin = require('firebase-admin')

const credentials = require('./credentials.json')

admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

const db = admin.firestore()

// NOW WE CAN CRUD!!
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
    console.log(productsArray)
  })
  .catch(err => console.log('Error getting products: ', err))
