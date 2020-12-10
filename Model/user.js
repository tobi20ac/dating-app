//User class that represents a user of the program. Has a constructor and a couple of methods.

class User{

    //constructor
    constructor(userID, username, password, name, birthday, city){
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.name = name;
        this.birthday = birthday;
        this.city = city;
        this.likedUsers = [];
    }

    //Method to get name
    getName(){
        return this.name;
    }
    //Method to get city
    getCity(){
        return this.city;
    }
    //Method to get birthday
    getBirthday(){
        return this.birthday;
    }

    //Method to like a user and push to the array of liked users.
    likeUser(likeUsername){
        this.likedUsers.push(likeUsername);
    }
}

module.exports = User; 