import React from 'react'
import {ScrollView,View,Text,Image,AsyncStorage,StyleSheet} from 'react-native'
import * as geolib from 'geolib'

import getDistance from 'geolib/es/getDistance';
import CostomHeader from '../component/CostomHeader'



class Home extends React.Component{

static navigationOption={
title:"Home"
}
state={
locc:[],
isLoading:true,
dataSource:"jk",
loc:[],
Comname:[],
address:[],
comrate:[],
userLoc:"0,0",

dis:[],
nearLoc:[]
}
componentDidMount(){
return fetch("http://myshpestore.000webhostapp.com/api.json")
.then((response)=>response.json())
.then((responseJson)=>{
	
	
	
		let compName=[]
		let locations=[]
		let comRating=[]
		let add=[]
		
for(var i=0; i<responseJson.length ;  i++){
    compName.push(responseJson[i].company.name)
	locations.push(responseJson[i].company.location.latitude+","+responseJson[i].company.location.longitude+"\n")
	comRating.push(responseJson[i].company.company_rating.votes)
	add.push(responseJson[i].company.location.address+"\n")
     
}

this.setState({
isLoading:false,
dataSource:locations,

})
for(var j=0; j<locations.length ; j++){

this.setState({
loc:[...this.state.loc,locations[j]],

Comname:[...this.state.Comname,compName[j]],
address:[...this.state.address,add[j]],
comrate:[...this.state.comrate,comRating[j]]})
}
this.GetLocation()
})
}
GetLocation= async ()=>{
	
try{
	
const data =await AsyncStorage.getItem("Location");
//console.log(data+"jkk")
	this.setState({userLoc:data})
	this.Search()
}catch(err){
//console.log("error in store loc "+err)
}

}

Search=()=>{
	
	
     const user=this.state.userLoc
		 
    const [ulat,ulog]=user.split(',');
    const  userlat=ulat
    const  userlog=ulog
	
    //console.log(userlat  + "  search  "+userlog)
  
for(var i=0; i<this.state.loc.length; i++){
  
  const place= this.state.loc[i];

	 const [plat,plog]=place.split(',');
const  placelat=plat
const  placelog=plog

//  console.log(placelat  + "  place  "+placelog)
 
  //const { userlat, userlog } = this.state;

const dist = geolib.getDistance(
   { latitude:userlat, longitude:userlog },
   { latitude: placelat, longitude: placelog }
  
);
const res=dist/1000;


const a="";
const b= " ";

if(res<101){	
	
this.setState({
locc:[...this.state.locc,i]})
}
console.log(this.state.locc+" loc")
	
}
}


render(){
	
var card = [];
if(this.state.locc.length===0){
  card.push(
  <View>
  <Text style={style.linkstyle}>No Any Data</Text>
  </View>
  )
}else{
	for(let i = 0; i < this.state.locc.length; i++){
            const a =this.state.locc[i];
		card.push(
			<View key = {i}  >
			<ScrollView>
			<View style={{justifyContent:'center',alignItems:'center'}}>
			     <View  style={{borderRadius:10,width:300,
                                  height:220, backgroundColor:'skyblue', marginTop:15}}>
	                <View >
					<View style={{flexDirection:"row"}}>
                    <Image style={style.imgstyle} 
	                         source = {{uri:'https://upload.wikimedia.org/wikipedia/commons/3/30/Dunzo-logo.png'}}
   
                                />
						<View>
						 <Text  style={style.textstyle}> Name :{this.state.Comname[a]}</Text>
						 <Text  style={style.textstyle}> Rating :{this.state.comrate[a]}</Text>
						 <Text  style={style.textstyle}>Location {"\n"}{this.state.loc[a]}</Text>
						</View>
					</View>
						<View >
				     <Image  style={{width:300,height:100,borderRadius:15}}
	                  source={require('../img/1-Mg-banner.png')}
                                />
								</View>
								
		           
		           
		             </View> 
		          </View>
				  </View>
				  </ScrollView>
			</View>
		)
	}
	}
return(

<View>
	<View>
	
<CostomHeader title="DashBoard" isHome navigation={this.props.navigation} img={this.props.navigation.getParam('photo')} name={this.props.navigation.getParam('name')} email={this.props.navigation.getParam('email')}/>
	
	</View>
	{card}
  </View>

)
}
}export default Home
	
	const style=StyleSheet.create({
body:{width:350,
 height:200,

 },
 imgbanner:{width:50, height:10},
imgstyle:{borderRadius:15,width:100, height:100,margin:10,marginLeft:10},
textstyle:{textAlign:'center',fontSize:18,color:'black'},
linkstyle:{textAlign:'center',
fontSize:25,
color:'white', 
backgroundColor:"brown",
margin:20,marginTop:20},
		
})
