import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Thumbnail,
  List,
  ListItem,
  Text,
  Body,
  Left,
  Right,
  View
} from "native-base";
import styles from "./styles";

const logo = require("../../../assets/splashscreen.png");
const cover = require("../../../assets/web-cover1.jpg");
const datas = [
  {
    img: logo,
    text: "Nguyen Manh Triet",
    note: "Its time to build a difference . ."
  },
  {
    img: logo,
    text: "Robert Dooley",
    note: "One needs courage to be happy and smiling all time . . "
  },
  {
    img: logo,
    text: "Duong Cong Hau",
    note: "Time changes everything . ."
  }];

class NHProfile extends Component {
  
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <View style={styles.center}>
          <Thumbnail Xlarge source={cover} style={styles.mb10} />
          </View>
          <View >
            <Text style={[styles.mb10, styles.wordBold, styles.normalText ]}>Username</Text>
            <Text style={[styles.mb10, styles.normalText]}>Email</Text>
            <Text style={[styles.mb10, styles.normalText ]}>Phone number</Text>
          </View>
        </Content>
      
         
      
      </Container>
    );
  }
}

export default NHProfile;
