import { User } from './../services/models/user.model';

export function getUserFromJWT(): void {
  console.log(localStorage.getItem('authToken'));
}
