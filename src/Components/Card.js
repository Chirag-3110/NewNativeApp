import React,{useEffect, useState} from 'react';
import {View,Text, Alert, ActivityIndicator, TouchableOpacity} from 'react-native'
import styles from '../styles';

const Card=(props)=>{ 
    let [upatedDate,setUpdated]=useState(null);
    useEffect(()=>{
        let newDate=props.item.dueTime.split("T");
        setUpdated(newDate[0])
    },[])
    const confirmDelete=(id)=>{
        if(props.item.Todo_Status==="Pending"){
            return Alert.alert(
                "Delete Todo",
                "Are you sure you wants to delete pending todo",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => props.deleteTodo(id) }
                ]
              );
        }
        else{
            props.deleteTodo(id)
        }
    }
    const CompleteTask=(id)=>{
        if(props.item.Todo_Status==="completed"){
            return Alert.alert(
                "Already Completed",
                "Your Task is already Competed",
                [
                  { text: "OK", onPress: () => console.log("Completet")}
                ]
              );
        }
        else{
            props.upateData(id)
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>{props.item.Todo_Name}</Text>
            <View style={styles.time_status}>
                <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{props.item.Todo_Descrition}</Text>
            </View>
            <View style={styles.time_status}>
                <Text style={new Date()>props.item.dueTime?{color:"red",fontWeight:"bold",fontSize:15}:{color:"black",fontWeight:"bold",fontSize:15}}>
                    {upatedDate}
                </Text>
                <View style={[
                    styles.statusText,
                    props.item.Todo_Status==="Pending"?{backgroundColor:"#F92929"}:{backgroundColor:"#4F9FFF"}
                ]}>
                    <Text style={{color:"white",fontWeight:"bold",fontSize:12}}>{props.item.Todo_Status}</Text>
                </View>
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={[styles.buttonBody,{backgroundColor:"rgba(249, 77, 51, 0.12)"}]}>
                    <Text style={{color:"#595B59",fontWeight:"bold"}} onPress={()=>confirmDelete(props.item._id)}>
                        Delete
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBody}>
                    <Text style={{color:"#595B59",fontWeight:"bold"}} onPress={()=>CompleteTask(props.item._id)}>Complete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Card;