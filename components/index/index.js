import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {View, Text, Item, Label, Input, Button, Form, Header, Container, Content,
  Left, Right, Body, Icon, Title, Drawer, Thumbnail, Grid, Spinner,
   Card, CardItem} from 'native-base'
  import {Actions} from 'react-native-router-flux';
  import { connect } from 'react-redux'
import styles from '../styles';
import SideBar from './drawer'

class Main extends Component{
constructor(){
    super();
    this.state={
        search: true,
        data: true,
    }
}
// componentWillReceiveProps(props){
//   props.markerRegion({
//     // latitude: details.geometry.location.lat,
//     // longitude: details.geometry.location.lng,
//     details: this.props.place,
//     fetchDetails: true
//   })
// }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

place(data){
  console.log(data, "pushed")
// this.props.detail(data);
this.props.detail({
  data: data,
  bool: false,
})

// this.props.markerRegion({
//   // latitude: details.geometry.location.lat,
//   // longitude: details.geometry.location.lng,
//   details: [data],
//   fetchDetails: true
// })
Actions.place();
}
goToMap(){
  Actions.map()
}
  render() {
  return (
    // this.state.data ?
    <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<SideBar close={this.closeDrawer} 
      />}
      onClose={() => this.closeDrawer()} panOpenMask={.07} panCloseMask={.35}
    >
        <Container>
          {this.state.search ?
        
    <Header style={{backgroundColor: 'brown'}} androidStatusBarColor='#831414'>
    <Left>
      <Button transparent onPress={()=> this.openDrawer()}>
        <Icon name='menu' />
      </Button>
    </Left>
    <Body>
      <Title>{this.props.place.details && (this.props.place.details[0].types[0]).toUpperCase()}</Title>
    </Body>
    <Right>
          <Button rounded onPress={this.goToMap.bind(this)} style={{backgroundColor: 'maroon', zIndex: 10}}><Icon name="map"/>
          {/* <Text style={{fontSize: 8}}>Show All on map</Text> */}
              {/* <Thumbnail source={{uri: this.props.place[0].icon}} style={{height: 25, width: 25, opacity: 0.5}}/> */}
          </Button>
    </Right>
  </Header>
        :
        <Header searchBar rounded  style={{backgroundColor: 'brown'}} androidStatusBarColor='#831414'>
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
            {this.props.place.fetchDetails ?    
            <ScrollView style={{flex: 1, backgroundColor: '#BCAAA4'}}>
              <View style={styles.cardView}>
                {
                  this.props.place.details &&
                  this.props.place.details.map((data, i)=>{ 
                    // var image;
                    // if(data.photos){
                    //  image = data.photos[0].html_attributions[0].split('"');
                    // console.log(image[1], image)}
                    return(
                <TouchableOpacity key={data.id} style={styles.card} onPress={this.place.bind(this, data)}>
                  <Card style={styles.cards} >
                    <CardItem style={{}} header >
                      <Body>
                      <Text style={{color: 'brown', opacity: 0.8}}>
                      {data.name}
                    </Text>
                      </Body>
                    </CardItem>
                    <CardItem style={styles.cardItem} cardBody>
                      <Body>
                        <Text style={{fontSize: 11, marginLeft: 5}}>
                        {data.vicinity}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>)})
                }
              </View>
            </ScrollView>
            :
            <Spinner color="brown"/>}
          </Content>
        </Container>
    </Drawer>
    );
  }
}

const state = (state)=>{
  return {
    place: state.marker,
  }
}
const dispatch = (dispatch)=>{
  return {
    detail: (data)=>dispatch({type: "DETAIL", data: data}),  
    markerRegion: (region2)=> dispatch({type: "MARKER", region: region2}),
  }
}
export default connect(state, dispatch)(Main);