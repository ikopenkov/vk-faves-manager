import * as React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { selectFavesList, selectIsLoaded, selectIsLoading } from '../../Reducers/FavesReducer';
import { loadFaves } from '../../Actions/FavesActions';
import { Fave as FaveData } from '../../Api/FavesApi';
import { State } from '../../Reducers';
import Fave from './Fave';
import ImportButton from '../Home/ImportButton';
import 'moment/locale/ru';

interface MapStateProps {
  faves?: Object[];
  isLoaded: boolean;
  isLoading: boolean;
}
interface MapDispatchProps {
  loadFaves(): void;
}

interface Props extends MapStateProps, MapDispatchProps {}

class FavesContainer extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.renderFave = this.renderFave.bind(this);
  }

  public componentDidMount() {
    // this.props.loadFaves();
  }

  private renderFaveList() {
    const { faves } = this.props;
    return (
      <FlatList
        keyExtractor={(_: Fave, index: number) => index.toString()}
        data={faves}
        renderItem={({ item }) => this.renderFave(item)}
      />
    );
  }

  private renderFave(fave: FaveData) {
    // let textElement;
    return (
      <View style={styles.faveWrapper}>
        <Fave faveData={fave} />
      </View>
    );
  }

  private renderImportButton() {
    return (
      <View>
        <Text>You have not imported your faves from vk.com yet</Text>
        <ImportButton />
      </View>
    );
  }

  public render() {
    const { isLoaded } = this.props;

    const output = isLoaded ? this.renderFaveList() : this.renderImportButton();

    return <View style={styles.container}>{output}</View>;
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
  },
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
