var express = require('express');
var router = express.Router();

// Creates a new Group
router.post('/', function(req, res, next) {
    console.log('POST GroupCreation');
    var group = {}
    group.name = req.body.name;
    group.list_members = req.body.list_members;
    group.items = undefined;
    group.balances = {};
    list_obj.push(group);
    console.log(group);
    res.send(req.body);
  });

module.exports = router;