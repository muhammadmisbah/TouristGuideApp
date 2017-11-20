import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
  } from 'react-native';import {View, Text, Item, Label, Input, Button, Form, Header, Container, Content,
    Left, Right, Body, Icon, Title, Drawer, Thumbnail, Grid,
     Card, CardItem} from 'native-base';
import {Actions} from 'react-native-router-flux';
import styles from '../styles.js';
import { connect } from 'react-redux';
import SideBar from './drawer'

class Place extends React.Component{
    constructor(){
        super();
        this.state={
            search: true,
        }
    }

    closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
        this.drawer._root.open()
      };

    place(data){
      // let arr = []
      // arr.push(data);
      // console.log(data, "dataaaaaaa")
      this.props.detail({
        data: data.data,
        bool: true,
      })
    
      this.props.marker({        
        details: [data.data],
        fetchDetails: true,
      })
      Actions.map();
    }
    render(){
        return(
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBar close={this.closeDrawer}/>}
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
      <Title>Place Info</Title>
    </Body>
    <Right>
          <Thumbnail source={{uri: this.props.data.data && this.props.data.data.icon}} style={{height: 25, width: 25, opacity: 0.5}}/>
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
                  {this.props.data.data &&
                    <View>
                    <Card>
                    <CardItem>
                      <Body>
                      <View><Text style={{fontSize: 22}}>{this.props.data.data.name}</Text></View>
                      
                      <View><Text style={{fontSize: 14}}>
                          {this.props.data.data.vicinity}
                          </Text></View>

                      <View><Text style={{fontSize: 14}}>
                      Types: {this.props.data.data.types && this.props.data.data.types.map((data, i)=>{return(<Text key={i} style={{fontSize: 14}}>{data + '| '}</Text>)})}
                      </Text></View>
                      
                      <View><Text style={{fontSize: 14}}>
                     Current Availablity Status: {this.props.data.data.opening_hours && this.props.data.data.opening_hours.open_now ?  'Open' : 'Close'}
                      </Text></View>

                      <View><Text style={{fontSize: 14}}>
                      Rating: {this.props.data.data.rating ? this.props.data.data.rating : 'There is no record' }
                      </Text></View>
                          <Button transparent onPress={this.place.bind(this, this.props.data)} style={{width: Dimensions.get('window').width/3.3, marginTop: 10}}>
                          <Icon name='md-pin'/><Text>Pin on Map</Text></Button>

                      </Body>
                    </CardItem>
                  </Card>
                    </View>}
                </Content>
              </Container>
            </Drawer>
                
                
        );
    }
}

const state = (state)=>{
  return {
    place: state.places.places,
    data: state.places.detail
    // data: state.marker.details
  }
}
const dispatch = (dispatch)=>{
  return {
    marker: (marker)=> dispatch({type: "MARKER", region: marker}),
    detail: (mark)=> dispatch({type: "DETAIL", data: mark})
  }
}

export default connect(state, dispatch)(Place);