var express = require('express');
var router = express.Router();

function calculateExpense(){

}

router.post('/', function(req, res, next) {
    console.log(list_obj[0].name);
    for(let i=0;i<list_obj.length;i++){
        if(list_obj[i].name == req.body.name){
            list_obj[i].items = req.body.items;
            // calculateExpense();
            res.send(list_obj[i]);
        }
    }
  });

module.exports = router;