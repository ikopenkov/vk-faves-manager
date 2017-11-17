import * as React from 'react';
import { View, Text, LayoutChangeEvent, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import { Fave as FaveData } from '../../../Api/FavesApi';
import ImagesGrid from '../ImagesGrid';

const NUMBER_OF_LINES_TRUNCATED = 9;

interface Props {
  faveData: FaveData;
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
    numberOfLines: undefined,
    isTruncated: false,
  };

  private originalHeight: number = null;
  private isHeightChecked: boolean = false;

  /**
   * @param date // unix timestamp - seconds from 1970
   */
  private formatDate(date: number) {
    const dateObj = moment(date * 1000);
    // dateObj.locale('ru');
    return dateObj.locale('ru').format('DD MMMM Y, hh:mm');
  }

  private onLayout(event: LayoutChangeEvent) {
    const { height } = event.nativeEvent.layout;

    if (this.originalHeight === null) {
      this.originalHeight = height;
      this.setState({ numberOfLines: NUMBER_OF_LINES_TRUNCATED }, () => {
        if (!this.isHeightChecked) {
          this.isHeightChecked = true;
        }
      });
    } else if (!this.isHeightChecked) {
      this.isHeightChecked = true;
      if (height < this.originalHeight) {
        this.setState({ isTruncated: true });
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

  private renderText() {
    const { isTruncated } = this.state;
    const { text } = this.props.faveData;
    return (
      !!text && (
        <View style={styles.textContainer}>
          <Text
            onLayout={this.onLayout}
            numberOfLines={this.state.numberOfLines}
            style={styles.text}
          >
            {text}
          </Text>
          {isTruncated && this.renderShowMore()}
        </View>
      )
    );
  }

  public render() {
    const { faveData } = this.props;
    const { date } = faveData;

    const attachments = faveData.attachments || [];
    const photos = attachments.filter(item => item.photo).map(item => item.photo);

    const containerStyle = this.isHeightChecked ? styles.container : styles.hidden;

    return (
      <View style={containerStyle}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.headerCaptions}>
            <Text style={styles.authorName}>Какой-то паблик</Text>
            <Text style={styles.date}>{this.formatDate(date)}</Text>
          </View>
        </View>

        {this.renderText()}

        <View>
          <ImagesGrid items={photos} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  header: {
    height: 52,
    paddingHorizontal: 12,
    paddingTop: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#5d80a6',
    borderRadius: 40,
    marginRight: 7,
  },
  headerCaptions: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  authorName: {
    fontSize: 15,
    color: '#426997',
    fontWeight: 'bold',
    marginBottom: 1,
  },
  date: {
    fontSize: 13,
    color: '#888888',
  },
  textContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  text: {
    fontSize: 15,
    // maxHeight: 290,
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
