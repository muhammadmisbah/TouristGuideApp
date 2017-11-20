import React, { Component } from 'react';
import {Platform} from 'react-native';
import {
    View, Text, Item,
    Label, Input, Button,
    Form, Header, Container,
    Content, Title, Icon,
    Left, Body, Right, 
} from 'native-base'
import {Actions} from 'react-native-router-flux';
import styles from '../styles.js';
import { connect } from 'react-redux'
import { signup } from '../../redux/actions/actions'

class Signup extends Component{
constructor(){
    super();
    this.state={
        name: '',
        email: '',
        password: '',
    }
}
submit(){
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
 this.props.user(email, password, name);
// alert(email, password)
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
                <Title>Sign Up</Title>
            </Body>
            <Right></Right>
        </Header>
            <Content>
                <View style={styles.container}>
                    <Form style={styles.form}>
                        <Item floatingLabel>
                        <Icon name="person"/><Label style={{marginLeft:10, marginTop:9}}>Name</Label>
                            <Input autoCorrect={false} style={styles.input} autoCapitalize="words" onChange={(name)=>this.setState({name: name.nativeEvent.text})}/>
                        </Item>
                        <Item floatingLabel>
                        <Icon name="mail"/><Label style={{marginLeft:10, marginTop:9}}>Email</Label>
                            <Input keyboardType="email-address" autoCapitalize="none" 
                            autoCorrect={false} style={styles.input} onChange={(email)=>this.setState({email: email.nativeEvent.text})}/>
                        </Item>
                        <Item floatingLabel>
                        <Icon name="lock"/><Label style={{marginLeft:10, marginTop:9}}>Password</Label>
                            <Input secureTextEntry autoCorrect={false} style={styles.input}
                            onChange={(pas)=>this.setState({password: pas.nativeEvent.text})}/>
                        </Item>
                        <Button light style={styles.button} onPress={this.submit.bind(this)}>
                            <Text style={styles.btext}>Sign Up</Text>
                        </Button>
                        <Text style={{textAlign: 'center',}}><Text>If you already have an account:  </Text><Text onPress={()=>{Actions.signin()}} style={{color: 'blue'}}>Sign In</Text>
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
    return { user: (email, password, name)=> dispatch(signup(email, password, name))}
    };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);