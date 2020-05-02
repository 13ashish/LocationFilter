import React from 'react'
import {PermissionsAndroid,AsyncStorage}from 'react-native'
import Geolocation from 'react-native-geolocation-service'


class Permissions extends React.Component{
state={
permit:'false',
locationCo:'nul'
}
componentDidMount(){this.AskForPermission()}

AskForPermission=async()=>{
	console.log("prt")
 try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Allow Permission to Location",
        message:
          "Allow the Location Permission ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the Location");
	  this.GetLocation()
		  
  } else {
      console.log("Location permission denied");
	  
    }
  }catch(err){console.warn(err)}
}
GetLocation=async()=>{
Geolocation.getCurrentPosition((position)=>{
//console.log(position),
this.setState({locationCo:position.coords.latitude+","+position.coords.longitude})
,console.log(this.state.locationCo);
this.StoreLocation()
})
}

 StoreLocation= async ()=>{
	
try{
const data = await AsyncStorage.setItem("Location",this.state.locationCo);
console.log("Store Location SuccessFull")
	
}catch(err){
console.log("error in store loc "+err)
}

}

render(){
return(
null
//<Home userlocation={this.state.locationCo}/ >
)
}
}export default Permissions
