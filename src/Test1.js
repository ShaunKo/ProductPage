import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('window');
import {WebView} from 'react-native-webview';

export default class Test1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: '',
    };
  }
  getApi = () => {
    return fetch(
      'https://rapi.ruten.com.tw/api/items/v2/list?gno=22011336677547&level=detail',
    )
      .then((response) => response.json())
      .then((json) => {
        let resource = json.data.find(function (i, index, array) {
          return i;
        });
        let text2 = resource.text2
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/\r\n|\n/g, '')
          .trim();
        this.setState({api: text2});
        return resource;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.getApi();
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{html: this.state.api}}
          automaticallyAdjustContentInsets={false}
          domStorageEnabled={true}
          decelerationRate="normal"
          scrollEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 3665,
    padding: 5,
  },
});
