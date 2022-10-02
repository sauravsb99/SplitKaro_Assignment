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
                if(isNaN(total_balance[z]))
                    total_balance[z] = list_obj[index].items[i].paid_by[j][z];
                else
                    total_balance[z] += list_obj[index].items[i].paid_by[j][z];
            }
        }    
        for(var j = 0 ; j < list_obj[index].items[i].owed_by.length;j++){        
            for(var z in list_obj[index].items[i].owed_by[j]){
                if(isNaN(total_balance[z]))
                    total_balance[z] = -1*list_obj[index].items[i].owed_by[j][z];
                else
                    total_balance[z] -= list_obj[index].items[i].owed_by[j][z];
            }
        }
        
    }
    return total_balance;
    
}


function getMin(total_balance)
{
    var minInd = 10000000;
    var key;
    for (var i in total_balance)
        if (total_balance[i] < minInd){
            key = i;
            minInd = total_balance[i];
        }       
    return key;
}
     
function getMax(total_balance)
{
    var minInd = -10000000;
    var key;
    for (var i in total_balance)
        if (total_balance[i] > minInd){
                key = i;
                minInd = total_balance[i];
        }       
    return key;
}
     
    // A utility function to return minimum of 2 values
    function minOf2(x , y)
    {
        return (x < y) ? x: y;
    }
     
    function minCashFlowRec(index,total_balance)
    {
        var mxCredit = getMax(total_balance), mxDebit = getMin(total_balance);
     
        if (total_balance[mxCredit] == 0 && total_balance[mxDebit] == 0)
            return;
     
        // Find the minimum of two amounts
        var min = minOf2(-total_balance[mxDebit], total_balance[mxCredit]);
        total_balance[mxCredit] -= min;
        total_balance[mxDebit] += min;
     
        // If minimum is the maximum amount to be
        console.log("Person " + mxDebit + " pays " + min
                                + " to " + "Person " + mxCredit);
        var tmp1={};
        tmp1[mxCredit] = min;
        var tmp2={};
        tmp2[mxDebit] = min;
        list_obj[index].balances[mxDebit].owes_to.push(tmp1);
        list_obj[index].balances[mxCredit].owed_by.push(tmp2);

        minCashFlowRec(index,total_balance);
    }


function fillTotalBalance(index,total_balance){
    for(var i in total_balance){
        var tmp = {};
        tmp.total_balance = total_balance[i];
        tmp.owes_to = [];
        tmp.owed_by = [];
        list_obj[index].balances[i] = tmp;
    }
    
}

function calculateExpense(index){
    addAllMembers(index);
    console.log(list_obj[index].list_members);
    var total_balance = calculateTotalBalance(index);
    console.log(total_balance);
    fillTotalBalance(index,total_balance);
    console.log(list_obj[index].balances);
    minCashFlowRec(index,total_balance);
    console.log(list_obj[index]);
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