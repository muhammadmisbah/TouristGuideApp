import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Dimensions, BackHandler} from 'react-native';
import { Spinner, View, Text, Button, Icon, } from 'native-base';
import Polyline from '@mapbox/polyline';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height / 1.2,
    width: Dimensions.get('window').width,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class NativeMap extends React.Component {
  constructor(){
    super();
    this.state={
      direction: false,
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      myLocation: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      coords: [],
      polyline: false,
      marker: false,

    }
  }
  watchID;
  componentDidMount(){
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Need Location..!</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/> otherwise you won't be able to use this Application<br/>",
      ok: "OK",
      cancel: "Cancel",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true // false => Directly catch method is called if location services are turned off
  }).then(function(success) {
      // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
navigator.geolocation.getCurrentPosition(//success, error, options
(position)=>{
  // LocationServicesDialogBox.forceCloseDialog();  
  var latitude = Number(position.coords.latitude);
  var longitude = Number(position.coords.longitude);
var initialRegion = {
  latitude: latitude,
  longitude: longitude,
  latitudeDelta: 0.0422,
  longitudeDelta: 0.0321,
}
if(!this.props.searchMarker.fetchDetails){
  this.setState({
    region: initialRegion,      
    myLocation: initialRegion,
    coords: [],
    });
}
else{
this.setState({
  myLocation: initialRegion,
  coords: [],
});
}
this.props.place(initialRegion);
}, (error)=>{
  alert(JSON.stringify(error.message))
}, {enableHighAccuracy: false, timeout: 20000, maximumAge:1000});

this.watchID = navigator.geolocation.watchPosition(//success, error, options
  (position)=>{
    var latitude = Number(position.coords.latitude);
    var longitude = Number(position.coords.longitude);
  var initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
  if(!this.props.searchMarker.fetchDetails){
    this.setState({
      // region: initialRegion,
      myLocation: initialRegion,
      coords: [],     
    })
  }
else{
  this.setState({
    myLocation: initialRegion,
    coords: [],
  });}

  this.props.place(initialRegion);
  console.log(this.watchID);
  }, (error)=>{
  }, 
    {enableHighAccuracy: false, timeout: 20000, maximumAge:1000})
      }.bind(this)
  ).catch((error) => {
      // this.props.user()
      Actions.pop()
      console.log(error.message);
  });
  
  BackHandler.addEventListener('hardwareBackPress', () => {
         LocationServicesDialogBox.forceCloseDialog();
  });
}
componentWillMount(){
  navigator.geolocation.clearWatch(this.watchID);
}
componentWillReceiveProps(props){
  console.log(props.searchMarker.details)
  this.setState({
    myLocation: props.location,
    direction: false,
  })
  if(props.searchMarker.details){
  this.setState({
    region: {
      latitude: props.searchMarker.details[0].geometry.location.lat,
      longitude: props.searchMarker.details[0].geometry.location.lng,
      /////
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    polyline: false,
    marker: true,
  })}
}
async getDirection(sLoc, eLoc){
  console.log(sLoc, eLoc);
  try {
    let key = 'AIzaSyBd7TZVgjJKgp-Swtz807nNuaW4IG8fGEk'
    let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${sLoc}&destination=${eLoc}&key=AIzaSyBd7TZVgjJKgp-Swtz807nNuaW4IG8fGEk`)
    console.log(resp, "resp")
    let respJson = await resp.json();
    console.log(respJson, "respJson")
    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    console.log(points, "points")
    let coords = points.map((point, index) => {
        return {
            latitude: point[0],
            longitude: point[1]
        }
    })
    console.log(coords, "coordss")
    this.setState({ 
      coords: coords,
      region: this.state.myLocation,
      polyline: true,
     })
    return coords
} catch (error) {
    return (error) => { console.log(error, 'error error error') }
}
}
direction(place){
  
var sLoc = this.state.myLocation.latitude + "," + this.state.myLocation.longitude;
var eLoc = this.state.direction.lat + "," + this.state.direction.lng//place.lat + "," + place.lng;

this.getDirection(sLoc, eLoc); 
}
detail(data){
    // this.props.marker({        
    //   details: data,
    //   fetchDetails: true,
    // }); 
    this.props.detail({
      data: data,
      bool: false,
    })

    Actions.place()
}
// mark(location){
// this.setState({direction: location})
// }
  render() {
    // const { region } = this.props;
    return (
      this.state.region.latitude ?
        <View style ={styles.container}>
        <MapView style ={styles.map}
      region={this.state.region}
      showsMyLocationButton
            mapType="standard"
            zoomEnabled={true}
            pitchEnabled={true}
            showsUserLocation={true}
            followsUserLocation={true}
            showsCompass={true}
            showsBuildings={true}
            showsTraffic={true}
            showsIndoors={true}
    >
   {this.props.searchMarker.fetchDetails && 
   this.state.marker &&
   this.props.searchMarker.details.map((data, i) =>{
     var location = data.geometry.location;
    return ( 
   <MapView.Marker key={location.lat} //onPress={//this.mark.bind(this, location)
    //()=>{this.setState({direction: location})}
   //}
   onPress={(e) => {e.stopPropagation(); this.setState({direction: location})}}
      coordinate={{
        latitude: data.geometry.location.lat,
        longitude: data.geometry.location.lng,
      }}
      >
        <MapView.Callout onPress={this.detail.bind(this, data)}>
    <View>
      {/* <WebView source={{uri: 'https://...'}} style={{height: 200, width: 200}} /> */}
      <Text style={{fontSize: 18}}>{data.name}</Text>
      <Text style={{fontSize: 12, color: 'blue'}}>Tap to get more info</Text>
      {/* <Text>Long Press on marker to get option of Direction</Text>      */}
      {/* <Button onPress={this.direction.bind(this, data.geometry.location)} 
        style={{flexDirection: 'column',
          borderRadius: 100, height: 55,
          width: 65, 
        }}>
        <Icon name="ios-arrow-dropright-circle"/> 
        <Text>GO</Text>
      </Button> */}
    </View>
  </MapView.Callout>
      </MapView.Marker>
      )})
      }
      {this.state.polyline &&
      <MapView.Polyline 
        coordinates={this.state.coords}
        strokeWidth={7}
        strokeColor='#1E88E5'/>}
    </MapView>
    <View style={{zIndex: 2, marginBottom: Dimensions.get('window').height / 58,
     marginLeft: (Dimensions.get('window').width / 1.9) * 1.6, //height: Dimensions.get('window').height/5.7, //backgroundColor: 'red',
     width: Dimensions.get('window').width / 5, justifyContent: 'center', paddingLeft: 4}}>
    <Button onPress={()=> this.setState({region: this.state.myLocation})} 
      style={{flexDirection: 'column',
        borderRadius: 100, height: 38, marginLeft: 10, marginBottom: 2,
        width: 48,
      }}>
      <Icon name="md-pin" //style={{alignSelf: 'center'}}
      />
    </Button>
     {this.state.direction &&//this.props.dir &&  
      <Button onPress={this.direction.bind(this, this.props.searchMarker.details[0].geometry.location)} 
        style={{flexDirection: 'column',
          borderRadius: 100, height: 55,
          width: 65, marginTop: 4,
        }}>
        <Icon name="ios-arrow-dropright-circle"/> 
        <Text>GO</Text>
      </Button>}
    </View>
    
      </View>
      : 
      <View //style={{marginTop: Dimensions.get('window').height / 2,}}
      >
        <Spinner color="brown"/>
        <Text style={{alignSelf: 'center'}}>Searching...</Text>
      </View>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    user: state.user.user,
    location: state.places.current,
    searchMarker: state.marker
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
    detail: (data)=>dispatch({type: "DETAIL", data: data}),
    place: (current)=> dispatch({type: 'LOCATION', current: current}),
    marker: (marker)=> dispatch({type: "MARKER", region: marker})
    // user: ()=> dispatch(signout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NativeMap);