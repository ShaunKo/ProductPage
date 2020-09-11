import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
export const {width, height} = Dimensions.get('window');
import {WebView} from 'react-native-webview';

export default class Web extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{html: this.props.text2}}
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
    height: 3865,
    padding: 5,
  },
});
