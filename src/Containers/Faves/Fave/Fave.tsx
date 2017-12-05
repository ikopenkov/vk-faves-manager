import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import { FavePostProps, GroupProps, ProfileProps } from '../../../Backend/Models';
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

  private renderAvatar() {
  return (
    <View style={styles.avatarWrapper}>
      <Image style={styles.avatarImage} source={{ uri: this.author.photo_50 || this.author.photo_100 }}  />
    </View>
  );
  }

  private renderAuthorName() {
    return <Text numberOfLines={1} style={styles.authorName}>{this.author.name}</Text>;
  }

  get author(): GroupProps | ProfileProps {
    const { faveData: { authorGroup, authorProfile, id } } = this.props;
    const author = authorGroup || authorProfile;
    if (!author) {
      throw `Post ${id} has not author?`;
    }
    return author;
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
          {this.renderAvatar()}
          <View style={styles.headerCaptions}>
            {this.renderAuthorName()}
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
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 7,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    flex: 1,
    width: '100%',
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
