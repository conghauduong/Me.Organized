import React, { Component } from "react";
import { ImageBackground, View, StatusBar,SafeAreaView,TextInput,TouchableOpacity,Alert } from "react-native";
import { Container, Button, H3, Text, Toast } from "native-base";

import styles from "./styles";
import { Ionicons } from '@expo/vector-icons';

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");

class Home extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      showPassWord: true,
      press: false
    }
  }
 
  // hide/display the visibility of the password
  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPassWord: false, press: true })
    }
    else {
      this.setState({ showPassWord: true, press: false })
    }
  }
 
  //check the valid username + password to acquire accessibility
  verifyLogin = () => {
    if(this.state.username == 'Admin' && this.state.password == '1'){
      Toast.show({
        text: 'Welcome back ' + this.state.username,
        buttonText: "Ok",
        type: "success",duration: 2000
      })
      this.props.navigation.navigate("TodoList")
    }
    else if(this.state.username == '' && this.state.password == ''){
      Toast.show({
                text: "Please enter correct username/password",
                buttonText: "Ok",
                type: "danger",
                

              })
    }
    else{
      Toast.show({
                text: "Wrong username/password!",
                buttonText: "Ok",
                type: "danger"
              })
    }
  }
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <SafeAreaView>
         <Ionicons name="ios-person" size={28}
           style={styles.inputIcon} color={'rgba(255, 255, 255, 0.7)'} />
         <TextInput
           value={this.state.username}
           onChangeText={(s) => this.setState({ username: s })}
           style={styles.input}
           placeholder={'Username'}
           placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
           underlineColorAndroid='transparent' />
       </SafeAreaView>
            <View style={{ marginTop: 8 }} />
            <SafeAreaView>
         <Ionicons name="ios-lock" size={28} color={'rgba(255, 255, 255, 0.7)'}
           style={styles.inputIcon} />
         <TextInput
         value={this.state.password}
         onChangeText={(s) => this.setState({ password: s })}
           style={styles.input}
           //this will evaluate the state "showPassWord"
           secureTextEntry={this.state.showPassWord}
           placeholder={'Password'}
           placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
           underlineColorAndroid='transparent' />

         <TouchableOpacity style={styles.btnShowPass}
           //when press on the eye icon, the showPass function will be executed
           onPress={this.showPass.bind(this)}>
           <Ionicons name={this.state.press == false ? "ios-eye" : 'ios-eye-off'} size={26} color={'rgba(255, 255, 255, 0.7)'} />

         </TouchableOpacity>
       </SafeAreaView>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 50}}>
            <Button 
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={this.verifyLogin.bind(this)}
            >
              <Text>Login</Text>
            </Button>
            <Button 
              style={{ backgroundColor: "#6FAF98", alignSelf: "center",marginTop: 20 }}
              // onPress={() => this.props.navigation.navigate("TodoList")}
              onPress={() => Toast.show({
                text: "Under maintainance",
                buttonText: "Ok",
                type: "warning"
              })}
            >
            
              <Text>Sign up</Text>
            </Button>
            <Button 
              style={{ backgroundColor: "#6FAF98", alignSelf: "center",marginTop: 20 }}
              onPress={() => this.props.navigation.navigate("TodoList")}
              // onPress={() => Alert.alert("Under development")}
            >
              <Text>Test Login</Text>
            </Button>

          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
