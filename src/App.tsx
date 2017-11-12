/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Faves from './Containers/Faves';
import Login from './Containers/Login';
import TokenWebView from './Containers/TokenWebView';

// const instructions = Platform.select({
//   ios: 'Press Cmd+RRRR to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap RRRR on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });

export default class App extends Component<{}> {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            <Scene key="login" component={Login} />
            <Scene back={false} key="faves" component={Faves} title="Faves" />
            <Scene key="tokenWebView" component={TokenWebView} title="VK authorization" />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
