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

    getName(){
        return this.name;
    }

    getCity(){
        return this.city;
    }

    getBirthday(){
        return this.birthday;
    }

    likeUser(likeUsername){
        this.likedUsers.push(likeUsername);
    }

    removeLike(likedUsername){
        var index = this.likedUsers.indexOf(likedUsername);
        likedUsers.splice(index,1)
    }
}

module.exports = User; 