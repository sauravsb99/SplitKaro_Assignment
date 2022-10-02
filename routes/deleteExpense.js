var express = require('express');
var router = express.Router();

// Delete's an expense
router.delete('/', function(req, res, next) {
    console.log(list_obj[0].name);
    for(let i=0;i<list_obj.length;i++){
        if(list_obj[i].name == req.body.name){
            list_obj[i].items = [];
            list_obj[i].balances = {};
            res.send(list_obj[i]);
        }
    }
  });

module.exports = router;