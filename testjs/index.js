
let list = [
{storerkey: "Owner1", sku: "359A05", lot: "L000000002", lpnid: "180000076600001", adddate: "2018-05-30", inbount: 10},

{storerkey: "Owner1", sku: "359A05", lot: "L000000002", lpnid: "180000076600002", adddate: "2018-05-30", inbount: 10},

{storerkey: "Owner1", sku: "439405", lot: "L000000027", lpnid: "180000077000001", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "439405", lot: "L000000027", lpnid: "180000077000002", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "439405", lot: "L000000027", lpnid: "180000077000003", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "439405", lot: "L000000027", lpnid: "180000077000004", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "439405", lot: "L000000027", lpnid: "180000077000005", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100001", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100002", adddate: "2018-05-31",inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100003", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100004", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100005", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100006", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100007", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100008", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100009", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100010", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100002", adddate: "2018-05-31", outbount: 5},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100003", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100005", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100006", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100008", adddate: "2018-05-31", inbount: 10},

{storerkey: "Owner1", sku: "TEST123", lot: "L000000094", lpnid: "180000077100009", adddate: "2018-05-31", outbount: 5},

]

function checkData(item){
    if(item.inbount){
        return item.inbount
    }
    return -item.outbount;
}

let myMap = new Map();

for (const item of list) {
    let key = item.storerkey+item.sku+item.lot+item.lpnid;
    let num = checkData(item);
    if( !myMap.has(key) ) {
        myMap.set(key,num);
    } else {
        let total = num + myMap.get(key);
        //myMap.delete(key);
        myMap.set(key,total);
    }
}
console.log(myMap);
console.log(myMap.size);