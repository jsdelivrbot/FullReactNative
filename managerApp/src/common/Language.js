import LocalizedStrings from 'react-native-localization';

export let STRINGS = new LocalizedStrings({
    en: {
        SIGNIN: {
           signIn: 'SIGN IN',
           fogotPassword: 'Forgot password ?',
           placeholderPassword: 'Enter your password',
           placeholderUsername: 'Enter your username',
           messageLogin: 'Wrong username or password',           
        },
        SIDEMENU: {
            dashboard: 'Dashboard',
            security: 'SECURITY',
            //Master data
            masterData: 'Master data',
            systemMail: 'System Mail',
            user: 'User',
            warehouse: 'List Warehouse'
        }
    },
    vn: {
        SIGNIN: {
            signIn: 'Đăng nhập',
            fogotPassword: 'Quên mật khẩu ?',
            placeholderPassword: 'Nhập mật khẩu',
            placeholderUsername: 'Nhập tên tài khoản',   
            messageLogin : 'Sai thông tin đăng nhập',          
         },
         SIDEMENU: {
            dashboard: 'Thống kê',
            security: 'Bảo mật',
            //master data
            masterData: 'Quản lý dữ liệu',
            systemMail: 'Mail hệ thống',
            user: 'Người dùng',
            warehouse: 'Danh sách kho',
        }
    }
});