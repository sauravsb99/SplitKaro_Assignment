var express = require('express');
var router = express.Router();

/* Retunrs the list of all Groups */
router.get('/', function(req, res, next) {
  var list_groups = [];
  for(var i = 0 ; i < list_obj.length ; i++){
    list_groups.push(list_obj[i]["name"]);
  }
  res.send(list_groups);
});

module.exports = router;
