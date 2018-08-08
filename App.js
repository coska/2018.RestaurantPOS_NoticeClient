import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo, {Constants} from 'expo';

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

  const url1 = 'http://192.168.0.17:8080/users/push-token';
  const url2 = 'https://tklab.herokuapp.com//users/push-token';

  return fetch(url2, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
              'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token:  pushToken,
      userId: 'thomas'
    } ),
  });
}

export default class App extends React.Component {
  
  componentWillMount() {
    register();
    this.listener = Expo.Notifications.addListener(this.listen);
  }

  componentWillUnMount() {
      this.listener && Expo.Notifications.removeListener(this.listen)
  }

  listen = ({origin, data}) => {
    console.log(origin, data);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello 38</Text>
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
