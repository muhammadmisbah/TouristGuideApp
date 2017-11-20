import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    BackHandler
  } from 'react-native';import {View, Text, Item, Label, Input, Button, Form, Header, Container, Content,
    Left, Right, Body, Icon, Title, Drawer, Thumbnail, Grid, Spinner,
     Card, CardItem} from 'native-base';
import {Actions} from 'react-native-router-flux';
import styles from '../styles.js';
import { connect } from 'react-redux';
import SideBar from './drawer';
import NativeMap from './nativeMap';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

BackHandler.addEventListener('click', () => {
   false//LocationServicesDialogBox.forceCloseDialog();
});
class GMap extends React.Component{
    constructor(){
        super();
        this.state={
            search: true,
        }
    }
    componentDidMount(){
      var data = this.props.detail;
      console.log(data, 'marker')
      if(data.bool){
     setTimeout(()=>{
      this.props.markerRegion({
        // latitude: data.geometry.location.lat,
        // longitude: data.geometry.location.lng,
        details: [data.data],
        fetchDetails: true
      })}, 1000)}
    }
      closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
        this.drawer._root.open()
      };
      render() {
      return (
        this.props.state.data ?
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar close={this.closeDrawer}/>}
          onClose={this.closeDrawer.bind(this)} panOpenMask={.07} panCloseMask={.3}
        >
        <Container>
              {this.state.search ?
            
        <Header style={{backgroundColor: 'brown'}} androidStatusBarColor='#831414'>
        <Left>
          <Button transparent onPress={this.openDrawer.bind(this)}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Map</Title>
        </Body>
        <Right>
        </Right>
      </Header>
            :
            <Header searchBar rounded style={{backgroundColor: 'brown'}} androidStatusBarColor='#831414'>
              <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" autoFocus/>
                <Button transparent onPress={()=>{this.setState({search: true})}}>
                    <Icon name="close" />
                </Button>
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Header>
            }
              <Content>

<GooglePlacesAutocomplete
  placeholder='Enter Location'
  minLength={2}
  autoFocus={false}
  returnKeyType={'default'}
  fetchDetails={true}
  onPress={(data, details = null) => {
    var arr = [];
    arr.push(details)
    // this.setState({
    //   data: arr,
    // })
      this.props.markerRegion({
        // latitude: details.geometry.location.lat,
        // longitude: details.geometry.location.lng,
        details: arr,
        fetchDetails: true,
      })
    console.log(data);
    console.log(details);
  }}
  styles={{
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth:0
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16
    },
    predefinedPlacesDescription: {
      color: '#1faadb'
    },
  }}
   query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBd7TZVgjJKgp-Swtz807nNuaW4IG8fGEk',
        language: 'en', // language of the results
        types: 'establishment' // default: 'geocode'
      }}
  //currentLocation={false}
/>

                  <NativeMap/>
          </Content>
        </Container>
      </Drawer>
       :
    <View style={{marginTop: Dimensions.get('window').height / 2.4,}}>
     <Spinner color="brown" size='large'/>
      <Text style={{alignSelf: 'center'}}>Loading for your data..</Text>
    </View>
    );
    }
    }

const mapStateToProps = (state)=>{
    return {
      state: state.user,
      detail: state.places.detail,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return { 
      user: (email, password, name)=> dispatch(signup(email, password, name)),
      markerRegion: (region2)=> dispatch({type: "MARKER", region: region2}),
    }
    };
export default connect(mapStateToProps, mapDispatchToProps)(GMap);