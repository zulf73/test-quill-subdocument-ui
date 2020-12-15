export function json_set( path, doc, val ){
    var keys = path.split(".");
    var n = keys.length;
    if (n == 1 ){
        doc[keys[0]] = val;
    }
    return json_set( keys.slice(1,n).join("."), doc[keys[0]], val);
}
export function json_get( path, doc) {
    var keys = path.split(".");
    var n = keys.length;
    if (n == 1 ){
        return(doc[keys[0]]);
    }
    return json_get( keys.slice(1,n).join("."), doc[keys[0]]); 
}
