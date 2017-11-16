import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Photo } from '../../../api/FavesApi';
import { popNumber } from '../../../Utils/Array';

interface Props {
  items: Photo[];
}

interface State {
  // numberOfLines?: number;
  isTruncated: boolean;
}

interface RenderItemParams {
  uri: string;
  width: string | number;
  height: string | number;
}

class ImagesGrid extends React.Component<Props, State> {
  // private renderSingleItem(item: Photo) {
  //   return this.renderItem({
  //     uri: item.photo_604,
  //     width: '100%',
  //     height: 200,
  //   });
  // }

  // private renderTwiceItems(items: Photo[]) {
  //   return items.map(item =>
  //     this.renderItem({
  //       uri: item.photo_130,
  //       width: '49%',
  //       height: 100,
  //     })
  //   );
  // }

  private renderSomeItems(items: Photo[]) {
    const paramsByNumber = {
      5: {
        height: 50,
        width: '19%',
        photoSize: 'photo_75',
      },
      4: {
        height: 60,
        width: '24%',
        photoSize: 'photo_75',
      },
      3: {
        height: 70,
        width: '32%',
        photoSize: 'photo_130',
      },
      2: {
        height: 100,
        width: '49%',
        photoSize: 'photo_130',
      },
      1: {
        height: 200,
        width: '49%',
        photoSize: 'photo_604',
      },
    };
    const params = paramsByNumber[items.length];
    if (!params) {
      throw `invalid photos number to render ${items.length}`;
    }

    return items.map(item =>
      this.renderItem({
        uri: item[params.photoSize],
        width: params.width,
        height: params.height,
      })
    );
  }

  private renderItem({ uri, width, height }: RenderItemParams) {
    return <Image style={{ width, height }} source={{ uri }} />;
  }

  private renderRows(givenItems: Photo[], acc: React.ReactNode[] = []) {
    const items = givenItems.slice();

    const popItemsAddRendered = number => {
      const before = items.length;
      const usedItems = popNumber(items, number);
      console.log('before', before, 'usedItems', usedItems.length, 'items', items.length);
      acc = acc.concat(this.renderSomeItems(usedItems));
    };

    if (items.length > 9) {
      popItemsAddRendered(5);
    } else if (items.length >= 9) {
      popItemsAddRendered(4);
    } else if (items.length >= 7) {
      popItemsAddRendered(3);
    } else if (items.length >= 5) {
      popItemsAddRendered(2);
    } else if (items.length === 4) {
      popItemsAddRendered(3);
    } else if (items.length === 3) {
      popItemsAddRendered(2);
    } else if (items.length) {
      popItemsAddRendered(items.length);
    }

    if (items.length >= 3) {
      this.renderRows(items, acc);
    }

    return acc;
  }

  public render() {
    const { items } = this.props;
    const output = this.renderRows(items);
    console.log('-- output', output);
    

    return <View style={styles.container}>{output}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ImagesGrid;
