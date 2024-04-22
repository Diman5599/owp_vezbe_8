const getRandomString = (leng) => {
    const charactes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let output = '';
    for (i = 0; i < leng; i++){
        output += charactes.charAt(Math.floor(Math.random()*charactes.length));
    }
    return output;
}

module.exports = {
    getRandString: getRandomString
}