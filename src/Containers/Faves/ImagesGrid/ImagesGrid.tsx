import * as React from 'react';
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { Photo } from '../../../api/FavesApi';
import { popNumber } from '../../../Utils/Array';

interface Props {
  items: Photo[];
}

interface State {
  // numberOfLines?: number;
  isTruncated: boolean;
}

interface RenderImageParams {
  uri: string;
  width: string | number;
  height: string | number;
  key: number;
  photo: Photo;
}

class ImagesGrid extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);

    this.imageTouchHandler = this.imageTouchHandler.bind(this);
  }
  private renderImagesRows(givenItems: Photo[], rows: React.ReactNode[][] = []) {
    const items = givenItems.slice();

    const popRenderPush = number => {
      const usedItems = popNumber(items, number);
      rows.push(this.renderSomeImages(usedItems));
    };

    if (items.length >= 10) {
      popRenderPush(6);
    } else if (items.length === 9) {
      popRenderPush(5);
    } else if (items.length >= 7) {
      popRenderPush(4);
    } else if (items.length >= 5) {
      popRenderPush(3);
    } else if (items.length === 4) {
      popRenderPush(3);
    } else if (items.length === 3) {
      popRenderPush(2);
    } else if (items.length) {
      popRenderPush(items.length);
    }

    if (items.length) {
      rows = this.renderImagesRows(items, rows);
    }

    return rows;
  }

  private renderSomeImages(items: Photo[]) {
    const paramsByNumber = {
      6: {
        height: 40,
        width: '16%',
        photoSize: 'photo_75',
      },
      5: {
        height: 50,
        width: '19.2%',
        photoSize: 'photo_75',
      },
      4: {
        height: 60,
        width: '24%',
        photoSize: 'photo_75',
      },
      3: {
        height: 70,
        width: '32.7%',
        photoSize: 'photo_130',
      },
      2: {
        height: 100,
        width: '49.5%',
        photoSize: 'photo_130',
      },
      1: {
        height: 200,
        width: '100%',
        photoSize: 'photo_604',
      },
    };
    const params = paramsByNumber[items.length];
    if (!params) {
      throw `invalid photos number to render ${items.length}`;
    }

    return items.map(item =>
      this.renderImage({
        uri: item[params.photoSize],
        key: item.id,
        width: params.width,
        height: params.height,
        photo: item,
      })
    );
  }

  private renderImage({ photo, key, uri, width, height }: RenderImageParams) {
    return (
      <TouchableHighlight key={key} style={{ width, height }} onPress={() => this.imageTouchHandler(photo)}>
        <Image style={styles.imageWrapper} source={{ uri }} />
      </TouchableHighlight>
    );
  }

  private imageTouchHandler(photo: Photo) {
    console.log(photo);
  }

  public render() {
    const { items } = this.props;
    const rows = this.renderImagesRows(items).reverse();

    return (
      <View style={styles.container}>
        {rows.map((row, index) => (
          <View key={index} style={styles.row}>
            {row}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
});

export default ImagesGrid;
