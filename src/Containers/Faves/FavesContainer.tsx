import * as React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';
import { selectFavesList, selectIsLoaded, selectIsLoading } from '../../Reducers/FavesReducer';
import { loadFaves } from '../../Actions/FavesActions';
import { Fave as FaveData } from '../../Api/FavesApi';
import { State } from '../../Reducers';
import Fave from './Fave';
import 'moment/locale/ru';

interface MapStateProps {
  faves?: Object[];
  isLoaded: boolean;
  isLoading: boolean;
}
interface MapDispatchProps {
  loadFaves(): void;
}

interface Props extends MapStateProps, MapDispatchProps {
}

class FavesContainer extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.renderFave = this.renderFave.bind(this);
  }

  public componentDidMount() {
    console.log('load');
    this.props.loadFaves();
  }

  private renderFave(fave: FaveData) {
    // let textElement;
    return (
      <View style={styles.faveWrapper}>
        <Fave faveData={fave} />
      </View>
    );
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
  faveWrapper: {
    borderWidth: 1,
    borderColor: '#efefef',
    marginBottom: 12,
  }
});

const mapStateToProps: (state: State) => MapStateProps = state => ({
  faves: selectFavesList(state),
  isLoaded: selectIsLoaded(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps: (dispatch: any) => MapDispatchProps = dispatch => ({
  loadFaves: () => dispatch(loadFaves()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavesContainer);
