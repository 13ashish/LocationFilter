import React from 'react'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import {createAppContainer,navigation} from 'react-navigation-stack'


function  CostomHeader ({title,isHome,onpress, isNoty,img,name,email,navigation} ){

return(
<View>
 <View style={{flexDirection:'row',height :50,backgroundColor:'orange'}}>
{
isHome ?
	
	<TouchableOpacity onPress={()=>navigation.goBack()}>
         <Image style={{width:30, height:30, marginLeft:7,flex:1,justifyContent:'center'}} 
           source={require("../img/img/back.png")} 
           resizeMode="contain"
           />
		    </TouchableOpacity>
:null
}    
	<View style={{flex:5,justifyContent:'center'}} >
        <Text style={{textweight:'bold',textAlign:'center',fontSize:20,fontStyle:'bold',color:'white'}} > {title}</Text>
     </View>
	 <TouchableOpacity >
     
	 <View style={{flex:1,justifyContent:'center',flexDirection:'row',marginTop:10,marginRight:8}} >
             <View>	    
		<Text style={{textAlign:'center',fontSize:16,color:'black'}} > {name}</Text>
		<Text style={{textAlign:'center',fontSize:14,color:'black'}} > {email}</Text>
     	    </View>
<Image style={{width:30, borderRadius:15,height:30, marginLeft:7}} 
           source={{uri:img}}/>
			   
          </View>
     </TouchableOpacity>
	
     </View>
	 </View>
)
 }
export default CostomHeader