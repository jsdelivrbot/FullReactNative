import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import {
    Color
} from './Color';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.smartlog,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputStyle: {
        width: deviceWidth * 0.8,
        height: 45,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 10,
    },
    bigButton: {
        marginTop: 10,
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        width: deviceWidth * 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '300'
    },
    itemCenter: {
        alignItems: 'center',
    },
    headerView: {
        // height: 40,
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: Color.smartlog
    },
    iconLeft: {
        fontSize: 30,
        marginLeft: -10,
        color: Color.white
    },
    iconRight: {
        fontSize: 25,
        marginRight: -5,
        color: Color.white
    }
});
export const sideMenuStyles = StyleSheet.create({
      text: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 14,
        marginLeft: 10,
        color: Color.smartlog
      },
      badgeText: {
        fontSize: Platform.OS === "ios" ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: Platform.OS === "android" ? -3 : undefined
      },
      logo: {
          width: deviceWidth * 0.4,
          height: deviceWidth * 0.4
      },
      content : { 
          flex: 1, 
          backgroundColor: Color.white, 
          top: -1,
      }
})