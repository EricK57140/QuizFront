import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenidentificationService {

  constructor() { }

  public user: BehaviorSubject<any> = new BehaviorSubject(null);

  public refresh() {

    if (localStorage.getItem("token") != null) {

      const token: any = localStorage.getItem("token");

      try {
        this.user.next(JSON.parse(atob(token.split(".")[1])))
      } catch {
        this.user.next(null)
      }
    } else {
      this.user.next(null)
    }
  }

  deconnexion() {
    localStorage.removeItem("token")
    this.user.next(null);



  }
}
