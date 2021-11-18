import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentSessionGuard implements CanActivate {

  constructor(
              private authService: AuthService,
              private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    return new Promise( async (resolve, reject) => {
      const sessionIsActive: boolean = await this.authService.currentSession();

      if (!sessionIsActive) {
        this.router.navigate(['login']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  private async currentSession(): Promise<boolean> {
    const isActive: boolean = await this.authService.currentSession();

    return isActive;
  }

  
  
}
