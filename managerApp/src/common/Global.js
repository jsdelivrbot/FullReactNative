
import { SignInScreen } from "./ScreenName";
import { Notifiy } from "./Notify";

export var Global = {
    app: null,
    userInfo: null,
    user: null,
    handerError: (err,navigation)=>{
        if(err instanceof Object){
            if (err.statusCode === 404 && err.message === 'TOKEN_EXPIRED') {
                Notifiy.warningTop('TOKEN EXPIRED');
                navigation.navigate(SignInScreen)
            }
        }
    },
}
