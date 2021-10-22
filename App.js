import React, { useState, useEffect } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components";
import AddInput from "./components/AddInput";
import TodoList from "./components/TodoList";
import Empty from "./components/Empty";
import Header from "./components/Header";
import firestore from '@react-native-firebase/firestore';

export default function App() {
  const [data, setData] = useState([]);

  async function handleSend(text001, date2564) {
    const text = text001;
    const date = date2564;
    firestore()
      .collection('todo')
      .add({
        todo: text,
        tododate: date,
        key: Math.random().toString()
      });
  }

  useEffect(() => {
    const taskListener = firestore()
      .collection('todo')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            todo_id: doc.id,
            todo: '',
            tododate: '',
            ...doc.data()
          };
        });
        setData(data);
      });
    return () => taskListener();
  }, []);

  const submitHandler = (value, date) => {
    setData((prevTodo) => {
      const date002 = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + parseInt(date.getFullYear() + 543);
      handleSend(value, date002);
      return [
        {
          value: value,
          date: date002,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  const deleteItem = (key) => {
    firestore()
      .collection('todo')
      .doc(key).delete()
      .catch((error) => console.log(error));
  };
  
  const searchItem = (keyword) => {
  }

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#00FF03" />
      </View>
      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header searchItem={searchItem} />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddInput submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: #00FF03;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;