/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  View,
  TouchableOpacity
} from 'react-native';
import axios from 'axios'

const tempData = [{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  }]

const addLike = (likes = 0, id) => {
  const nextLikes = {}
  nextLikes[id] = likes + 1
  console.log(likes)
  return nextLikes
}

const RenderItem = ({item: {id, title}, likes, setLike}) => (
  <View style={styles.postBox}>
    <Text>{id}</Text>
    <Text>{title}</Text>
    <TouchableOpacity style={styles.divider} onPress={() => setLike({...likes, ...addLike(likes[id], id)})}>
      <Text>Like it!</Text>
      <Text>{`${likes[id] || 0} likes`}</Text>
    </TouchableOpacity>
  </View>
)

const App: () => Node = () => {
  const [likes, setLike] = useState({})
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setpageSize] = useState(15)
  
  useEffect(() => {
    const url = `http://localhost:3000/feed?offset=${page*pageSize}&limit=${(page * pageSize) + pageSize}`
    axios.get(url)
      .then(res => setPosts([...posts, ...res.data]))
      .catch(err => console.log('err ', err))
    
  }, [page])
  

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={'light-content'} />
      <FlatList
        data={posts}
        renderItem={({item}) => <RenderItem item={item} likes={likes} setLike={setLike}/>}
        keyExtractor={ item => item.id}
        onEndReached={() => setPage(page+1)}
        ListFooterComponent={ () => <ActivityIndicator/>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#FCFCFC'
  },
  postBox:{
    borderWidth: 1,
    borderColor: '#3C3C3C',
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10
  },
  divider: {
    margin: 5,
    paddingTop: 5, 
    borderTopWidth: 1,
    borderTopColor: '#0F0F0F'
  }
});

export default App;
