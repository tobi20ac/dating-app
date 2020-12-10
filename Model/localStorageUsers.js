//This is the hardcoded users of my program.
const User = require("./user");

var user1 = new User(0, "tob123", "123456", "Tobias B", new Date("1999-12-02"), "KBH");
var user2 = new User(1, "mik123", "123456", "MIkkel C", new Date("1997-11-02"), "Valby");
var user3 = new User(2, "lars23", "123346", "Lars D", new Date("1990-01-02"), "KBH");
/* var user4 = new User(3, "camilla", "123456", "Camilla E", new Date("1992-01-02"), "KBH");
var user5 = new User(4, "Mie1", "123456", "Mie F", new Date("1994-01-02"), "KBH"); */

var hardCodedUsers = [user1, user2, user3/* , user4, user5 */];
//exports the users.
module.exports = hardCodedUsers;