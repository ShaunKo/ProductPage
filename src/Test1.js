import React, {Component} from 'react';
import {View, Text,Image,ScrollView,StyleSheet,Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('window');
import Lightbox from 'react-native-lightbox';
export default class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      image:  ["https://img.ruten.com.tw/s1/a/2b/c9/21916979988425_917.jpg", "https://img.ruten.com.tw/s1/a/2b/c9/21916979988425_959.jpg", "https://img.ruten.com.tw/s1/a/2b/c9/21916979988425_393.jpg", "https://img.ruten.com.tw/s1/a/2b/c9/21916979988425_410.jpg", "https://img.ruten.com.tw/s1/a/2b/c9/21916979988425_129.jpg", "https://img.ruten.com.tw/s1/a/2b/c9/21916979988425_878.jpg", "https://img.ruten.com.tw/s1/a/2b/c9/21916979988425_397.jpg", "https://img.ruten.com.tw/s1/a/2b/c9/21916979988425_643.jpg"],
    };
  }
  render() {
    return (
      
      <ScrollView
      horizontal={true}
  >
    
    {this.state.image.map((i)=>{
      return(
        <Lightbox>
      <View style={styles.container}>
          <Image
              style={styles.pictureSize}
              source={{uri:(i)}}
          /> 
      </View>  
       </Lightbox> 
      )     
      })}
      
       {/* <View style={styles.container}>    
          <Image
              style={styles.pictureSize}
              source={require('./picture/flower.jpg')}
          /> 
          <Text style={styles.fontSize24}>Flower Picture</Text>    
      </View>    
      <View style={styles.container}>    
          <Image
              style={styles.pictureSize}
              source={require('./picture/moon.jpg')}
          /> 
          <Text style={styles.fontSize24}>Moon Picture</Text>    
      </View>    
      <View style={styles.container}>
          <Image
              style={styles.pictureSize}
              source={require('./picture/mountain.jpg')}
          /> 
          <Text style={styles.fontSize24}>Mountain Picture</Text>    
      </View>             */}
  </ScrollView> 
    );
  }
}

const styles = StyleSheet.create({
  /*
    父類別flex:1充滿整個空間  
    justifyContent: 'center' 佈局對齊方式:中間
    alignItems: 'center' 項目對齊方式:中間
  */    
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
  },
  /*
    設置圖片大小
  */  
  pictureSize: {   
    width: width, 
    height: 230
  },
  /*
    字形大小
  */  
  fontSize24: {   
    fontSize: 24
  }  
});

