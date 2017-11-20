import React, { Component } from 'react';
import {Platform, Linking} from 'react-native';
import {
    View, Text, Item,
    Label, Input, Button,
    Form, Header, Container,
    Content, Left, Right,
    Body, Icon, Title,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import styles from '../styles.js';
import { connect } from 'react-redux'
import { signin } from '../../redux/actions/actions'

class SignIn extends Component{
    constructor(){
        super();
        this.state={
            email: '',
            password: '',
        }
    }

render(){
    return(
        <Container>
            <Header style={{backgroundColor: 'brown'}} androidStatusBarColor='#831414'>
                <Left>
                    <Button transparent onPress={()=>Actions.pop()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Sign In</Title>
                </Body>
                <Right></Right>
            </Header>
            <Content>
                <View style={styles.container}>
                    <Form style={styles.form}>
                        <Item floatingLabel>
                            <Icon name="mail"/><Label style={{marginLeft:10, marginTop:9}}>Email</Label>
                            <Input keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={styles.input}  onChange={(email)=>{this.setState({email: email.nativeEvent.text})}}/>
                        </Item>
                        <Item floatingLabel>
                            <Icon name="lock"/><Label style={{marginLeft:10, marginTop:9}}>Password</Label>
                            <Input secureTextEntry autoCorrect={false} style={styles.input} onChange={(pas)=>{this.setState({password: pas.nativeEvent.text})}}/>
                        </Item>
                        <Button style={styles.button} onPress={()=> this.props.user(this.state.email, this.state.password)}>
                            <Text style={styles.btext}>Sign In</Text>
                        </Button>
                        <Text style={{color: 'blue', alignSelf: 'center'}}
                                onPress={() => Actions.signup()}>
                           To Create an account
                        </Text>
                    </Form>
                </View>
            </Content>
        </Container>
    );
}
}
const mapStateToProps = (state)=>{
    return{ state: state.user}
};
const mapDispatchToProps = (dispatch)=>{
    return { user: (email, password)=> dispatch(signin(email, password))}
    };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);