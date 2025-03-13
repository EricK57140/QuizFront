import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenidentificationService } from './token-identification.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateGuard  {
  constructor(
    private tokenIdentification: TokenidentificationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.tokenIdentification.user.value != null &&
      this.tokenIdentification.user.value.rights.includes('CANDIDATE')
    ) {
      return true;
    }

    return this.router.parseUrl('/');
  }
}
