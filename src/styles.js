import { StyleSheet,Dimensions } from "react-native";
const windowWidth=Dimensions.get('window').width;
const styles=StyleSheet.create({
  buttonContaier:{
    width:windowWidth-50,
    marginTop:30,
    backgroundColor:"rgba(249, 77, 51, 0.12)",
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    borderWidth:2,
    borderColor:"#F2D0A2"
  },
  dateButton:{
    width:windowWidth-80,
    backgroundColor:"rgba(249, 77, 51, 0.12)",
    height:windowWidth/9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
    borderWidth:1,
    borderColor:"#F2D0A2"
  },
  modeOuter:{
    backgroundColor:'#000000aa',
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  innnerModel:{
    backgroundColor:'white',
    height:windowWidth,
    borderRadius:30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width:windowWidth-20,
    paddingVertical:20
  },
  textInput:{
    width:windowWidth-80,
    height:windowWidth/9,
    borderColor:'rgba(249, 77, 51, 0.12)',
    borderWidth:1,
    borderRadius:4,
    paddingHorizontal:10,
    color:"black",
    marginTop:10
  },
  buttonBody:{
    width:windowWidth/3,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
    borderWidth:2,
    borderColor:"rgba(249, 77, 51, 0.12)",
    margin:10,
    alignSelf:"flex-end",
    borderTopLeftRadius:30,
  },
  container:{
    width:windowWidth-40,
    backgroundColor:"rgba(249, 77, 51, 0.12)",
    // padding:10,
    borderWidth:2,
    borderRadius:10,
    borderColor:"#FCE5CE",
    alignItems:"center",
    marginTop:20,
    marginBottom:20
  },
  time_status:{
    flexDirection:"row",
    width:'90%',
    justifyContent:"space-between",
    paddingHorizontal:10,
    alignItems: 'center',
    margin:5
  },
  titleText:{
    fontWeight:"bold",
    fontSize:30,
    fontStyle:"italic",
    width:'90%',
    margin:10,
    color:"black"
  },
  statusText:{
    // backgroundColor:"#F0B9AD",
    width:windowWidth/3.5,
    height:35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
  },
  buttonBody:{
    width:windowWidth/3,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
    borderWidth:2,
    borderColor:"rgba(249, 77, 51, 0.12)",
    margin:10,
    alignSelf:"flex-end",
    borderTopLeftRadius:30,
  },
  mainTitle:{
    width:windowWidth-20,
    height:70,
    backgroundColor:"rgba(249, 77, 51, 0.12)",
    marginTop:10,
    borderRadius:10,
    padding:10,
    textAlign:"center",
    justifyContent:"center"
  }
})
export default styles