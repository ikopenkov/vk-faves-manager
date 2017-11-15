import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, WebView, NavState } from 'react-native';
// import { selectFavesList, selectIsLoaded, selectIsLoading } from '../../Reducers/FavesReducer';
import { VK_OAUTH_URL } from '../../Constants';
import urlParamParse from 'url-param-parser';
import { setToken } from '../../Actions/UserActions';
import { Actions home from 'react-native-router-flux';

interface Props {
  // onGotToken(token: string): void;
  setToken: setToken;
}

class TokenWebView extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.navigationStateChangeHandler = this.navigationStateChangeHandler.bind(this);
  }

  private navigationStateChangeHandler(navState: NavState) {
    const parsedUrl = urlParamParse(navState.url);
    const hashData: { [key: string]: string } = parsedUrl.hash;
    if (hashData && hashData.access_token) {
      this.props.setToken(hashData.access_token);
      Actions.pop();
      // this.props.onGotToken(hashData.access_token);
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <WebView
          onNavigationStateChange={this.navigationStateChangeHandler}
          source={{
            uri: VK_OAUTH_URL,
          }}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
  },
});

// const mapStateToProps = state => ({
//   favesList: selectFavesList(state),
//   isLoaded: selectIsLoaded(state),
//   isLoading: selectIsLoading(state),
// });

const mapDispatchToProps = dispatch => ({
  setToken: (token: string) => dispatch(setToken(token)),
});
export default connect(null, mapDispatchToProps)(TokenWebView);
