export class User {
  firstName: string;
  lastName: string;
  photoUrl: string;
  id?: string;
  email?: string;
  status?: string;
  designation?: string;

  constructor({firstName, lastName, photoUrl}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.photoUrl = photoUrl;
  }
}
