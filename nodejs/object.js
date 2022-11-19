var roles = {
    'programmer':'xxx',
    'designer':'yyy',
    'manager':'zzz'
}
console.log(roles.designer);
console.log(roles['designer']);

for(var name in roles){
    console.log(name+' is '+roles[name]);
}