import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Login from "./screens/login/";
import AboutUs from "./screens/aboutus/";
import TodoList from "./screens/todolist/";
import NHProfile from "./screens/profilepage/";
import SideBar from "./screens/sidebar";


// const Drawer = DrawerNavigator(
//   {
//     Login: {
//       screen: Login,
      // navigationOptions: ({navigation}) => ({
      //   tabBarVisible : false
      // })
//     },
//     TodoList: { screen: TodoList},
//     AboutUs: { screen: AboutUs },
//     NHProfile: { screen: NHProfile }
//   },
//   {
//     initialRouteName: "Login",
//     contentOptions: {
//       activeTintColor: "#e91e63"
//     },
//     contentComponent: props => <SideBar {...props} />
//   }
// );


const Drawer = DrawerNavigator({
  Login: { screen: Login,
    navigationOptions: ({navigation}) => ({
      tabBarVisible : false,
      drawerLockMode : 'locked-closed'
    })},
  TodoList: { screen: TodoList,
    navigationOptions: ({navigation}) => ({
      tabBarVisible : false,
      drawerLockMode : 'locked-closed'
    })},
  AboutUs: { screen: AboutUs,
    navigationOptions: ({navigation}) => ({
      tabBarVisible : false,
      drawerLockMode : 'locked-closed'
    }) },
  NHProfile: { screen: NHProfile,
    navigationOptions: ({navigation}) => ({
      tabBarVisible : false,
      drawerLockMode : 'locked-closed'
    }) }
},
{
  initialRouteName: "Login",
  contentOptions: {
    activeTintColor: "#e91e63"
  },
  contentComponent: props => <SideBar {...props} />
});

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer,
      navigationOptions: ({navigation}) => ({
        swipeEnabled: false
      })
     },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);


export default () =>
  <Root>
    <AppNavigator />
  </Root>;
