import FB        from '../services/firebase'
const fb         = new FB()

const SOUNDS = 'sounds/'
const USERS  = 'users/'

const saveSound = (req, res, next) => {
  let { path, name } = req.body.payload

  req.body.payload.key = fb.saveByRef(`${SOUNDS}`, {name, path}).key

  next();
}

const getUsers = (req, res, next) => {
  fb.fetchOnceByRef(`${USERS}`).then((snapshot) => {
    if(snapshot.val()) {
      req.body.payload.users = snapshot.val();
      next()
    }
  })
}

export default {
  saveSound,
  getUsers
}
