import React, { Component } from 'react';
import {Platform, Linking, TouchableOpacity} from 'react-native';
import {
    View, Text, Item,
    Label, Input, Button,
    Form, Header, Container,
    Content, Left, Right,
    Body, Icon, Title, Thumbnail, List, ListItem, Separator,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import styles from '../styles.js';
import { connect } from 'react-redux';
import { signout } from '../../redux/actions/actions'

class SideBar extends Component{

async places(place){
  this.props.close();
  this.props.claer();
 let current = this.props.places.current;
 let loc = current.latitude + ',' + current.longitude
console.log(loc, place);
Actions.index();
try {
  let key = 'AIzaSyBd7TZVgjJKgp-Swtz807nNuaW4IG8fGEk'
  let resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc}&radius=2000&type=${place}&key=AIzaSyCSDc8XUj2qEpzcStMWgHQVUpXel_v4kOg`)
  let respJson = await resp.json();
  let result = respJson.results
  console.log(result, "result of getNearByPlaces")

  this.props.detail({
    data: null,
    bool: false,
  });

  this.props.marker({
    // latitude: data.geometry.location.lat,
    // longitude: data.geometry.location.lng,
    details: result,
    fetchDetails: true
  });
  // Actions.index({true: true});

} catch (error) {
  return (error) => { alert("Wait for getting your location")}
}
}
signOut(){
  this.props.user()
}

  render() {
    return (
        <Container style={{backgroundColor: 'white'}}>
        <Header style={{backgroundColor: 'maroon', height: 130,}} androidStatusBarColor='#831414'>
            <Left>
            <Thumbnail source={{uri: 'https://i2.wp.com/www.mesrobian.org/wp-content/uploads/2016/10/Avatar-Male.png?resize=180%2C180'}}/>
            </Left>
            <Body>
                <Title>{this.props.state.user.displayName}</Title>
                <Text style={{color: 'white', fontSize: 13, opacity: 0.5,}}>{this.props.state.user.email}</Text>
            </Body>
        </Header>
        <Content>
            <List>
            <Separator bordered>
            <Text>Search Nearby</Text>
          </Separator>
            <ListItem icon onPress={this.places.bind(this, 'restaurant')}>
              <Body>
                <Text>Restuarant</Text>
              </Body>
              <Right>
                <Icon name="md-restaurant" />
              </Right>
            </ListItem>
            <ListItem icon onPress={this.places.bind(this, 'cafe')}>
              <Body>
                <Text>Cafe</Text>
              </Body>
              <Right>
                <Icon name="ios-cafe" />
              </Right>
            </ListItem>
            <ListItem icon onPress={this.places.bind(this, 'hospital')}>
              <Body>
                <Text>Hospitals</Text>
              </Body>
              <Right>
              <Icon name="md-medkit" />
              </Right>
            </ListItem>
            <ListItem icon onPress={this.places.bind(this, 'gas_station')}>
              <Body>
                <Text>Gas Stations</Text>
              </Body>
              <Right>
              <Icon name="ios-car" />
              </Right>
            </ListItem>
            <ListItem icon onPress={this.places.bind(this, 'bank')}>
              <Body>
                <Text>Banks</Text>
              </Body>
              <Right>
              <Icon name="ios-cash" />
              </Right>
            </ListItem>
            <ListItem icon onPress={this.places.bind(this, 'grocery_or_supermarket')}>
              <Body>
                <Text>Groceries</Text>
              </Body>
              <Right>
              <Icon name="ios-shirt" />
              </Right>
            </ListItem>
            <ListItem icon onPress={this.places.bind(this, 'school')}>
              {/* <Left>
              </Left> */}
              <Body>
                <Text>Schools</Text>
              </Body>
              <Right>
              <Icon name="ios-school" />
              </Right>
            </ListItem>
            <ListItem icon onPress={this.places.bind(this, 'rasturant')}>
              <Body>
                <Text>Locality</Text>
              </Body>
              <Right>
                <Icon name="md-pin" />
              </Right>
            </ListItem>
<TouchableOpacity onPress={this.signOut.bind(this)} >            
<Separator>
            <Button style={{height: 20,}} transparent>
                <Text>Sign Out</Text>
                <Icon name="ios-log-out" />
            </Button>

</Separator>
</TouchableOpacity>
          </List>
        </Content>
    </Container>
    );
  }
}
const mapStateToProps = (state)=>{
    return{ 
      state: state.user,
      places: state.places,
    }
};
const mapDispatchToProps = (dispatch)=>{
    return { 
      user: ()=> dispatch(signout()),
      marker: (places)=> dispatch({type: 'MARKER', region: places}),
      claer: ()=> dispatch({type: "CLAER"}),
      clearMarker: ()=> dispatch(
        {   type: "MARKER", 
            region: {
                latitude: null,
                longitude: null,
                fetchDetails: false,
                }
        }       
    ),
    detail: (mark)=> dispatch({type: "DETAIL", data: mark}),
    }
    };

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);