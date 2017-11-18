import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Photo } from '../../api/FavesApi';

interface Props {
  items: Photo[];
  index?: number;
}

interface State {
  currentIndex: number;
}

class PhotoView extends Component<Props, State> {
  public state: State = {
    currentIndex: this.props.index || 0,
  };

  public render() {
    const { currentIndex } = this.state;
    const { items } = this.props;
    const imageData = items[currentIndex];
    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <TouchableHighlight style={styles.imageWrapper} onPress={() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex === items.length) {
              nextIndex = 0;
            }
            this.setState({ currentIndex: nextIndex });
          }}>
            <Image style={styles.image} source={{ uri: imageData.photo_807 || imageData.photo_604 }}  />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  }
});

export default PhotoView;
