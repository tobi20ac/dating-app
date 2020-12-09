const expect = require("chai").expect;

var checkInput = require("./server");

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

        var user = "to"
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
});
