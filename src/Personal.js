import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {Product, Product1} from './Data.js';

export const {width, height} = Dimensions.get('window');

export default class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      cutString: '',
      dropdown: false,
      api: '',
      deliver_days: '',
      im_response_time_hours: '',
      last_activity_time: '',
    };
  }
  getApi = () => {
    return fetch('https://rapi.ruten.com.tw/api/users/v1/fff4132000/storeinfo')
      .then((response) => response.json())
      .then((json) => {
        let resource = json.data;
        let cutString = resource.board_intro.substring(0, 74);
        let deliver_days = resource.deliver_days < 1 ? '一日內' : '一日後';
        let im_response_time_hours =
          resource.im_response_time_hours < 12 ? '半日內回' : '半日後回';
        let now = Date.now();
        let last_activity_time =
          new Date(resource.last_activity_time - now).getHours() + 1;
        this.setState({
          api: resource,
          cutString,
          deliver_days,
          im_response_time_hours,
          last_activity_time,
        });
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    this.getApi();
  }
  touchableGroup = (title, data) => {
    return (
      <TouchableOpacity style={styles.touchableGroupContainer}>
        <Text style={styles.touchableGroupTitle}>{title}</Text>
        <Text style={styles.touchableGroupData}>{data}</Text>
      </TouchableOpacity>
    );
  };
  touchableSeparator = () => {
    return <View style={styles.touchableGroupSeparator} />;
  };
  columnSeparator = () => {
    return <View style={styles.columnSeparator} />;
  };
  //下滑給背景
  _getHeaderBackgroundColor = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 140],
      outputRange: ['transparent', 'orange'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };
  //下滑icon出現
  _getHeaderTitleOpacity = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 20, 50],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };
  _getHeaderTitleOpacityDisappear = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 20, 50],
      outputRange: [1, 0.5, 0],
      useNativeDriver: true,
    });
  };
  //精選商品
  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.goodsContainer}>
        <Image
          style={styles.goodsImage}
          source={{
            uri: item.uri,
          }}
        />
        <Text style={styles.goodsTitle}>{item.title}</Text>
        <Text style={styles.goodsPrice}>${item.price}</Text>
      </TouchableOpacity>
    );
  };
  footerButton = (icon, text) => {
    return (
      <TouchableOpacity style={styles.footerButton} onPress={() => {}}>
        <Icon name={icon} />
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };
  animate = () => {
    return (
      <Animated.Text
        style={[
          {
            opacity: this._getHeaderTitleOpacity(),
            backgroundColor: this._getHeaderBackgroundColor(),
          },
          styles.animatecShowContainer,
        ]}>
        <Icon
          name="chevron-left"
          color="white"
          style={styles.animatedShowIcon}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={styles.paddingTop35}>
          <View style={styles.animatedShowSearchContainer}>
            <TextInput
              multiline={false}
              placeholder="搜尋"
              style={styles.animatedShowInput}
            />
            <Icon
              name="search"
              color="grey"
              style={styles.animatedShowSearchIcon}
            />
          </View>
        </View>
        <Icon
          name="shopping-cart"
          color="white"
          style={styles.animatedShowIcon}
        />
        <Icon name="more-vert" color="white" style={styles.animatedShowIcon} />
      </Animated.Text>
    );
  };
  render() {
    const allData = this.state.api;
    return (
      <View style={{width: width, height: height}}>
        {this.animate()}
        <Animated.ScrollView
          style={styles.containerBackgroundColor}
          ref={(c) => {
            this.scroll = c;
          }}
          overScrollMode={'never'}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this.state.scrollY}},
              },
            ],
            {useNativeDriver: false},
          )}>
          <ImageBackground
            style={styles.imageBackground}
            source={{uri: allData.store_bg_img}}>
            <Animated.View
              style={[
                {opacity: this._getHeaderTitleOpacityDisappear()},
                styles.animatedDisappearContainer,
              ]}>
              <Icon
                name="chevron-left"
                style={styles.animatedShowIcon}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
              <View style={styles.paddingTop35}>
                <View style={styles.animatedDisappearSearchContainer}>
                  <TextInput
                    multiline={false}
                    placeholder="搜尋"
                    style={styles.animatedDisappearInput}
                  />
                  <Icon
                    name="search"
                    style={styles.animatedDisappearSearchIcon}
                  />
                </View>
              </View>
              <Icon name="shopping-cart" style={styles.animatedShowIcon} />
              <Icon name="more-vert" style={styles.animatedShowIcon} />
            </Animated.View>
            <View style={styles.row}>
              <Avatar
                size="large"
                icon={{name: 'user', type: 'font-awesome'}}
                rounded
                onPress={() => console.log('Works!')}
                containerStyle={styles.avatar}
              />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{allData.store_name}</Text>
                <View style={styles.row}>
                  <Text style={styles.padding5}>
                    {this.state.last_activity_time}小時前上線
                  </Text>
                  <View style={styles.twoButtonContainer}>
                    <TouchableOpacity style={styles.twoButtonTouch}>
                      <Icon
                        name="favorite-border"
                        size={15}
                        style={styles.padding5}
                      />
                      <Text style={styles.twoButtonText}>關注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.twoButtonTouch}>
                      <Icon name="comment" size={15} style={styles.padding5} />
                      <Text style={styles.twoButtonText}>露露通</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.touchableGroupContentContainer}>
              <TouchableOpacity
                style={styles.touchableGroupContainerFirstButton}>
                <Text style={styles.touchableGroupTitle}>評價</Text>
                <View style={styles.row}>
                  {[0, 1, 2, 3, 4].map(() => {
                    return <Icon name="star" color="orange" size={15} />;
                  })}
                </View>
                <Text style={styles.colorRed}>{allData.credit_cnt}</Text>
              </TouchableOpacity>
              {this.touchableSeparator()}
              {this.touchableGroup('商品數', allData.items_cnt)}
              {this.touchableSeparator()}
              {this.touchableGroup('露露通', this.state.im_response_time_hours)}
              {this.touchableSeparator()}
              {this.touchableGroup('出貨天數', this.state.deliver_days)}
            </View>
          </ImageBackground>
          <View
            style={[
              styles.boardContainer,
              this.state.dropdown ? styles.height150 : styles.height90,
            ]}>
            <Text style={styles.boardTitle}>賣場佈告欄</Text>
            {this.columnSeparator()}
            <Text style={styles.padding10}>
              {this.state.dropdown ? allData.board_intro : this.state.cutString}
            </Text>
            <TouchableOpacity
              style={[
                styles.boardTouchableContainer,
                this.state.dropdown ? styles.marginTop125 : styles.marginTop65,
              ]}>
              <Icon
                name={this.state.dropdown ? 'expand-less' : 'expand-more'}
                onPress={() => {
                  this.setState({dropdown: !this.state.dropdown});
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.activityContainer}>
            <Text style={styles.padding10}>賣場活動</Text>
            {this.columnSeparator()}
            <View style={styles.row}>
              <Text style={styles.jackpot}>彩票</Text>
              <Text style={styles.paddingTop10}>9.9購物節彩票活動</Text>
            </View>
            <Text style={styles.campaignTime}>
              2020/09/01 10:00 ~ 2020/09/14 10:00
            </Text>
          </View>
          <View style={styles.activityContainer}>
            <Text style={styles.padding10}>精選商品</Text>
            <FlatList
              data={Product}
              horizontal={true}
              renderItem={this.renderItem}
              keyExtractor={(product) => product.id}
            />
          </View>
          <View style={styles.watchMoreContainer}>
            <Text style={styles.watchMoreTitle}>
              ————————  逛逛更多  ————————
            </Text>
          </View>
          {Array(Product1.length)
            .fill(0)
            .map((v, i) => {
              return (
                <View style={styles.watchMoreItemContainer}>
                  {Product1[i].map((data) => {
                    return (
                      <View style={{width: width / 2}}>
                        <TouchableOpacity style={styles.watchMoreTouch}>
                          <Image
                            style={styles.watchMoreImage}
                            source={{
                              uri: data.uri,
                            }}
                          />
                          <Text>{data.title}</Text>
                          <Text style={styles.colorRed}>${data.price}</Text>
                        </TouchableOpacity>
                        <View style={styles.discountContainer}>
                          <Text style={styles.discountJackpot}>彩票</Text>
                          <Text style={styles.discountShip}>免運</Text>
                          <Text style={styles.discountCode}>折扣碼</Text>
                          <Text style={styles.discountPCoin}>p幣</Text>
                        </View>
                        <View style={styles.watchMoreBottomContainer}>
                          <Text style={styles.watchMoreSaleCount}>銷售 9</Text>
                          <View style={styles.watchMoreIconContainer} />
                          <Icon name="shopping-cart" color="orange" />
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          <TouchableOpacity style={styles.watchAllTouch}>
            <View style={styles.watchAllIconContainer}>
              <Icon name="arrow-forward" color="orange" />
            </View>
            <Text style={styles.margin20}>點此查看所有商品</Text>
          </TouchableOpacity>
        </Animated.ScrollView>
        <View style={styles.row}>
          {this.footerButton('store', '賣場首頁')}
          {this.footerButton('local-mall', '全部商品')}
          {this.footerButton('format-list-bulleted', '商品分類')}
          {this.footerButton('error-outline', '關於賣場')}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchableGroupContainer: {
    width: (width - 20) / 4,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableGroupContainerFirstButton: {
    width: (width - 20) / 4,
    padding: 5,
    alignItems: 'center',
  },
  touchableGroupTitle: {
    fontSize: 12,
    color: 'grey',
  },
  touchableGroupData: {
    color: 'red',
    paddingTop: 10,
  },
  touchableGroupSeparator: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  touchableGroupContentContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  colorRed: {
    color: 'red',
  },
  columnSeparator: {
    borderColor: 'grey',
    borderWidth: 0.5,
    width: width - 40,
    alignSelf: 'center',
  },
  //精選商品
  goodsContainer: {
    height: 240,
    width: 150,
    margin: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    shadowColor: '#000000',
    borderRadius: 10,
    shadowOpacity: 0.4,
  },
  goodsImage: {
    width: 150,
    height: 160,
    borderRadius: 10,
  },
  goodsTitle: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  goodsPrice: {
    color: 'red',
    padding: 10,
  },
  //最底下的按鈕
  footerButton: {
    width: width / 4,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  //整個背景
  containerBackgroundColor: {
    backgroundColor: 'grey',
  },
  //背景圖
  imageBackground: {
    width: width,
    height: 200,
    backgroundColor: 'grey',
  },
  row: {
    flexDirection: 'row',
  },
  //大頭貼
  avatar: {
    backgroundColor: 'grey',
    borderColor: 'white',
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  //基本資料
  titleContainer: {
    margin: 10,
    justifyContent: 'center',
  },
  title: {
    padding: 5,
    fontSize: 18,
  },
  padding5: {
    padding: 5,
  },
  padding10: {
    padding: 10,
  },
  margin20: {
    margin: 20,
  },
  //兩顆按鈕（關注靈靈通）
  twoButtonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  twoButtonTouch: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    width: 75,
    height: 25.3,
    margin: 5,
    opacity: 0.7,
  },
  twoButtonText: {
    paddingTop: 6,
    paddingLeft: 5,
    fontSize: 12,
  },
  //佈告欄
  boardContainer: {
    marginTop: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  height90: {
    height: 90,
  },
  height150: {
    height: 150,
  },
  boardTitle: {
    alignSelf: 'center',
    padding: 5,
  },
  boardTouchableContainer: {
    opacity: 0.9,
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    width: width - 20,
  },
  marginTop65: {
    marginTop: 65,
  },
  marginTop125: {
    marginTop: 125,
  },
  //賣場活動/精選商品的container
  activityContainer: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  jackpot: {
    margin: 10,
    fontSize: 12,
    color: 'red',
    borderWidth: 0.5,
    borderColor: 'red',
    width: 30,
    padding: 2,
  },
  campaignTime: {
    paddingLeft: 50,
    fontSize: 12,
    color: 'grey',
    paddingBottom: 5,
  },
  paddingTop10: {
    paddingTop: 10,
  },
  //逛逛更多
  watchMoreContainer: {
    backgroundColor: '#DDDDDD',
  },
  watchMoreTitle: {
    alignSelf: 'center',
    padding: 10,
    color: 'grey',
  },
  watchMoreItemContainer: {
    flexDirection: 'row',
    width: width,
  },
  watchMoreTouch: {
    width: width / 2,
    padding: 5,
    backgroundColor: 'white',
  },
  watchMoreImage: {
    width: (width - 20) / 2,
    height: 200,
  },
  discountContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
  },
  discountJackpot: {
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: 'purple',
    color: 'purple',
    backgroundColor: '#FFD0FF',
    padding: 1,
    margin: 3,
  },
  discountShip: {
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: 'red',
    color: 'white',
    backgroundColor: 'red',
    padding: 1,
    margin: 3,
  },
  discountCode: {
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: 'orange',
    color: 'white',
    backgroundColor: 'orange',
    padding: 1,
    margin: 3,
  },
  discountPCoin: {
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: 'orange',
    color: 'orange',
    padding: 1,
    margin: 3,
  },
  watchMoreBottomContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
  },
  watchMoreSaleCount: {
    padding: 1,
    margin: 3,
  },
  watchMoreIconContainer: {
    width: 91.3,
  },
  //看所有商品
  watchAllTouch: {
    width: width,
    height: 100,
    alignItems: 'center',
    margin: 10,
  },
  watchAllIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'orange',
    justifyContent: 'center',
    margin: 10,
  },
  //動畫顯示
  animatecShowContainer: {
    position: 'absolute',
    width: width,
    height: 75,
    zIndex: 100,
  },
  animatedShowIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
  },
  animatedShowSearchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 35,
    opacity: 0.9,
  },
  animatedShowInput: {
    width: width - 171,
    marginLeft: 5,
  },
  animatedShowSearchIcon: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
  paddingTop35: {
    paddingTop: 35,
  },
  animatedDisappearContainer: {
    width: width,
    flexDirection: 'row',
  },
  animatedDisappearSearchContainer: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    borderRadius: 20,
    height: 35,
    opacity: 0.9,
  },
  animatedDisappearInput: {
    width: width - 171,
    marginLeft: 5,
  },
  animatedDisappearSearchIcon: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
});
