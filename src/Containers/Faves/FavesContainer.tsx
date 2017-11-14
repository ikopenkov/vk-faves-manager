import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { selectFavesList, selectIsLoaded, selectIsLoading } from '../../Reducers/FavesReducer';
import { loadFaves } from '../../Actions/FavesActions';
import { Fave } from '../../Api/FavesApi';
import moment from 'moment';
import 'moment/locale/ru';

interface Props {
  faves?: Object[];
  isLoaded: boolean;
  isLoading: boolean;
  loadFaves(): void;
}

class FavesContainer extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.renderFave = this.renderFave.bind(this);
  }

  public componentDidMount() {
    console.log('load');
    this.props.loadFaves();
  }

  private renderFave(fave: Fave) {
    return (
      <View style={styles.fave}>
        <View style={styles.faveHeader}>
          <View style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.authorName}>Какой-то паблик</Text>
            <Text style={styles.postDate}>{this.formatDate(fave.date)}</Text>
          </View>
        </View>
        <Text>{fave.text}</Text>
      </View>
    );
  }

  /**
   * @param date // unix timestamp - seconds from 1970
   */
  private formatDate(date: number) {
    const dateObj = moment(date * 1000);
    // dateObj.locale('ru');
    return dateObj.locale('ru').format('DD MMMM Y, hh:mm');
  }

  public render() {
    const { faves } = this.props;

    return (
      <View style={styles.container}>
        <FlatList data={faves} renderItem={({ item }) => this.renderFave(item)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fave: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#ffffff',
    width: '100%',
    marginBottom: 12,
  },
  faveHeader: {
    height: 52,
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#5d80a6',
    borderRadius: 40,
    marginRight: 7,
  },
  authorName: {
    fontSize: 15,
    color: '#426997',
    fontWeight: 'bold',
    marginBottom: 1,
  },
  postDate: {
    fontSize: 13,
    color: '#888888',
  }
});

const mapStateToProps = state => ({
  faves: selectFavesList(state),
  isLoaded: selectIsLoaded(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  loadFaves: () => dispatch(loadFaves()),
});

export default connect<{}, {}>(mapStateToProps, mapDispatchToProps)(FavesContainer);
