import React from 'react';
import {View, Text,TouchableOpacity, Image} from 'react-native';
import {Icon,Input,Button, Header} from 'react-native-elements';
import { updatCat } from '../../redux/actions';
import styles from './style';
import { connect } from 'react-redux';


class EditCat extends React.Component {
  constructor(props) {
    super(props);

    let data = this.props.route.params.data;

    this.state = {
        Cat: data,
        Name: data.Name,
        Breed: data.Breed,
        Weight: data.weight,
        Description: data.detail,
        Gender: data.gender,
        id: data.id,
        loading : false
    };
  }

  Edit=()=>{

    let obj = {
        Name: this.state.Name,
        Breed: this.state.Breed,
        weight: this.state.Weight,
        gender: this.state.Gender,
        detail: this.state.Description,
        id: this.state.id
      };
  
      this.setState({Cat: obj});
  
      this.props.updatCat(obj);
      this.props.navigation.goBack();
  }

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
          centerComponent={<Text style={styles.Heading}>Edit</Text>}
          containerStyle={{
            backgroundColor: '#1E9EF8',
           
          }}       />
           <View style={{marginTop : 10}}>
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
          title="Edit"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTextStyle}
          onPress={() => {
            this.Edit();
          }}
        />
      </View>
    );
  }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      updatCat: (id) => {
        dispatch(updatCat(id))
      }
    }
  }
  
  const mapStateToProps = state => {
    const { cats } = state.reducer
    return { cats }
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditCat);
