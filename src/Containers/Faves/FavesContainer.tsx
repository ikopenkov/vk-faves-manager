import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

interface Props {
  faves: Object;
}

class FavesContainer extends Component<Props, any> {
  public render() {
    console.log('faves', this.props.faves);

    return (
      <View>
        <Text>
          Faves ------- 
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  faves: state.faves,
});

export default connect(mapStateToProps)(FavesContainer);