import * as React from 'react';
import { View, Text, LayoutChangeEvent, StyleSheet } from 'react-native';

interface Props {
  children: string;
  numberOfLines: number;
  onSetVisible?(): void;
}

interface State {
  numberOfLines?: number;
  isTruncated: boolean;
}

class Fave extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);

    this.onLayout = this.onLayout.bind(this);
    this.onShowMorePress = this.onShowMorePress.bind(this);
  }

  public state: State = {
    numberOfLines: null,
    isTruncated: false,
  };

  private originalHeight: number = null;
  private isHeightChecked: boolean = false;

  private onLayout(event: LayoutChangeEvent) {
    const { height } = event.nativeEvent.layout;
    const { numberOfLines, onSetVisible } = this.props;
    
    if (this.originalHeight === null) {
      console.log('--- 1 ----');
      
      this.originalHeight = height;
      this.setState({ numberOfLines });
    } else if (!this.isHeightChecked) {
      console.log('--- 2 ----');
      this.isHeightChecked = true;

      if (height < this.originalHeight) {
        this.setState({ isTruncated: true });
      }

      if (onSetVisible) {
        onSetVisible();
      }
    }
  }

  private renderShowMore() {
    return (
      <Text onPress={this.onShowMorePress} style={styles.showMore}>
        Показать полностью...
      </Text>
    );
  }

  private onShowMorePress() {
    this.setState({ isTruncated: false, numberOfLines: null });
  }

  public render() {
    const { isTruncated, numberOfLines } = this.state;
    const { children } = this.props;
    return (
      <View onLayout={this.onLayout} style={styles.textContainer}>
        <Text numberOfLines={numberOfLines} style={styles.text}>
          {children}
        </Text>
        {isTruncated && this.renderShowMore()}
        {
          !numberOfLines &&
          <View style={{ borderWidth: 2, borderColor: 'black', width: 1, height: 1 }} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  text: {
    fontSize: 15,
  },
  showMore: {
    color: '#426997',
    marginTop: 3,
    fontWeight: 'bold',
    fontSize: 15,
  },
  hidden: {
    opacity: 0,
  },
});

export default Fave;
