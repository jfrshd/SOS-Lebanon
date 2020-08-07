import { Callback } from '../../service/cognito.service';
import { JwtComponent } from './jwt.component';

export class AccessTokenCallback implements Callback {
    constructor(public jwt: JwtComponent) {
    }

    callback() {
    }

    callbackWithParam(result) {
        this.jwt.stuff.accessToken = result;
    }
}
