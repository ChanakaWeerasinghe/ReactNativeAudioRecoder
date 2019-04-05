// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import {
//   StyleSheet,
//   View,
//   Image,
//   TouchableOpacity,
//   Animated,
//   Easing,FlatList, ActivityIndicator, Text,
// } from 'react-native';
// import {Actions, ActionConst} from 'react-native-router-flux';
// import Button from '@material-ui/core/Button';
// import arrowImg from '../images/left-arrow.png';

// const SIZE = 40;

// export default class SecondScreen extends Component {
//   constructor(props) {
    
//     super(props);
//     this.state ={ isLoading: true}
//     this._onPress = this._onPress.bind(this);
//     this.growAnimated = new Animated.Value(0);
  
//   }

//   _onPress() {
//     if (this.state.isLoading) return;

//     this.setState({isLoading: true});

//     Animated.timing(this.growAnimated, {
//       toValue: 1,
//       duration: 300,
//       easing: Easing.linear,
//     }).start();

//     setTimeout(() => {
//       Actions.pop();
//     }, 500);
//   }


//   componentDidMount(){
//    isLoading=false;
//     // return fetch('https://facebook.github.io/react-native/movies.json')
//     //   .then((response) => response.json())
//     //   .then((responseJson) => {

//     //     this.setState({
//     //       isLoading: false,
//     //       dataSource: responseJson.movies,
//     //     }, function(){

//     //     });

//     //   })
//     //   .catch((error) =>{
//     //     isLoading: false;
//     //     console.error(error);
//     //   });
//   }



//   render() {
//     // if(this.state.isLoading){
//     //   return(
//     //     <View style={{flex: 1, padding: 20}}>
//     //       <ActivityIndicator/>
//     //     </View>
//     //   )
//     // }


//     const changeScale = this.growAnimated.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, SIZE],
//     });

//     return (
//       <View style={styles.container}>
       
//        {/* <Button
//   style={{fontSize: 20, color: 'green'}}
//   styleDisabled={{color: 'red'}}
//   onPress={() => this._handlePress()}
//   title="Press Me"
// >
//   Press Me
// </Button> */}


//         <TouchableOpacity
//           onPress={this._onPress}
//           style={styles.button}
//           activeOpacity={1}>
//           <Image style={styles.image} source={arrowImg} />
//         </TouchableOpacity>
//         <Animated.View
//           style={[styles.circle, {transform: [{scale: changeScale}]}]}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 20,
//     alignItems: 'flex-end',
//     justifyContent: 'flex-end',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: SIZE,
//     height: SIZE,
//     borderRadius: 100,
//     zIndex: 99,
//     backgroundColor: '#F035E0',
//   },
//   circle: {
//     height: SIZE,
//     width: SIZE,
//     marginTop: -SIZE,
//     borderRadius: 100,
//     backgroundColor: '#F035E0',
//   },
//   image: {
//     width: 24,
//     height: 24,
//   },
// });
import React, { Component } from "react";
import { StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { Buffer } from "buffer";
import Permissions from "react-native-permissions";
import Sound from "react-native-sound";
import AudioRecord from "react-native-audio-record";

export default class App extends Component {
  sound = null;
  state = {
    audioFile: "",
    recording: false,
    loaded: false,
    paused: true
  };

  async componentDidMount() {
    await this.checkPermission();

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "test.wav"
    };

    AudioRecord.init(options);

    AudioRecord.on("data", data => {
      const chunk = Buffer.from(data, "base64");
      console.log("chunk size", chunk.byteLength);
      // do something with audio chunk
    });
  }

  checkPermission = async () => {
    const p = await Permissions.check("microphone");
    console.log("permission check", p);
    if (p === "authorized") return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request("microphone");
    console.log("permission request", p);
  };

  start = () => {
    console.log("start record");
    this.setState({ audioFile: "", recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log("stop record");
    let audioFile = await AudioRecord.stop();
    console.log("audioFile", audioFile);
    this.setState({ audioFile, recording: false });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject("file path is empty");
      }

      this.sound = new Sound(this.state.audioFile, "", error => {
        if (error) {
          console.log("failed to load the file", error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory("Playback");

    this.sound.play(success => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button
            style={styles.SubmitButtonStyle}
            onPress={this.start}
            title="Record"
            disabled={recording}
          />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}

         
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },

  MainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },

  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center"
  }
});
