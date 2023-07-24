import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DecryptPipe } from "../pipes/encrypt-decrypt.pipe";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private decrypt: DecryptPipe) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var accessToken = JSON.parse(this.decrypt.transform(localStorage.getItem('acessToken')));
        var modifiedRequest;
        if (accessToken) {
            modifiedRequest = req.clone({ setHeaders: { "accessToken": accessToken, 'Content-type': 'application/json' } })
        } else {
            modifiedRequest = req.clone({ setHeaders: { 'Content-type': 'application/json' } })
        }
        return next.handle(modifiedRequest);
    }
}