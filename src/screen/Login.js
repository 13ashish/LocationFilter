import React from 'react'
import {View,Text,StyleSheet} from'react-native'
import Permissions from '../component/Permissions'
import CostomHeader from '../component/CostomHeader'

import { GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
class Login extends React.Component{
	
static navigationOption={
title:"LogIn",
headerStyle:{
backgroundColor:'orange',
},
headerTintColor:'#fff',
headerTitleStyle:{
fontWeight:"bold"
},
}
componentDidMount(){
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '616283721560-ilb7f080iqrkkjmh7qj55vlgfaq42ujv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //hostedDomain: '', // specifies a hosted domain restriction
  //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  //accountName: '', // [Android] specifies an account name on the device that should be used
  //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});
}
SignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
		this.props.navigation.navigate("Home",{name:userInfo.user.name,
		                                        email:userInfo.user.email,
												photo:userInfo.user.photo})
	
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
	console.log(error)
  }
};
render(){
return(
	
<View>
<CostomHeader title="Log In"/>
  
  <Permissions/>
<View  style={{flex:1,justifyContent:'center',flexDirection:'row',marginTop:30,marginRight:8}}  >

 <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this.SignIn}
     />
</View>
	 </View>
)
}
}export default Login
	
	const style=StyleSheet.create({
linkstyle:{textAlign:'center',
fontSize:25,
color:'white', 
backgroundColor:"brown",
margin:20,marginTop:20},
	
	})