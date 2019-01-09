import React, { Component } from "react";
import { ListView, Alert } from "react-native";
import * as firebase from "firebase";
import {
  Container,
  Header,
  Title,
  Content,
  Form,
  Item,
  Input,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";

const firebaseConfig = {
  apiKey: "AIzaSyCc7hSOY8oDB3HrGIXHlg-M6hIZpLFCDhQ",
  authDomain: "todo-b2dde.firebaseapp.com",
  databaseURL: "https://todo-b2dde.firebaseio.com",
  projectId: "todo-b2dde",
  storageBucket: "todo-b2dde.appspot.com",
  messagingSenderId: "6442618337"
};


firebase.initializeApp(firebaseConfig);

const data = [
  // {
  //   text: "Go to supermarket",
  //   note: "January 9 at 5:00 AM"
  // },
  // {
  //   text: "Buy milk",
  //   note: "Tomorrow"
  // },
  // {
  //   text: "Work out",
  //   note: "3:00 PM"
  // },
];

class TodoList extends Component {
  
  
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {

      listViewData: data,
      newcontact : ""
    };
  }


componentDidMount(){
var that = this
firebase.database().ref('/contacts').on('child_added',function(data){

  var newData = [...that.state.listViewData]
  newData.push(data)
  that.setState({listViewData: newData})
})
  }

addRow(data) {
var key = firebase.database().ref('/contacts').push().key
firebase.database().ref('/contacts').child(key).set({name: data})
}

showInformation(){

}

async deleteRow(secId, rowId, rowMap,data) {

  await firebase.database().ref('contacts/'+data.key).set(null)
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
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
          
          <Body style={{ flex: 3 }}>
            <Title>Todos</Title>
          </Body>
          <Right></Right>
        </Header>

        <Content>
        
          <Form>
            <Item rounded style={{marginTop : 10, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
              <Input placeholder="Add new task" 
              onChangeText={(newcontact) => this.setState({newcontact})}
              />
              
              <Right>
            <Button
              transparent
              onPress={() => this.addRow(this.state.newcontact)} >
              <Icon name="add" />
            </Button>  
          </Right>
            </Item>
          </Form>
      
          <List
          enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem style={{ paddingLeft: 20 }}>
                <Body>
                  <Text>
                    {data.val().name}
                  </Text>
                  {/* <Text numberOfLines={1} note>
                  {data.val().name}
                  </Text> */}
                </Body>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button
                full
                onPress={() => this.addRow(data)} 
                style={{
                  backgroundColor: "#CCC",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button
                full
                danger
                onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />

        <Button transparent info style={[styles.mb15, styles.center]}>
            <Text>Show completed todos</Text>
          </Button>
        </Content>
      </Container>
      

      
    );
  }
}

export default TodoList;
