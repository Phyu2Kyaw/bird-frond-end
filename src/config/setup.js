//for chrome because it doesn't let to talk client and server

const accessControlAllow = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // need to change allow-orgin once alive
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
}

export {
  accessControlAllow
};
