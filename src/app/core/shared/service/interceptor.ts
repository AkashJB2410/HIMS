import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var auth = "get auth token from service";
        const modifiedRequest = req.clone({ setHeaders: { "authToken": auth } })
        return next.handle(modifiedRequest);
    }
}