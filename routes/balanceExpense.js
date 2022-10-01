var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    for(let i=0;i<list_obj.length;i++){
        if(list_obj[i].name == req.body.name){
            result_obj = {};
            result_obj.name = list_obj[i].name;
            result_obj.balance = list_obj[i].balance;
            res.send(result_obj);
        }
    }
  });

module.exports = router;