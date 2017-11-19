import * as React from 'react';
import { Button } from 'react-native';
import CookieManager from 'react-native-cookies';
import { clearStoredToken as clearStoredTokenAction } from '../../../Actions/UserActions';
import { connect } from 'react-redux';

interface MapDispatchProps {
  clearStoredToken(): Promise<void>;
}

interface Props extends MapDispatchProps {}

class LogoutButton extends React.Component<Props> {
  public render() {
    return <Button title="Logout" onPress={() => {
      CookieManager.clearAll();
      this.props.clearStoredToken();
    }} />;
  }
}

const mapDispatchToProps: (dispatch: any) => MapDispatchProps = dispatch => ({
  clearStoredToken: () => dispatch(clearStoredTokenAction()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);
