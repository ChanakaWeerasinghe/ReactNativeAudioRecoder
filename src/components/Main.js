import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import SecondScreen from './SecondScreen';
import Recording from './../../App';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Splash from '../../src/splash'
const AppNavigator = createStackNavigator({
	//Screens   
	Splash: {
			screen: Splash
	},
	Login: {
			screen: LoginScreen
	},
	SecondScreen: {
		screen: SecondScreen
},
Recording: {
	screen: Recording
},


}, {
	//settings
	initialRouteName: 'Splash'
})

const Appdata = createAppContainer(AppNavigator);

export default Appdata;
