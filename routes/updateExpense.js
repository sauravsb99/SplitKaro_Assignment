var express = require('express');
var router = express.Router();
var AsyncLock = require('async-lock');
var lock = new AsyncLock();

function addAllMembers(index){
    for(var i = 0 ; i < list_obj[index].items.length;i++){
        for(var j = 0 ; j < list_obj[index].items[i].paid_by.length;j++){
            for(var z in list_obj[index].items[i].paid_by[j]){
                var flag = true;
                for(var k = 0 ; k < list_obj[index].list_members.length ; k++){
                    if(z ==list_obj[index].list_members[k]){
                        flag = false;
                        continue;
                    }
                }
                if(flag){
                    list_obj[index].list_members.push(z);
                }
            }
        }
        for(var j = 0 ; j < list_obj[index].items[i].paid_by.length;j++){
            for(var z in list_obj[index].items[i].owed_by[j]){
                var flag = true;
                for(var k = 0 ; k < list_obj[index].list_members.length ; k++){
                    if(z ==list_obj[index].list_members[k]){
                        flag = false;
                        continue;
                    }
                }
                if(flag){
                    list_obj[index].list_members.push(z);
                }
            }
        }
    }
}

function calculateTotalBalance(index){
    var total_balance = {};
    for(var i = 0 ; i < list_obj[index].items.length;i++){
        for(var j = 0 ; j < list_obj[index].items[i].paid_by.length;j++){
            for(var z in list_obj[index].items[i].paid_by[j]){
                console.log(z);
                console.log(isNaN(total_balance[z]));
                if(isNaN(total_balance[z]))
                    total_balance[z] = list_obj[index].items[i].paid_by[j][z];
                else
                    total_balance[z] += list_obj[index].items[i].paid_by[j][z];
                console.log(total_balance);
            }
        }    
        for(var j = 0 ; j < list_obj[index].items[i].owed_by.length;j++){        
            for(var z in list_obj[index].items[i].owed_by[j]){
                if(isNaN(total_balance[z]))
                    total_balance[z] = -1*list_obj[index].items[i].owed_by[j][z];
                else
                    total_balance[z] -= list_obj[index].items[i].owed_by[j][z];
                console.log(total_balance);
            }
        }
        
    }
    return total_balance;
    
}


function calculateExpense(index){
    addAllMembers(index);
    console.log(list_obj[index].list_members);
    var total_balance = calculateTotalBalance(index);
    console.log(total_balance);

}

router.put('/', function(req, res, next) {
    console.log(list_obj[0].name);
    for(let i=0;i<list_obj.length;i++){
        if(list_obj[i].name == req.body.name){
            lock.acquire("key", function(done) {
                list_obj[i].items = req.body.items;
                done(err, ret);
            }, function(err, ret) {
                // lock released
            },);
            console.log("calling calculateExpense");
            calculateExpense(i);
            res.send(list_obj[i]);
        }
    }
  });

module.exports = router;