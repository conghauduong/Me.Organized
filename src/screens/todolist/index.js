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
  Toast,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  CheckBox
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
];

const completedData = [

];

class TodoList extends Component {
  
  
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: data,
      listViewCompletedData: completedData,
      newcontact : "",
      isHidden: false
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.setState({isHidden: !this.state.isHidden})
  }

componentDidMount(){
var that = this
firebase.database().ref('/incompleted').on('child_added',function(data){
  var newData = [...that.state.listViewData]
  newData.push(data)
  that.setState({listViewData: newData})
});

firebase.database().ref('/completed').on('child_added',function(completedData){
  var newData = [...that.state.listViewCompletedData]
  newData.push(completedData)
  that.setState({listViewCompletedData: newData})
})

// firebase.database().ref('/completed').on('child_added',function(completedData){
//   var newData = [...that.state.listViewData]
//   newData.push(completedData)
//   that.setState({listViewData: newData})
// })
  }

addRow(data) {
var key = firebase.database().ref('/incompleted').push().key
firebase.database().ref('/incompleted').child(key).set({name: data})
}

addRowCompleted(data) {
  var key = firebase.database().ref('/completed').push().key
  firebase.database().ref('/completed').child(key).set({name: data})
  }

showInformation(){

}

// AddCompletedDelete(){
// this.addRow(this.state.newcontact); 
// this.deleteRow(secId, rowId, rowMap, data);  
//  }

onHandleSubmit(e) {
  e.preventDefault();
  const newcontact = this.state.newcontact;
  this.props.onSearchTermChange(newcontact);
  this.setState({
   newcontact: ''
 });
}

async deleteRow(secId, rowId, rowMap,data) {

  await firebase.database().ref('incompleted/'+data.key).set(null)
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  async deleteCompletedRow(secId, rowId, rowMap,completedData) {

    await firebase.database().ref('completed/'+completedData.key).set(null)
      rowMap[`${secId}${rowId}`].props.closeRow();
      var newData = [...this.state.listViewCompletedData];
      newData.splice(rowId, 1);
      this.setState({ listViewCompletedData: newData });
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
            <Button onPress={this.onHandleSubmit} type="submit"
              transparent
              onPress={() => {
                if (this.state.newcontact.trim() === ""){
                  Toast.show({
                    text: "Task can not be empty",
                    buttonText: "Ok",
                    type: "danger",
                  })
                } else
                this.addRow(this.state.newcontact)
                } 
              } >
  
              <Icon name="add" />
            </Button>  
          </Right>
            </Item>
          </Form>
      
          <List
          enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={(data, secId, rowId, rowMap) =>
              <ListItem style={{ paddingLeft: 20 }}>
              
              <Button
              transparent
              onPress={() => {this.addRowCompleted(data.val().name);this.deleteRow(secId, rowId, rowMap, data )}}>
              <Icon name="paper-plane" />
              </Button>
        
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




        <Button onPress={this.onPress}
        transparent info style={[styles.mb15, styles.center]}>
        <Text>{this.state.isHidden ? "Hide completed Todos" : "Show completed Todos"}</Text>
          </Button>


          {this.state.isHidden ? <List
          enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewCompletedData)}
            renderRow={(completedData, secId, rowId, rowMap) =>
              <ListItem style={{ paddingLeft: 20 }}>
                <Body>
                  <Text>
                    {completedData.val().name}
                  </Text>
                  {/* <Text numberOfLines={1} note>
                  {data.val().name}
                  </Text> */}
                </Body>
                
              </ListItem>}
            renderLeftHiddenRow={completedData =>
              <Button
                full
                onPress={() => this.addRow(completedData)} 
                style={{
                  backgroundColor: "#CCC",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(completedData,secId, rowId, rowMap) =>
              <Button
                full
                danger
                onPress={_ => this.deleteCompletedRow(secId, rowId, rowMap, completedData)}
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
          /> : null}


          
        </Content>
      </Container>
      

      
    );
  }
}

export default TodoList;
