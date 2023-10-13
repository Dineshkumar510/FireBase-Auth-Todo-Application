import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export class AuthGuard implements CanActivate{

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !user ? false : true;
        console.log("Auth Guard Condition",isAuth);
        if(isAuth){
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    )
  }
}
