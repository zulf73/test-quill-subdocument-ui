var raw_data = require('./IPIP120.json');

console.log( raw_data['value'][25]);

function get_reference( path, doc ) {
    var keys = path.split('.');
    var n = keys.length;
    if (n == 1 ){
	return doc[keys[0]];
    }
    return get_reference( keys.slice(1,n).join('.'), doc[keys[0]]);
}
function json_set( path, doc, val ){
    var keys = path.split('.');
    var n = keys.length;
    if (keys[0]==''){
	keys = keys.slice(1,n+1);
    }
    if (n == 1 ){
	doc[keys[0]] = val;
	return doc;
    }
    doc[keys[0]] = json_set( keys.slice(1,n).join('.'), doc[keys[0]], val);
    return doc;
}

var new_doc = json_set( '.value.5.answers.3.type', raw_data, '25');
//console.log( new_doc );
console.log( new_doc['value'][5] );
