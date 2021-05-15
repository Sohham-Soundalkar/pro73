import * as React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import db from '../config';

export default class ReadStoryrscreen extends React.Component{
    constructor(){
        super();
        this.state={
            allStories: []
        }
    }

    componentDidMount(){
        this.retrieveStories()
    }

    retrieveStories=()=>{
        try {
            var allStories = []
            var stories = db.collection("stories")
            .get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    allStories.push(doc.data())
                    console.log('This are the stories', allStories)
                })
                this.setState({allStories})
            })
        }
        catch(error){
            console.log(error);
        }
    };

  render(){
      return(
          <View>
              <FlatList
              data={this.state.allStories}
              renderItem={({ item }) => (
                  <View style={StyleSheet.itemContainer}>
                      <Text>Title: {item.title}</Text>
                      <Text>Author: {item.author}</Text>
                      <Text>Story: {item.storyText}</Text>
                  </View>   
              )}
              keyExtractor={(item, index) => index.toString()}
              />
          </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'pink',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    itemContainer: {
        height: 80,
        width: '100%',
        borderWidth: 2,
        borderColor: 'pink',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});