import * as React from 'react';
import { Button } from 'react-native';
import CookieManager from 'react-native-cookies';
import { importFaves as importFavesAction } from '../../../Actions/FavesActions';
import { connect } from 'react-redux';

interface MapDispatchProps {
  importFaves(): Promise<void>;
}

interface Props extends MapDispatchProps {}

class LogoutButton extends React.Component<Props> {
  public render() {
    return <Button title="Import faves" onPress={() => {
      CookieManager.clearAll();
      this.props.importFaves();
    }} />;
  }
}

const mapDispatchToProps: (dispatch: any) => MapDispatchProps = dispatch => ({
  importFaves: () => dispatch(importFavesAction()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);
