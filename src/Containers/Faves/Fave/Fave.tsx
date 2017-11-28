import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import { FavePostProps } from '../../../Backend/Models';
import ImagesGrid from '../ImagesGrid';
import TruncatedText from '../../../Components/TruncatedText';

const NUMBER_OF_LINES_TRUNCATED = 9;

interface Props {
  faveData: FavePostProps;
}

interface State {
  isVisible: boolean;
}

class Fave extends React.Component<Props, State> {
  public state: State = {
    isVisible: !this.props.faveData.text,
  };

  /**
   * @param date // unix timestamp - seconds from 1970
   */
  private formatDate(date: number) {
    const dateObj = moment(date * 1000);
    // dateObj.locale('ru');
    return dateObj.locale('ru').format('DD MMMM Y, hh:mm');
  }

  private renderText() {
    const { text } = this.props.faveData;
    return (
      !!text && (
        <TruncatedText
          onSetVisible={() => this.setState({ isVisible: true })}
          numberOfLines={NUMBER_OF_LINES_TRUNCATED}
        >
          {text}
        </TruncatedText>
      )
    );
  }

  public render() {
    const { isVisible } = this.state;
    const { faveData } = this.props;
    const { date } = faveData;

    const photos = faveData.photos;

    const containerStyle = isVisible ? styles.container : styles.hidden;
    // const containerStyle = styles.container;

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
