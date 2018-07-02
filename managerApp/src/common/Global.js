
import { SignInScreen } from "./ScreenName";
import { Notifiy } from "./Notify";

export var Global = {
   
    HOST: {
        administrator: 'http://slauth-lb.smartlog.info/api/',
        sem: 'http://kta-lb.smartlog.info/api/',
        wms: 'http://swm-lb.smartlog.info/api/',
    },
    userInfo: null,
    appcode: {
        wms: 'wms',
    },
    handerError: (err,navigation)=>{
        if(err instanceof Object){
            if (err.statusCode === 404 && err.message === 'TOKEN_EXPIRED') {
                Notifiy.warningTop('TOKEN EXPIRED');
                navigation.navigate(SignInScreen)
            }
        }
    },
}
