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
        this.likedUsers.push(userID);
    }

    removeLike(userID){
        var index = this.likedUsers.indexOf(userID);
        likedUsers.splice(index,1)
    }

    updateUsername(newUsername){
        this.username = newUsername;
    }

    updatePassword(newPassword){
        this.password = newPassword;
    }

    updateName(newName){
        this.name = newName;
    }

    updateBirthday(newBirthday){
        this.birthday = newBirthday;
    }

    updateCity(newCity){
        this.city = newCity;
    }
}

module.exports = User; 