import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {Container} from 'native-base';
import {Avatar, Icon} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
import {
  item,
  transport,
  imageUri,
  payment,
  DATA,
  DATA1,
  countsOfBuyer,
} from './Data.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownPay: false,
      dropdownDeliver: false,
      //轉換button顯示頁面
      switchButton: 'produceDesc', //productDesc/ qa / counts
      scrollY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    //console.log(DATA1.fill(0))
    DATA1.map((data) => {
      Array(DATA1.length)
        .fill(0)
        .map((i) => {
          console.log(data[i]);
        });
    });
  }

  //分隔線
  separator = () => {
    return <View style={styles.separator} />;
  };
  //button 逛逛賣場關於我
  button = (text) => {
    return (
      <View style={styles.flex1}>
        <TouchableOpacity style={styles.smallButtonTouch}>
          <View style={styles.smallButtonTextView}>
            <Text style={styles.smallButtonText}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  //button 商品，評價，出貨
  buttonOne = (text, price) => {
    return (
      <View style={styles.sellerButton}>
        <TouchableOpacity style={styles.flex1WithDirection}>
          <View style={styles.flex1}>
            <Text style={styles.buttonTitle}>{text}</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.buttonCounts}>{price}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  //payment
  payment = (pay) => {
    pay.map((p) => {
      return (
        <View style={styles.flex1}>
          <Text>{p}</Text>
        </View>
      );
    });
  };

  //看此商品的人也看了
  renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <Image
          style={styles.lookToo}
          source={{
            uri: item.uri,
          }}
        />
        <Text style={styles.orange}>${item.price}</Text>
        <Text style={styles.alignSelfCenter}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  switchButton = () => {
    return (
      <View>
        {this.state.switchButton === 'productDesc' ? (
          imageUri.map((uri) => {
            return (
              <Image
                style={styles.image}
                source={{
                  uri: uri,
                }}
              />
            );
          })
        ) : this.state.switchButton === 'qa' ? (
          <View>
            {this.qA('Q')}
            <View style={styles.onlyFlexDirection}>
              <View style={styles.line} />
              <View>{this.qA('A')}</View>
            </View>
            <TouchableOpacity style={styles.haveAQuestionTouch}>
              <Text style={styles.haveAQuestionTitle}>我要提問</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.margin10}>※下列為半年內購買人次</Text>
            <View style={styles.flex1WithDirection}>
              <View style={styles.flex2}>
                <Text style={styles.alignSelfCenter}>購買者</Text>
              </View>
              <View style={styles.flex1}>
                <Text style={styles.alignSelfCenter}>數量</Text>
              </View>
              <View style={styles.flex3}>
                <Text style={styles.alignSelfStart}>時間</Text>
              </View>
            </View>
            {countsOfBuyer.map((data) => {
              return (
                <View>
                  <View style={styles.countsOfBuyer} />
                  <View style={styles.flex1WithDirection}>
                    <View style={styles.flex2}>
                      <Text style={styles.alignSelfCenter}>{data.buyer}</Text>
                    </View>
                    <View style={styles.flex1}>
                      <Text style={styles.alignSelfCenter}>{data.count}</Text>
                    </View>
                    <View style={styles.flex3}>
                      <Text style={styles.alignSelfStart}>{data.time}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity style={styles.watchMoreTouch}>
              <Text style={styles.watchMoreTitle}>看更多</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  qA = (qa) => {
    return (
      <View>
        <View style={styles.onlyFlexDirection}>
          <View style={styles.marginLeft20}>
            <Text>{qa}</Text>
          </View>
          <View style={styles.marginLeft5}>
            <Text>name</Text>
            <Text>2017-03-13 10:23:07</Text>
          </View>
        </View>
        <Text style={styles.marginLeft20}>www</Text>
      </View>
    );
  };
  _getHeaderBackgroundColor = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
      inputRange: [0, 140],
      outputRange: ['white', 'white'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };
  _getHeaderTitleOpacity = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 20, 50],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };
  floatIcon = () => {
    return (
      <FloatingAction
        style={styles.bottom}
        floatingIcon={<Icon name="chevron-left" />}
      />
    );
  };
  render() {
    return (
      <Container>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              backgroundColor: this._getHeaderBackgroundColor(),
            },
          ]}>
          <Animated.View
            style={[
              styles.flex1,
              {
                opacity: this._getHeaderTitleOpacity(),
              },
            ]}>
            <Icon name="chevron-left" color="black" />
          </Animated.View>
          <Animated.Text
            style={[
              styles.animatedLeft,
              {
                opacity: this._getHeaderTitleOpacity(),
              },
            ]}>
            {item.itemName}
          </Animated.Text>
          <Animated.View
            style={[
              styles.iconOnImageViewCenter,
              {
                opacity: this._getHeaderTitleOpacity(),
              },
            ]}>
            <Icon name="shopping-cart" color="black" />
          </Animated.View>
          <Animated.View
            style={[
              styles.flex1,
              {
                opacity: this._getHeaderTitleOpacity(),
              },
            ]}>
            <Icon name="more-vert" color="black" />
          </Animated.View>
        </Animated.View>
        {/* <Content> */}
        <Animated.ScrollView
          overScrollMode={'never'}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {y: this.state.scrollY}},
            },
          ])}>
          <View style={styles.flex1}>
            <ImageBackground
              style={styles.image}
              source={{
                uri: '/Users/shaun/Desktop/截圖 2020-08-24 下午2.22.19.png',
              }}>
              <View style={styles.flex1WithDirection}>
                <View style={styles.iconOnImageViewLeft}>
                  <TouchableOpacity style={styles.imageIconContainer}>
                    <Icon name="chevron-left" color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.iconOnImageViewCenter}>
                  <TouchableOpacity style={styles.imageIconContainer}>
                    <Icon name="shopping-cart" color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.flex1}>
                  <TouchableOpacity style={styles.imageIconContainer}>
                    <Icon name="more-vert" color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>

            <View style={styles.itemDataContainer}>
              <Text style={styles.itemNameText}>{item.itemName}</Text>
              <View style={styles.itemDataContentView}>
                <View style={styles.iconOnImageViewLeft}>
                  <Text style={styles.itemPriceText}>${item.price}</Text>
                  <Text style={styles.itemSaleText}>
                    銷售 {item.salesVolume}
                  </Text>
                </View>
                <View style={styles.iconOnImageViewCenter}>
                  <Icon name="share" color="grey" />
                  <Text style={styles.itemDataText}>分享</Text>
                </View>
                <View style={styles.iconOnImageViewCenter}>
                  <Icon name="favorite-border" color="grey" />
                  <Text style={styles.itemDataText}>{item.favorite}</Text>
                </View>
              </View>
            </View>
            {this.separator()}
            <View>
              <TouchableOpacity
                style={styles.dropdownContainer}
                onPress={() => {
                  this.setState({dropdownDeliver: !this.state.dropdownDeliver});
                }}>
                <View style={styles.dropdownTitleView}>
                  <Text style={styles.dropdownTitle}>運送 NT$0-NT$130</Text>
                </View>
                <View style={styles.dropdownViewCenter} />

                <View style={styles.dropdownIcon}>
                  <Icon
                    name={
                      this.state.dropdownDeliver ? 'expand-less' : 'expand-more'
                    }
                  />
                </View>
              </TouchableOpacity>
              {this.state.dropdownDeliver ? (
                <View style={styles.dropdownViewMargin}>
                  {transport.map((trans) => {
                    return <Text>{trans}</Text>;
                  })}
                </View>
              ) : (
                <View />
              )}
              {this.separator()}
              <TouchableOpacity
                style={styles.dropdownViewMarginPay}
                onPress={() => {
                  this.setState({dropdownPay: !this.state.dropdownPay});
                }}>
                <View style={styles.dropdownPayView}>
                  <Text style={styles.payFontSize}>付款</Text>
                </View>
                <View style={styles.dropdownPayImageView}>
                  {imageUri.map((uri) => {
                    return (
                      <Image
                        style={styles.dropdownPayImage}
                        source={{
                          uri: uri,
                        }}
                      />
                    );
                  })}
                </View>
                <View style={styles.dropdowniconDown}>
                  <Icon
                    name={
                      this.state.dropdownPay ? 'expand-less' : 'expand-more'
                    }
                  />
                </View>
              </TouchableOpacity>
              {this.state.dropdownPay ? (
                <View style={styles.dropdownViewMargin}>
                  {payment.map((pay) => {
                    return <Text>{pay}</Text>;
                  })}
                </View>
              ) : (
                <View />
              )}
            </View>
            {this.separator()}
            <View>
              <Text style={styles.sellerTitle}>賣家資訊 上線中</Text>
              <View style={styles.sellerSeparator} />
              <View style={styles.flex1WithDirection}>
                <View style={styles.sellerAvatarView}>
                  <Avatar
                    size="small"
                    rounded
                    title="F"
                    onPress={() => console.log('Works!')}
                    activeOpacity={0.7}
                    containerStyle={styles.avatar}
                  />
                </View>
                <View style={styles.flex5}>
                  <Text>1313健康館fff4132000的賣場</Text>
                  <View style={styles.sellerContainer}>
                    <View style={styles.sellerImageView}>
                      {imageUri.map((uri) => {
                        return (
                          <Image
                            style={styles.sellerImage}
                            source={{
                              uri: uri,
                            }}
                          />
                        );
                      })}
                    </View>
                    {this.button('逛逛賣場')}
                    {this.button('關於我')}
                  </View>
                </View>
              </View>
              <View style={styles.onlyFlexDirection}>
                {this.buttonOne('商品', '465')}
                {this.buttonOne('評價', '10784')}
                {this.buttonOne('平均出貨', '一日內')}
              </View>
            </View>
            {this.separator()}
            <View style={styles.threeViewContainer}>
              <TouchableOpacity
                style={styles.flex1}
                onPress={() => {
                  this.setState({switchButton: 'productDesc'});
                }}>
                <Text style={styles.switchThreeButtonTitle}>商品說明</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flex1}
                onPress={() => {
                  this.setState({switchButton: 'qa'});
                }}>
                <Text style={styles.switchThreeButtonTitle}>問與答</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flex1}
                onPress={() => {
                  this.setState({switchButton: 'counts'});
                }}>
                <Text style={styles.switchThreeButtonTitle}>購買人次</Text>
              </TouchableOpacity>
            </View>
            {this.switchButton()}
            {this.separator()}
            <View>
              <Text style={styles.dropdownViewMargin}>看此商品的人也看了</Text>
              <FlatList
                data={DATA}
                horizontal={true}
                renderItem={this.renderItem}
                ItemSeparatorComponent={() => {
                  return <View style={styles.flatListSeparator} />;
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
          {this.separator()}
          <View style={styles.recommandationBackground}>
            <Text style={styles.dropdownViewMargin}>相關推薦</Text>
          </View>
          {Array(DATA1.length)
            .fill(0)
            .map((v, i) => {
              return (
                <View style={styles.onlyFlexDirection}>
                  {DATA1[i].map((data) => {
                    return (
                      <TouchableOpacity style={styles.recommandationTouch}>
                        <Image
                          style={styles.recommandationImage}
                          source={{
                            uri: data.uri,
                          }}
                        />
                        <Text>{data.title}</Text>
                        <Text>${data.price}</Text>
                        <Text style={styles.padding3}>p幣</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
        </Animated.ScrollView>
        {/* </Content> */}
        <View style={styles.onlyFlexDirection}>
          <TouchableOpacity style={styles.bottomButton}>
            <Icon name="comment" />
            <Text>靈靈通</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
            <Icon name="shopping-cart" />
            <Text>加入購物車</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton1}>
            <Text>立即購買</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 355,
  },
  imageIconContainer: {
    borderRadius: 30,
    backgroundColor: 'grey',
    height: 40,
    width: 40,
    justifyContent: 'center',
    opacity: 0.8,
    margin: 5,
  },
  opacity: {
    opacity: 0.2,
  },
  imageIcon: {
    color: 'white',
  },
  iconOnImageViewLeft: {
    flex: 5,
  },
  iconOnImageViewCenter: {
    flex: 1,
    alignItems: 'center',
  },
  itemNameText: {
    fontSize: 18,
  },
  itemPriceText: {
    fontSize: 20,
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
  },
  itemDataContainer: {
    margin: 15,
  },
  itemDataContentView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  itemSaleText: {
    color: 'grey',
    marginLeft: 10,
  },
  itemDataText: {
    color: 'grey',
    marginTop: 10,
  },
  dropdownContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  dropdownTitleView: {
    flex: 5,
    justifyContent: 'center',
  },
  dropdownTitle: {
    fontSize: 15,
  },
  dropdownViewCenter: {
    flex: 2,
    flexDirection: 'row',
  },
  dropdownIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdownViewMargin: {
    margin: 10,
  },
  margin10: {
    margin: 10,
  },
  dropdownViewMarginPay: {
    margin: 10,
    flexDirection: 'row',
  },
  dropdownPayView: {
    flex: 1,
    justifyContent: 'center',
  },
  payFontSize: {
    fontSize: 15,
  },
  dropdownPayImageView: {
    flex: 6,
    flexDirection: 'row',
  },
  dropdownPayImage: {
    width: 20,
    height: 20,
    borderRadius: 3,
    margin: 5,
  },
  sellerTitle: {
    padding: 10,
  },
  sellerContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  sellerImageView: {
    flex: 4,
    flexDirection: 'row',
  },
  sellerImage: {
    width: 20,
    height: 20,
    borderRadius: 3,
    margin: 2,
  },
  sellerAvatarView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerSeparator: {
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  dropdowniconDown: {
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: 'grey',
  },
  threeViewContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  switchThreeButtonTitle: {
    alignSelf: 'center',
  },
  flatListSeparator: {
    width: 5,
  },
  recommandationBackground: {
    backgroundColor: '#DDDDDD',
  },
  recommandationTouch: {
    flex: 1,
    margin: 10,
  },
  recommandationImage: {
    width: 100 + '%',
    height: 200,
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  bottomButton1: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  separator: {
    borderWidth: 3,
    borderColor: '#DDDDDD',
    width: '100%',
  },
  marginLeft20: {
    marginLeft: 20,
  },
  marginLeft5: {
    marginLeft: 5,
  },
  onlyFlexDirection: {
    flexDirection: 'row',
  },
  flex1WithDirection: {
    flex: 1,
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex5: {
    flex: 5,
  },
  padding3: {
    padding: 3,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  lookToo: {
    width: 150,
    height: 100,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  watchMoreTouch: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 3,
    width: 90,
    alignSelf: 'center',
    margin: 10,
  },
  watchMoreTitle: {
    padding: 5,
    alignSelf: 'center',
  },
  countsOfBuyer: {
    borderColor: 'grey',
    borderWidth: 0.5,
    width: '95%',
    alignSelf: 'center',
    margin: 10,
  },
  haveAQuestionTouch: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 3,
    width: 100,
    alignSelf: 'center',
    margin: 10,
  },
  haveAQuestionTitle: {
    padding: 10,
    alignSelf: 'center',
  },
  line: {
    borderWidth: 1,
    borderColor: 'grey',
    marginLeft: 20,
  },
  orange: {
    color: 'orange',
  },
  smallButtonTouch: {
    borderColor: '#FF8800',
    borderWidth: 1,
    backgroundColor: '#FFDDAA',
    borderRadius: 5,
    margin: 5,
    width: 50,
    height: 20,
    alignSelf: 'flex-end',
  },
  smallButtonTextView: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
  },
  smallButtonText: {
    padding: 2,
    color: '#FF8800',
    fontSize: 11,
    alignSelf: 'center',
  },
  sellerButton: {
    flex: 1,
    margin: 10,
  },
  buttonTitle: {
    alignSelf: 'center',
    padding: 5,
    fontSize: 10,
  },
  buttonCounts: {
    alignSelf: 'center',
    padding: 5,
    fontSize: 12,
    color: 'red',
  },
  animatedLeft: {
    flex: 5,
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  animatedContainer: {
    flexDirection: 'row',
    marginTop: 20,
    height: 30,
  },

  //floatIcon
  bottom: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
  },
});
