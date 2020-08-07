import { Callback } from '../../service/cognito.service';
import { JwtComponent } from './jwt.component';

export class IdTokenCallback implements Callback {
    constructor(public jwt: JwtComponent) {
    }

    callback() {
    }

    callbackWithParam(result) {
        this.jwt.stuff.idToken = result;
    }
}
