
  // editByEmail(user: User) {
  //   this.index = this.users2.findIndex((eachUser) => eachUser.email === user.email)
  //   if (this.index !== -1) {
  //     this.users2.splice(this.index, 1, user);
  //   }
  //   else {
  //     console.log('You cannot edit email!!');
  //   }
  //   this.sendChanged.emit(this.users2)
  // }

  // deleteByEmail(email: string) {
  //   this.users2 = this.users2.filter((eachUser) => eachUser.email !== email)
  //   console.log(this.users2);
  //   this.sendChanged.emit(this.users2)
  // }