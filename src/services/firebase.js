import Firebase from 'firebase'
const {
  PRODUCT_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  DATABASE_URL
} = require('../config')

export default class FB {
  constructor() {
    if (Firebase.apps.length === 0) {
      const ref = Firebase.initializeApp({
        serviceAccount: {
          projectId: PRODUCT_ID,
          clientEmail: CLIENT_EMAIL,
          privateKey: PRIVATE_KEY
        },
        databaseURL   :  DATABASE_URL
      })

      this.db   = ref.database()//create my db function

    }
  }

  fetchOnceByRef(ref) {//ref can be given any name
    return this.db
            .ref(ref)
            .once('value')
  }  


  saveByRef(ref, data) {
    return this.db
            .ref(ref)
            .push(data)
  }



  updateByRef(ref, data) {
    return this.db
            .ref(ref)
            .update(data)
  }
}
