import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs';
import {AppComponent} from '../app.component';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class GetSpeakers {
    constructor (public http?: Http) { }

    request () {
        let params: URLSearchParams = new URLSearchParams();
        params.set('event', 'RN_BANK');

        var options = new RequestOptions({
            search: params
        });

        return this.http.get(AppComponent.API_URL + '/api/public/v1/chats/speakers', options)
            .map((res: Response) => {
                return res.json();
            }, (err) => {

            })
    }
}

@Injectable()
export class InitUser {
    constructor (public http?: Http) { }

    request (body) {

        var options = new RequestOptions({ });

        return this.http.post(AppComponent.API_URL + '/api/public/v1/chats/user', body, options)
            .map((res: Response) => {
                return res.json();
            }, (err) => {

            })
    }
}

@Injectable()
export class InitChat {
    constructor (public http?: Http) { }

    request (body) {

        var options = new RequestOptions({ });

        return this.http.post(AppComponent.API_URL + '/api/public/v1/chats/chat', body, options)
            .map((res: Response) => {
                return res.json();
            }, (err) => {

            })
    }
}

@Injectable()
export class PutMessage {
    constructor (public http?: Http) { }

    request (body) {

        var options = new RequestOptions({ });

        return this.http.post(AppComponent.API_URL + '/api/public/v1/chats/message', body, options)
            .map((res: Response) => {

            }, (err) => {

            })
    }
}

@Injectable()
export class GetMessages {
    constructor (public http?: Http) { }

    request (room) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('room', room);

        var options = new RequestOptions({
            search: params
        });

        return this.http.get(AppComponent.API_URL + '/api/public/v1/chats/messages', options)
            .map((res: Response) => {
                return res.json();
            }, (err) => {

            })
    }
}

@Injectable()
export class RegistrateUser {
    constructor (public http?: Http) { }

    request (body) {
        var options = new RequestOptions({ });
        return this.http.post(AppComponent.API_URL + '/api/public/v1/conference/registrate', body, options)
            .map((res: Response) => {
                return res.json();
            }, (err) => { })
    }
}
