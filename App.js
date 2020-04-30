/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Permissions from './src/component/Permissions'
import {View,Text,AsyncStorage} from 'react-native'
import Home from './src/screen/Home'
import Login from'./src/screen/Login'


const App=createStackNavigator({
Login:Login,
Home:Home
},{headerMode:'none'}
)
export default createAppContainer(App)