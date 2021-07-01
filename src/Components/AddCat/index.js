import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Icon, Header, StatusBar, Input, Button} from 'react-native-elements';
import styles from './style';
import {addCat} from '../../redux/actions';
import {connect} from 'react-redux';

class AddCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Cat: '',
      Name: '',
      Breed: '',
      Weight: '',
      Description: '',
      Gender: '',
      loading: false,
    };
  }

  Add = () => {
    let obj = {
      Name: this.state.Name,
      Breed: this.state.Breed,
      weight: this.state.Weight,
      gender: this.state.Gender,
      detail: this.state.Description,
      id: this.props.cats.length + 1
    };

    this.setState({Cat: obj});

    this.props.addCat(obj);
    this.props.navigation.goBack()
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack(null);
              }}>
              <Icon
                name="keyboard-backspace"
                type="material-community"
                color={'#fff'}
                size={30}
              />
            </TouchableOpacity>
          }
          centerComponent={<Text style={styles.Heading}>Add Cat</Text>}
          containerStyle={{
            backgroundColor: '#1E9EF8',
           
          }}
        />
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Name</Text>
          <Input
            placeholder="Name"
            value={this.state.Name}
            onChangeText={text => {
              this.setState({Name: text});
            }}
          />
          <Text style={styles.text}>Breed</Text>
          <Input
            placeholder="Breed"
            value={this.state.Breed}
            onChangeText={text => {
              this.setState({Breed: text});
            }}
          />
          <Text style={styles.text}>Gender </Text>
          <Input
            placeholder="Gender"
            value={this.state.Gender}
            onChangeText={text => {
              this.setState({Gender: text});
            }}
          />
          <Text style={styles.text}>Weight (in KGs) </Text>
          <Input
            placeholder="Weight"
            value={this.state.Weight}
            onChangeText={text => {
              this.setState({Weight: text});
            }}
          />
          <Text style={styles.text}>Description</Text>
          <Input
            placeholder="Description"
            value={this.state.Description}
            onChangeText={text => {
              this.setState({Description: text});
            }}
          />
        </View>
        <Button
          title="Add Cat"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTextStyle}
          onPress={() => {
            this.Add();
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCat: data => dispatch( addCat(data)),
});

const mapStateToProps = state => {
  const { cats } = state.reducer
  return { cats }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCat);
