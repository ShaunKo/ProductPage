import React, {Component} from 'react';
import {View, Text,Image,ScrollView,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
export const {width, height} = Dimensions.get('window');
import Lightbox from 'react-native-lightbox';
import { WebView } from 'react-native-webview';
import {Product1} from './Data.js';
export default class Test1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: ['分類', '庫存數', '上架時間', '使用狀況', '所在地'],
    };
  }

  render() {
    return (
      <View style={{flexDirection:'row'}}>
      <View style={{width: width/3}}>
        {['分類', '庫存數', '上架時間', '使用狀況', '所在地'].map((item) => {
          return(
            <View style={{backgroundColor:'grey'}}>
          <Text style={{fontSize:20,padding:10}}>{item}</Text>
          </View>
          )
        })}
      </View>
      <View style={{width: width/2}}>
        {/*改值*/}
      {this.state.image.map((item) => {
        return(
        <Text style={{fontSize:20,padding:10}}>{item}</Text>
        )
      })}
    </View>
    </View>
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

