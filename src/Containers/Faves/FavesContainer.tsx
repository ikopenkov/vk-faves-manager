import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { selectFavesList, selectIsLoaded, selectIsLoading } from '../../Reducers/FavesReducer';

interface Props {
  favesList?: Object[];
  isLoaded: boolean;
  isLoading: boolean;
}

class FavesContainer extends Component<Props, any> {
  public render() {
    console.log('------ faves ------', this.props.favesList);

    return (
      <View>
        <Text>
          asdf
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  favesList: selectFavesList(state),
  isLoaded: selectIsLoaded(state),
  isLoading: selectIsLoading(state),
});

export default connect(mapStateToProps, null)(FavesContainer);