//objeto de modelo de usuario firebase "mapeo"
export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;

  constructor() {
    this.image = "";
    this.name = "";
    this.provider = "";
  }
}