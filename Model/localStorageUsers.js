const User = require("./user");

var user1 = new User("tob123", "passDong", "Tobias B", new Date("1999-12-02"), "KBH");
var user2 = new User("mik123", "passSlong", "MIkkel C", new Date("1997-11-02"), "Valby");
var user3 = new User("lars23", "passLong", "Lars D", new Date("1990-01-02"), "KBH");

var hardCodedUsers = [user1, user2, user3];

//window.localStorage.setItem("users", hardCodedUsers);

module.exports.hardCodedUsers = hardCodedUsers;