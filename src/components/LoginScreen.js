import React, { Component } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import Form from "./Form";
import Wallpaper from "./Wallpaper";
import ButtonSubmit from "./ButtonSubmit";
import SignupSection from "./SignupSection";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dimensions from 'Dimensions';
 
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { Button, View,  StyleSheet,
} from 'react-native';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const {navigate} = this.props.navigation;  
    return (
      <Wallpaper>
        <Logo />
        <Form />
        <View style={styles.loginButtonSection}>
        <KeyboardAwareScrollView>
          <SignupSection />
        </KeyboardAwareScrollView>
      
 
 
     <Button onPress={() =>navigate('Recording', {name: 'Jane'})}
             style={styles.loginButton}
             title="Login"
     />

</View>
      </Wallpaper>
    );
  }


  
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00cbff',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#060151',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#060151',
  },
 
  loginButtonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
 },

 

 loginButton: {
   backgroundColor: 'blue',
   color: 'white'
 }
});
 








