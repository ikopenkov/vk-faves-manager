import * as React from 'react';
import { connect } from 'react-redux';
import { Button, View, FlatList, StyleSheet, Text } from 'react-native';
import {
  selectFavesList,
  selectHasFaves,
  selectIsLoaded,
  selectIsLoading,
  selectIsImported,
  selectIsImporting,
} from '../../Reducers/FavesReducer';
import {
  loadFaves as loadFavesAction,
  importFaves as importFavesAction,
} from '../../Actions/FavesActions';
import { Fave as FaveData } from '../../Api/FavesApi';
import { State } from '../../Reducers';
import Fave from './Fave';
import { Fave as FaveType } from '../../api/FavesApi';
import 'moment/locale/ru';

interface MapStateProps {
  faves: FaveType[];
  hasFaves: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  isImported: boolean;
  isImporting: boolean;
}
interface MapDispatchProps {
  loadFaves(): void;
  importFaves(): Promise<void>;
}

interface Props extends MapStateProps, MapDispatchProps {}

class FavesContainer extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.renderFave = this.renderFave.bind(this);
    this.importButtonPressHandler = this.importButtonPressHandler.bind(this);
  }

  public componentDidMount() {
    this.props.loadFaves();
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
    const { isImporting } = this.props;
    return (
      <View>
        <Text>You have not imported your faves from vk.com yet</Text>
        <Button
          disabled={isImporting}
          title={isImporting ? 'Importing...' : 'Press to start import'}
          onPress={this.importButtonPressHandler}
        />
      </View>
    );
  }

  private importButtonPressHandler() {
    const { importFaves, loadFaves } = this.props;
    importFaves().then(() => {
      loadFaves();
    });
  }

  public render() {
    const { hasFaves, faves } = this.props;
    console.log('asdf', faves);
    

    const output = hasFaves ? this.renderFaveList() : this.renderImportButton();

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
  hasFaves: selectHasFaves(state),
  isLoaded: selectIsLoaded(state),
  isLoading: selectIsLoading(state),
  isImporting: selectIsImporting(state),
  isImported: selectIsImported(state),
});

const mapDispatchToProps: (dispatch: any) => MapDispatchProps = dispatch => ({
  loadFaves: () => dispatch(loadFavesAction()),
  importFaves: () => dispatch(importFavesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavesContainer);
