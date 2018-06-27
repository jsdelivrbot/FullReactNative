import { Toast } from "native-base";

export class Notifiy {
    static danger(messsage) {
        Toast.show({
            text: messsage,
            type: 'danger',
            buttonText: 'Danger',
            position: 'bottom',
            duration: 1000,
        })
    }
    static success(messsage) {
        Toast.show({
            text: messsage,
            type: 'success',
            buttonText: 'Success',
            position: 'bottom',
            duration: 10000,
        })
    }
    static warning(messsage) {
        Toast.show({
            text: messsage,
            type: 'warning',
            buttonText: 'Warning',
            position: 'bottom',
            duration: 1000,
        })
    }
    static warningTop(messsage) {
        Toast.show({
            text: messsage,
            type: 'warning',
            buttonText: 'Warning',
            position: 'top',
            duration: 1000,
        })
    }
}