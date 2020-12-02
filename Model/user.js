class User{

    constructor(username, password, name, birthday, city){
        userID;
        this.username = username;
        this.password = password;
        this.name = name;
        this.birthday = birthday;
        this.city = city;
        likedUsers = [];
    }

    likeUser(userID){
        likedUsers.push(userID);
    }

}