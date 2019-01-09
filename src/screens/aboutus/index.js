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

class AboutUs extends Component {
  
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
            <Title>About us</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <View style={styles.center}>
          <Thumbnail Xlarge source={cover} style={styles.mb10} />
          </View>
          <View >
            <Text style={[styles.mb10, styles.wordBold, styles.normalText ]}>Me.Organized</Text>
            <Text style={[styles.mb50,styles.normalText, styles.normalText]}> Very simple To-do list Application {"\n"} built for Android and iOs users. {"\n"}Hope you enjoy</Text>
            <Text style={[styles.mb35, styles.wordBold, styles.normalText ]}>Meet the team</Text>
    
            <List
            dataArray={datas}
            renderRow={data =>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail mediumTeam source={data.img} />
                </Left>
                <Body>
                  <Text>
                    {data.text}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.note}
                  </Text>
                </Body>
              </ListItem>}
          />
        
          </View>
        </Content>
      </Container>
    );
  }
}

export default AboutUs;
