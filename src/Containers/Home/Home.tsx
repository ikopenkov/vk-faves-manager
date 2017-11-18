import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectIsTokenSet } from '../../Reducers/UserReducer';
import Faves from '../Faves';
import Login from '../Login';
import { loadStoredToken as loadStoredTokenAction } from '../../Actions/UserActions';
import { State } from '../../Reducers';

interface MapStateProps {
  hasToken: boolean;
}
interface MapDispatchProps {
  loadStoredToken(): Promise<string>;
}
interface Props extends MapDispatchProps, MapStateProps {}

class Home extends Component<Props> {
  public componentWillMount() {
    const { hasToken, loadStoredToken } = this.props;
    if (!hasToken) {
      loadStoredToken();
    }
  }

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

const mapStateToProps: (state: State) => MapStateProps = state => ({
  hasToken: selectIsTokenSet(state),
});

const mapDispatchToProps: (dispatch: any) => MapDispatchProps = dispatch => ({
  loadStoredToken: () => dispatch(loadStoredTokenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
