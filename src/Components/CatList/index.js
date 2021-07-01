import React from 'react';
import {
  View,
  Text,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
} from 'react-native';
import SwipeableItem, {UnderlayParams} from 'react-native-swipeable-item';
import Animated from 'react-native-reanimated';
import {Icon, Header, Divider, Card} from 'react-native-elements';
import styles from './style';
import {removeCat} from '../../redux/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

class CatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Cat: [],
      loading: false,
    };
  }

  itemRefs = new Map();

  editItem = item => {
    this.props.navigation.navigate('EditCat', {data: item});
  };

  deleteItem = item => {
    const updatedData = this.state.Cat.filter(d => d !== item);
    const RemovedData = this.state.Cat.filter(d => d == item);
    // Animate list to close gap when item is deleted
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.props.removeCat(item);
  };

  renderUnderlayLeft = ({item, percentOpen}: UnderlayParams<Item>) => (
    <Animated.View
      style={[styles.row, styles.underlayLeft, {opacity: percentOpen}]} // Fade in on open
    >
      <TouchableOpacity onPressOut={() => this.editItem(item)}>
        <Icon name="edit" size={30} color="#1E9EF8" />
      </TouchableOpacity>
    </Animated.View>
  );

  renderUnderlayRight = ({item, percentOpen}: UnderlayParams<Item>) => (
    <Animated.View
      style={[styles.row, styles.underlayRight, {opacity: percentOpen}]}>
      <TouchableOpacity onPressOut={() => this.deleteItem(item)}>
        <Icon name="delete-outline" size={30} color="red" />
      </TouchableOpacity>
    </Animated.View>
  );

  renderItem = ({item, index}: RenderItemParams<Item>) => {
    return (
      <SwipeableItem
        key={item.key}
        item={item}
        ref={ref => {
          if (ref && !this.itemRefs.get(item.key)) {
            this.itemRefs.set(item.key, ref);
          }
        }}
        onChange={({open}) => {
          if (open) {
            // Close all other open items
            [...this.itemRefs.entries()].forEach(([key, ref]) => {
              if (key !== item.key && ref) ref.close();
            });
          }
        }}
        overSwipe={20}
        renderUnderlayLeft={this.renderUnderlayLeft}
        renderUnderlayRight={this.renderUnderlayRight}
        snapPointsLeft={[50]}
        snapPointsRight={[50]}>
        <View style={styles.row}>
          <Card containerStyle={styles.CardStyle}>
            <View style={styles.CardStyle}>
              <Text style={styles.text}> Name : {item.Name}</Text>
              <Text style={styles.text}> Breed : {item.Breed}</Text>
              <Text style={styles.text}> Gender : {item.gender}</Text>
              <Text style={styles.text}> Weight : {item.weight}</Text>
              <Text style={styles.text}> Detail : {item.detail}</Text>
            </View>
          </Card>
        </View>
      </SwipeableItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AddCat');
              }}>
              <Icon
                name="add-circle-outline"
                type="IonIcon"
                color={'#fff'}
                size={30}
              />
            </TouchableOpacity>
          }
          centerComponent={<Text style={styles.Heading}>Cat List</Text>}
          containerStyle={{
            backgroundColor: '#1E9EF8',
           
          }}
        />
        <View style={{ flex: 1 }}>
        {this.props.cats && this.props.cats.length > 0 ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.props.cats}
            renderItem={this.renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            extraData={this.props}
          />
        ) : (
          <Text style={styles.NoDatatext}>
            Currently No Cat Found in this Device. Please Add Cat From Add Cat
            Page
          </Text>
        )}
        </View>
        {console.log("rootReducer ", this.props.cats)}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeCat: (id) => {
      dispatch(removeCat(id))
    }
  }
}

const mapStateToProps = state => {
  const { cats } = state.reducer
  return { cats }
};

export default connect(mapStateToProps, mapDispatchToProps)(CatList);
