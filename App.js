import React,{useEffect,useState} from "react";
import { View ,Text, ScrollView,TouchableOpacity,Modal,TextInput, ActivityIndicator } from "react-native";
import Card from "./src/Components/Card";
import DatePicker from 'react-native-date-picker'
import styles from "./src/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
const App=()=>{
  const [todoList,setTodoList]=useState([]);
  const [userID,setUserID]=useState(null);
  const [showModel,setShowModel]=useState(false);
  const [todoTitle,setTodoTitle]=useState(null);
  const [todoDesc,setTodoDesc]=useState(null);
  const [open, setOpen] = useState(false)
  const [addLoading,setAddLoading]=useState(false);
  const [deleteLoading,setDeleteLoading]=useState(false);
  const [updateLoading,seUpdateLoading]=useState(false);
  const [date, setDate] = useState(new Date())


  useEffect(()=>{
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('User_UID')
        if(value == null) {
          const uid = uuid.v4(); 
          await AsyncStorage.setItem('User_UID',uid);
        }
        else{
          getTodos(value)
          setUserID(value)
        }
      } catch(e) {
        console.log(e)
      }
    }
    getData();
  },[]);
  // 192.168.233.30
  const getTodos=(value)=>{

    fetch(`https://beast-todo-react.herokuapp.com/api/getTodo/${value}`,)
    .then(async(response) =>await response.json())
    .then((data) => {
      setTodoList(data.allTodos)
    });
  }

  const createNewTodo=()=>{
    if(addLoading)
      return;
    try {
      if(todoTitle===null)
        throw "Enter Todo Titile";
      if(todoDesc===null)
        throw "Enter Todo Description";
      if(date===null)
        throw "Select Date please";
      let todoData={
        Todo_Name:todoTitle,
        Todo_Descrition:todoDesc,
        Todo_Status:'Pending',
        createdAt:new Date(),
        dueTime:date,
        userID:userID
      }
      setAddLoading(true)
      fetch("https://beast-todo-react.herokuapp.com/api/create",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(todoData)
      })
      .then((res)=>res.json())
      .then((data)=>{
        getTodos(userID);
        setShowModel(false);
        alert("Task Added")
        setAddLoading(false);
      })
      .catch((err)=>console.log(err))
    } catch (error) {
        alert(error);
    }
  }

  const deleteTodo=(id)=>{
    if(addLoading)
      {
        console.log("d")
        return;
      }
    setDeleteLoading(true);
    fetch("https://beast-todo-react.herokuapp.com/api/deleteTodo",{
      method:"DELETE",
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({_id:id})
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert("Task Deleted")
        getTodos(userID)
        setDeleteLoading(false)
    })
    .catch((err)=>console.log(err))
  }

  const upateData=(id)=>{
    if(addLoading)
      return;
    fetch("https://beast-todo-react.herokuapp.com/api/updateTodo",{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({id:id})
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert("Task Completed");
        getTodos(userID);
    })
    .catch((err)=>console.log(err))
  }

  return(
    <View style={{flex:1,backgroundColor:"white",alignItems: 'center'}}>
      <View style={styles.mainTitle}>
        <Text style={{color:"#595B59",fontWeight:"bold",fontSize:30,}}>Know Your Work</Text>
      </View>
      <TouchableOpacity style={styles.buttonContaier}  onPress={()=>setShowModel(true)}> 
          <Text style={{color:"#595B59",fontWeight:"bold"}}>Create New</Text>
      </TouchableOpacity>
      {
        todoList.length===0?
        <Text style={{fontWeight:"bold",color:"black",marginTop:20}}>NO TODO</Text>:
        <ScrollView style={{flex:1,backgroundColor:"white",alignSelf:"center",marginVertical:30,}}>
          {
            
            todoList.map((item)=>(
              <Card
                key={item._id}
                item={item}
                deleteTodo={deleteTodo}
                upateData={upateData}
              />
            ))
          }
        </ScrollView>
      } 
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <Modal visible={showModel} animationType='slide' transparent={true}>
          <View style={styles.modeOuter}>
            <View style={styles.innnerModel}>
                <Text style={{fontWeight:'bold', fontSize:20}}>Type Something.....</Text>
                <TextInput
                    placeholder='What To Do'
                    placeholderTextColor={"black"}
                    style={styles.textInput}
                    onChangeText={(todoTitle)=>setTodoTitle(todoTitle)}
                />
                <TextInput
                    placeholder='Small Description'
                    placeholderTextColor={"black"}
                    style={styles.textInput}
                    onChangeText={(todoDesc)=>setTodoDesc(todoDesc)}
                />
                <TouchableOpacity style={styles.dateButton} onPress={() => setOpen(true)}>
                  <Text style={{color:"#595B59",fontWeight:"bold"}}>Set Due Date</Text>
                </TouchableOpacity>
                  <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={[styles.buttonBody,{backgroundColor:"rgba(249, 77, 51, 0.12)"}]} onPress={()=>setShowModel(false)} >
                        <Text style={{color:"#595B59",fontWeight:"bold"}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBody} onPress={()=>createNewTodo()}>
                      <Text style={{color:"#595B59",fontWeight:"bold"}}>Create</Text>
                    </TouchableOpacity>
                </View>
                {
                  addLoading?<ActivityIndicator size={30} color={"blue"}/>:null
                }
            </View>
          </View>
      </Modal>
    </View>
  )
}
export default App;