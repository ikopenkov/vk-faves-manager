import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { selectFavesList, selectIsLoaded, selectIsLoading } from '../../Reducers/FavesReducer';
import { loadFaves } from '../../Actions/FavesActions';

interface Props {
  favesList?: Object[];
  isLoaded: boolean;
  isLoading: boolean;
  loadFaves(): void;
}

class FavesContainer extends React.Component<Props, {}> {
  public componentDidMount() {
    console.log('load');
    this.props.loadFaves();
  }

  public render() {
    console.log('------ faves ------', this.props.favesList);
    console.log('------ isLoaded ------', this.props.isLoaded);

    return (
      <View>
        <Text>asdf</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  favesList: selectFavesList(state),
  isLoaded: selectIsLoaded(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  loadFaves: () => dispatch(loadFaves()),
});

export default connect<{}, {}>(mapStateToProps, mapDispatchToProps)(FavesContainer);
