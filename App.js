import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo, {Constants, Notifications } from 'expo';

async function register() {
  console.log('Registering...W');
  const { status } = await Expo.Permissions.askAsync (
    Expo.Permissions.NOTIFICATIONS
  );
  console.log(' Permitions: ' + status);

  if(status !== 'granted') {
    alert("You need to enable permission in setting");
    return;
  }

  const pushToken = await Expo.Notifications.getExpoPushTokenAsync();  
  console.log(' Token: ' + pushToken);

  const url1 = 'http://192.168.0.117:8080/users/push-token';
  const url2 = 'http://172.24.174.30:8080/users/push-token';
  const url3 = 'https://tklab.herokuapp.com//users/push-token';

  return fetch(url2, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
              'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token:  pushToken,
      userId: 'dina'
    } ),
  });
}

export default class App extends React.Component {
  state = {
    notification: {},
  };

  componentWillMount() {
    register();
    this.listener = Expo.Notifications.addListener(this.listen);
  }

  componentWillUnMount() {
      this.listener && Expo.Notifications.removeListener(this.listen)
  }
/*
  listen = ({origin, data}) => {
    console.log("a message !")
    console.log(origin, data);
  }
*/
  listen = (notification) => {
    console.log("Origin:" + notification.origin );
    console.log("ACTION:" + notification.data.ACTION );
    console.log("title:" + notification.data.TITLE );
    this.setState({notification: notification});
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello 41</Text>
        <Text> Stataus[ {JSON.stringify(this.state.notification.data)}] </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
