class User{

    constructor(userID, username, password, name, birthday, city){
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.name = name;
        this.birthday = birthday;
        this.city = city;
        this.likedUsers = [];
    }

    likeUser(userID){
        likedUsers.push(userID);
    }

    removeLike(userID){
        var index = this.likedUsers.indexOf(userID);
        likedUsers.splice(index,1)
    }
}

module.exports = User; 