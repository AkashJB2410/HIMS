import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError, switchMap } from "rxjs";
import { DecryptPipe, EncryptPipe } from "../pipes/encrypt-decrypt.pipe";
import { LOCALHOSTURL } from "../objects/constants";
import { Router } from "@angular/router";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private decrypt: DecryptPipe, private encrypt: EncryptPipe, private http: HttpClient, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var accessToken = JSON.parse(this.decrypt.transform(localStorage.getItem('accessToken')));
        var modifiedRequest;
        if (accessToken) {
            modifiedRequest = req.clone({ setHeaders: { "Authorization": "Bearer "+ accessToken, 'Content-type': 'application/json' } })
        } else {
            modifiedRequest = req.clone({ setHeaders: { 'Content-type': 'application/json' } })
        }

        return next.handle(modifiedRequest).pipe(catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                let body = {
                    "refreshToken": JSON.parse(this.decrypt.transform(localStorage.getItem('refreshToken')))
                }
                return this.http.post(LOCALHOSTURL + "authentication/refreshToken", body).pipe(
                    switchMap((res: any) => {
                        if (res.result != null) {
                            localStorage.setItem('accessToken', this.encrypt.transform(JSON.stringify(res.result.acessToken)));
                            localStorage.setItem('refreshToken', this.encrypt.transform(JSON.stringify(res.result.refreshToken)));
                            return next.handle(req.clone({ setHeaders: { "Authorization": "Bearer " + res.result.acessToken, 'Content-type': 'application/json' } }))
                        } else {
                            this.router.navigateByUrl("");
                            return next.handle(req)
                        }
                    })
                )
            }
            return throwError(() => err)
        }));
    }
}