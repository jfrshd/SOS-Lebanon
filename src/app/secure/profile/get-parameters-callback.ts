import { Callback, CognitoUtil } from '../../service/cognito.service';
import { MyProfileComponent } from './myprofile.component';
import { Parameters } from './parameters';

export class GetParametersCallback implements Callback {

    constructor(public me: MyProfileComponent, public cognitoUtil: CognitoUtil) {
    }

    callback() {
    }

    callbackWithParam(result: any) {

        for (let i = 0; i < result.length; i++) {
            let parameter = new Parameters();
            parameter.name = result[i].getName();
            parameter.value = result[i].getValue();
            this.me.parameters.push(parameter);
        }
        let param = new Parameters();
        param.name = 'cognito ID';
        param.value = this.cognitoUtil.getCognitoIdentity();
        this.me.parameters.push(param);
    }
}
