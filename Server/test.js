//require chai
const expect = require("chai").expect;

//require the checkInput function
var checkInput = require("./server");

//Unit test of the checkInput function
describe("checkInput()", function(){
    it("should return an empty array", function(){
        //Arrange

        var user = "tobias"
        var pass = "123456"
        var name = "tobiasb"
        var birth = "1999-12-12"
        var city = "holbæk";

        var arr1 = []
        var result1 = arr1.length;

        //Act 
        var arr = checkInput(user, pass, name, birth, city);
        result2 = arr.length

        //Assert
        expect(result2).to.be.equal(result1).length;
    
    });

    it("should return an array with one error", function(){
        //Arrange

        var user = ""
        var pass = "123456"
        var name = "tobiasb"
        var birth = "1999-12-12"
        var city = "holbæk";

        var arr1 = ["Error in username (username must be at least 5 characters"]
        var result1 = arr1[0];

        //Act 
        var arr2 = checkInput(user, pass, name, birth, city);
        var result2 = arr2[0];

        //Assert
        expect(result2).to.be.equal(result1);
    
    });

    it("should return an array with two errors", function(){
        //Arrange

        var user = "to"
        var pass = "123"
        var name = "tobiasb"
        var birth = "1999-12-12"
        var city = "holbæk";

        var arr1 = ["Error in username (username must be at least 5 characters","Error in passwrod (password must be at least 5 characters"]
        var result1 = arr1[0] + arr1[1];

        //Act 
        var arr2 = checkInput(user, pass, name, birth, city);
        var result2 = arr2[0] + arr2[1];

        //Assert
        expect(result2).to.be.equal(result1);
    });

    it("should return an array with three errors", function(){
        //Arrange

        var user = "to"
        var pass = "123"
        var name = "b"
        var birth = "1999-12-12"
        var city = "holbæk";

        var arr1 = ["Error in username (username must be at least 5 characters","Error in passwrod (password must be at least 5 characters", "Error in name (name must be at least 2 characters"]
        var result1 = arr1[0] + arr1[1] + arr1[2];

        //Act 
        var arr2 = checkInput(user, pass, name, birth, city);
        var result2 = arr2[0] + arr2[1] + arr2[2];

        //Assert
        expect(result2).to.be.equal(result1);
    });

    it("should return an array with four errors", function(){
        //Arrange

        var user = "to"
        var pass = "123"
        var name = "b"
        var birth = "1850-12-12"
        var city = "holbæk";

        var arr1 = ["Error in username (username must be at least 5 characters","Error in passwrod (password must be at least 5 characters", "Error in name (name must be at least 2 characters", "Invalid date"]
        var result1 = arr1[0] + arr1[1] + arr1[2] + arr1[3];

        //Act 
        var arr2 = checkInput(user, pass, name, birth, city);
        var result2 = arr2[0] + arr2[1] + arr2[2] + arr2[3];

        //Assert
        expect(result2).to.be.equal(result1);
    });

    it("should return an array with five errors", function(){
        //Arrange

        var user = "to"
        var pass = "123"
        var name = "b"
        var birth = "1850-12-12"
        var city = "h";

        var arr1 = ["Error in username (username must be at least 5 characters","Error in passwrod (password must be at least 5 characters", "Error in name (name must be at least 2 characters", "Invalid date", "City must be at least 2 characters"]
        var result1 = arr1[0] + arr1[1] + arr1[2] + arr1[3] + arr1[4];

        //Act 
        var arr2 = checkInput(user, pass, name, birth, city);
        var result2 = arr2[0] + arr2[1] + arr2[2] + arr2[3] + arr2[4];

        //Assert
        expect(result2).to.be.equal(result1);
    });
});
