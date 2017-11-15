import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
// import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setToken } from '../../Actions/UserActions';
// import { bindActionCreators } from 'redux';

interface Props {
  // userActions: UserActions.Types;
  setToken: setToken;
}

class LoginScene extends Component<Props> {
  constructor(props: Props) {
    super(props);

    // this.gotTokenHandler = this.gotTokenHandler.bind(this);
  }

  // private gotTokenHandler(token: string) {
  //   // const { userActions } = this.props;
  //   this.props.setToken(token);
  //   Actions.faves();
  // }

  public render() {
    return (
      <View style={styles.outerContainer}>
        <Text>
          You're not logged in
        </Text>
        <Button title="Click to login with VK" onPress={Actions.tokenWebView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});

const mapDispatchToProps = dispatch => ({
  setToken: (token: string) => dispatch(setToken(token)),
});
// const mapDispatchToProps = dispatch => ({
//   userActions: bindActionCreators(UserActions, dispatch),
// });

export default connect(null, mapDispatchToProps)(LoginScene);
