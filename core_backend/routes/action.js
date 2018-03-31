var express = require('express')
var router = express.Router();

// We check for auth in top-level, no need to worry here
// There should be a `req.session.user_id`

router.post('create_topic', (req,res) => {
  console.log(`Creating topic ${req.body.name}`);
  res.send("Created topic!")
});
