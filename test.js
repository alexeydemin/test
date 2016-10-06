'use strict';

class Login {
  constructor(users) {
    this.sessions = [];
    this.users = users;
  }

  logout(username) {
    this.sessions = this.sessions.filter(x => x !== username);
  }

  userExists(username) {
    let user = this.getUser(username);
    return typeof user !== 'undefined';
  }

  registerUser(user) {
    this.users.push(user);
  }

  removeUser(username) {
    this.users = this.users.filter(x => x.username !== username);
  }

  checkPassword(username, password) {
    let user = this.getUser(username);
    return user.pass === password;
  }

  getUser(username) {
    return this.users.find(x => x.username === username);
  }

  updatePassword(username, oldPassword, newPassword) {
    if (!this.userExists(username))
      return false;
    if (!this.checkPassword(username, oldPassword))
      return false;
    let user = this.getUser(username);
    user.pass = newPassword;
    this.removeUser(username);
    this.registerUser(user);
  }

  login(username, password) {
    let user = this.getUser(username);
    if (user.pass === password) {
      this.sessions.push(username);
    }
  }
}


let registeredUsers = [
  {username: 'user1', pass: 'pass1'},
  {username: 'user2', pass: 'pass2'},
  {username: 'user3', pass: 'pass3'}
];

let login = new Login(registeredUsers);
console.log( login.users );

login.registerUser({username:'user4', pass:'pass4'});
console.log( login.users );

login.removeUser('user2');
console.log( login.users );

console.log( login.checkPassword('user3','pass3') );
console.log( login.checkPassword('user3','pass3zzz') );
console.log( login.sessions );
login.login('user1', 'pass1');
login.login('user3', 'pass3');
login.login('user4', 'pass4zz');
console.log( login.sessions );
login.logout('user1');
console.log( login.sessions );

login.updatePassword('user3', 'pass3', 'pass333');
console.log( login.sessions );
console.log( login.users );
login.updatePassword('user0', 'pass', 'pass');
console.log( login.users );
login.updatePassword('user1', 'pass1zz', 'pass111');
console.log( login.users );

