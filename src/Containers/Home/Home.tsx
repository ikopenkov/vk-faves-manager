import React, { Component } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectIsTokenSet } from '../../Reducers/UserReducer';
import Faves from '../Faves';
import Login from '../Login';

interface Props {
  hasToken: boolean;
}

class LoginScene extends Component<Props> {
  public render() {
    const { hasToken } = this.props;

    let output: React.ReactNode;

    if (hasToken) {
      output = <Faves />;
    } else {
      output = <Login />;
    }

    return output;
  }
}

// const styles = StyleSheet.create({
//   outerContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//   },
// });

const mapStateToProps = state => ({
  hasToken: selectIsTokenSet(state),
});

export default connect(mapStateToProps, null)(LoginScene);
