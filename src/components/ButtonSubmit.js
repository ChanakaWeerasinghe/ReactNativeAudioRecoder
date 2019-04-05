import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,Button,
  Image,
  Alert,
  View,
} from 'react-native'; 
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import spinner from '../images/loading.gif';
import LoginScreen from './LoginScreen';
import SecondScreen from './SecondScreen';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { createStackNavigator } from 'react-navigation'; 

  const AppNavigator = createStackNavigator({
    Home: { screen: SecondScreen },
   
  });


export default class ButtonSubmit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => { 
      this.props.navigation.navigate(SecondScreen)
 
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    <Router>
     	      <Scene key="root">
    	        <Scene key="loginScreen"
    	          component={LoginScreen}
     	        	animation='fade'
     	          hideNavBar={true}
     	          initial={true}
     	        />
     	        <Scene key="secondScreen"
     	          component={SecondScreen}
     	          animation='fade'
     	          hideNavBar={true}
     	        />
     	      </Scene>
     	    </Router>

    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
       
       <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00cbff',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  }, 
});
