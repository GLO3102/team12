var DISQUS_SECRET = "gPK36b0RbbJ7CtuXlJYetgWygxCuxZVO80h6wxsHkQBS4NKWTHI7huzDB8nb3ICq";
var DISQUS_PUBLIC = "mAnCpzKShzKTby68dmppTsD6j1McSsbsb9w5VYPG47Z43uiBfIca5ifS3GAtIyeG";

exports.disqusSignon = function disqusSignon(user) {
    var disqusData = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    var disqusStr = JSON.stringify(disqusData);
    var timestamp = Math.round(+new Date() / 1000);

    /*
     * Note that `Buffer` is part of node.js
     * For pure Javascript or client-side methods of
     * converting to base64, refer to this link:
     * http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
     */
    var message = new Buffer(disqusStr).toString('base64');

    /* 
     * CryptoJS is required for hashing (included in dir)
     * https://code.google.com/p/crypto-js/
     */
    var CryptoJS = require("crypto-js");
    var result = CryptoJS.HmacSHA1(message + " " + timestamp, DISQUS_SECRET);
    var hexsig = CryptoJS.enc.Hex.stringify(result);

    return {
        pubKey: DISQUS_PUBLIC,
        auth: message + " " + hexsig + " " + timestamp
    };
};