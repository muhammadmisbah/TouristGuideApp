import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: '#3498db',
      // padding: 20,
    },
    fcontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     backgroundColor: '#E0E0E0',
      // padding: 20,
   },
   bg:{
flex: 1,
justifyContent: 'center',
position: "relative",
resizeMode: "cover",
aspectRatio: 0.622,

},
    button:{
      backgroundColor: 'brown',
      width: Dimensions.get('window').width / 3.3,
      height: 55,
      borderRadius: 5,
      justifyContent: 'center',
      alignSelf: 'center',
    //  padding: 12,
    //  paddingLeft: 17,
    //  marginHorizontal: 140,
     marginVertical: 17,
    },
    fbutton:{
      backgroundColor: 'brown',
      width: Dimensions.get('window').width / 3.3,
      height: 55,
      borderRadius: 5,
      justifyContent: 'center'
      // padding: 12,
      // paddingLeft: 17,
     },
    ftext:{
      color: 'brown',
      textAlignVertical: 'center',
      marginRight: 20,
      marginLeft: 20,
    },
    text: {
      color: '#fff',
    },
    btext:{
      color: '#fff',
     textAlign: 'center',
    textAlignVertical: 'center',
    },
    first:{
      flex : 0.42,
      marginTop: Dimensions.get('window').height / 3.8,
      flexDirection: 'row',
      width: Dimensions.get('window').width / 1.16,
      paddingTop: 2,
      // backgroundColor: 'red',
      justifyContent: 'center'

      // paddingLeft: 27,
    },
    input:{
        marginBottom: 20,
    },
    form:{
        // backgroundColor: 'red',
        marginTop: Dimensions.get('window').height / 4.5,
        // padding: 0,
        width: Dimensions.get('window').width / 1.05,
        // justifyContent: 'center',
        // marginVertical: Dimensions.get('window').height / 4.5,
    },
    
  card:{
    // margin: 2,
    marginHorizontal: 2,
    width: Dimensions.get('window').width / 2 - 7,
    height: 200,
    },
  cards:{
    height: Dimensions.get('window').height - 100,
  },
  cardItem:{
    width: Dimensions.get('window').width / 2 -11.2,
    // width: 160,
    height: 170,
    flex: 1,
  },
  cardView:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  });

export default styles;