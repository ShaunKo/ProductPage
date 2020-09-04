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
  Dimensions,
} from 'react-native';
export const {width, height} = Dimensions.get('window');

import {Container} from 'native-base';
import {Avatar, Icon} from 'react-native-elements';
import {
  item,
  transport,
  imageUri,
  payment,
  Product,
  Product1,
  countsOfBuyer,
} from './Data.js';
import ActionButton from 'react-native-action-button';
import Lightbox from 'react-native-lightbox';

export default class Commodity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //下拉
      dropdownPay: false,
      dropdownDeliver: false,
      //轉換button顯示頁面
      switchButton: 'produceDesc', //productDesc/ qa / counts
      scrollY: new Animated.Value(0),
      isOpen: false, //lightbox
    };
  }

  //分隔線
  separator = () => {
    return <View style={styles.separator} />;
  };
  //button 逛逛賣場關於我
  button = (text) => {
    return (
      <TouchableOpacity style={styles.smallButtonTouch}>
        <View style={styles.smallButtonTextView}>
          <Text style={styles.smallButtonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  //button 商品，評價，出貨
  buttonOne = (text, price) => {
    return (
      <TouchableOpacity style={styles.sellerButton}>
        <View style={{width: width / 6}}>
          <Text style={styles.buttonTitle}>{text}</Text>
        </View>
        <View style={{width: width / 6}}>
          <Text style={styles.buttonCounts}>{price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  //payment
  payment = (pay) => {
    pay.map((p) => {
      return (
        <View style={{width: width}}>
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
  //按鈕換頁
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
            <View style={styles.onlyFlexDirection}>
              <View style={{width: width / 3}}>
                <Text style={styles.alignSelfCenter}>購買者</Text>
              </View>
              <View style={{width: width / 6}}>
                <Text style={styles.alignSelfCenter}>數量</Text>
              </View>
              <View style={{width: width / 2}}>
                <Text style={styles.alignSelfStart}>時間</Text>
              </View>
            </View>
            {countsOfBuyer.map((data) => {
              return (
                <View>
                  <View style={styles.countsOfBuyer} />
                  <View style={[styles.width, styles.onlyFlexDirection]}>
                    <View style={{width: width / 3}}>
                      <Text style={styles.alignSelfCenter}>{data.buyer}</Text>
                    </View>
                    <View style={{width: width / 6}}>
                      <Text style={styles.alignSelfCenter}>{data.count}</Text>
                    </View>
                    <View style={{width: width / 2}}>
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
  //問與答
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
  //下滑給背景
  _getHeaderBackgroundColor = () => {
    const {scrollY} = this.state;

    return scrollY.interpolate({
      inputRange: [0, 140],
      outputRange: ['white', 'white'],
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
  //scroll to top
  floatIcon = () => {
    return (
      <ActionButton
        style={styles.bottom}
        buttonColor="grey"
        buttonTextStyle={styles.actionButton}
        buttonText="↥"
        verticalOrientation="up"
        onPress={() => {
          this.goToTop();
        }}
      />
    );
  };
  goToTop = () => {
    this.scroll.scrollTo({x: 0, y: 0, animated: true, useNativeDriver: true});
  };
  //最底下按鈕
  footerButton = (icon, text) => {
    return (
      <TouchableOpacity style={styles.bottomButton}>
        <Icon name={icon} />
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Container>
        {this.floatIcon()}
        <Animated.View
          style={
            ({
              opacity: this._getHeaderTitleOpacityDisappear(),
            },
            [styles.animatedDisappear])
          }>
          <View style={styles.padding10}>
            <TouchableOpacity style={styles.imageIconContainer}>
              <Icon name="chevron-left" color="white" />
            </TouchableOpacity>
          </View>
          <View style={{width: width - 150}} />
          <View style={styles.padding10}>
            <TouchableOpacity style={styles.imageIconContainer}>
              <Icon name="shopping-cart" color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.padding10}>
            <TouchableOpacity style={styles.imageIconContainer}>
              <Icon name="more-vert" color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              backgroundColor: this._getHeaderBackgroundColor(),
              opacity: this._getHeaderTitleOpacity(),
            },
          ]}>
          <View style={styles.padding10}>
            <TouchableOpacity style={styles.imageIconContainer}>
              <Icon name="chevron-left" color="black" />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.iconOnImageViewCenter}> */}
          <Text style={styles.animatedLeft} numberOfLines={1}>
            {item.itemName}
          </Text>
          <View style={styles.padding10}>
            <TouchableOpacity style={styles.imageIconContainer}>
              <Icon name="shopping-cart" color="black" />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.flex1}> */}
          <View style={styles.padding10}>
            <TouchableOpacity style={styles.imageIconContainer}>
              <Icon name="more-vert" color="black" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.ScrollView
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
          <View style={{width: width}}>
            <Lightbox
              didOpen={() => {
                this.setState({isOpen: true});
              }}
              onClose={() => {
                this.setState({isOpen: false});
              }}>
              <Image
                style={this.state.isOpen ? styles.image1 : styles.image}
                source={{
                  uri: '/Users/shaun/Desktop/截圖 2020-08-24 下午2.22.19.png',
                }}
              />
            </Lightbox>
          </View>
          <View style={[styles.width, styles.padding10]}>
            <Text style={styles.itemNameText}>{item.itemName}</Text>
            <View style={styles.itemDataContentView}>
              <View style={styles.padding5}>
                <Text style={styles.itemPriceText}>${item.price}</Text>
                <Text style={styles.itemSaleText}>銷售 {item.salesVolume}</Text>
              </View>
              <View style={{width: width - 160}} />
              <View style={styles.padding5}>
                <Icon name="share" color="grey" />
                <Text style={styles.itemSaleText}>分享</Text>
              </View>
              <View style={styles.padding5}>
                <Icon name="favorite-border" color="grey" />
                <Text style={styles.itemSaleText}>{item.favorite}</Text>
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
              <View style={styles.dropdownIcon}>
                <Text style={styles.dropdownTitle}>運送</Text>
              </View>
              <View style={[styles.dropdownPayImageView, styles.dropdownIcon]}>
                <Text style={styles.shippingRange}>NT$0-NT$130</Text>
              </View>
              <View
                style={[styles.dropdownIcon, styles.dropdownIconWidthHeight]}>
                <Icon
                  name={
                    this.state.dropdownDeliver ? 'expand-less' : 'expand-more'
                  }
                />
              </View>
            </TouchableOpacity>
            {this.state.dropdownDeliver ? (
              <View style={styles.margin10}>
                {transport.map((trans) => {
                  return <Text>{trans}</Text>;
                })}
              </View>
            ) : (
              <View />
            )}
            {this.separator()}
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => {
                this.setState({dropdownPay: !this.state.dropdownPay});
              }}>
              <View style={styles.dropdownIcon}>
                <Text style={styles.dropdownTitle}>付款</Text>
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
              <View
                style={[styles.dropdownIcon, styles.dropdownIconWidthHeight]}>
                <Icon
                  name={this.state.dropdownPay ? 'expand-less' : 'expand-more'}
                />
              </View>
            </TouchableOpacity>
            {this.state.dropdownPay ? (
              <View style={styles.margin10}>
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
            <Text style={styles.padding10}>賣家資訊 上線中</Text>
            <View style={styles.sellerSeparator} />
            <View
              style={[
                styles.width,
                styles.padding10,
                styles.onlyFlexDirection,
              ]}>
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
              <View style={styles.sellContainer}>
                <Text>1313健康館fff4132000的賣場</Text>
                <View style={styles.sellerImageContainer}>
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
              style={{width: width / 3}}
              onPress={() => {
                this.setState({switchButton: 'productDesc'});
              }}>
              <Text style={styles.alignSelfCenter}>商品說明</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: width / 3}}
              onPress={() => {
                this.setState({switchButton: 'qa'});
              }}>
              <Text style={styles.alignSelfCenter}>問與答</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: width / 3}}
              onPress={() => {
                this.setState({switchButton: 'counts'});
              }}>
              <Text style={styles.alignSelfCenter}>購買人次</Text>
            </TouchableOpacity>
          </View>
          {this.switchButton()}
          {this.separator()}
          <View>
            <Text style={styles.margin10}>看此商品的人也看了</Text>
            <FlatList
              data={Product}
              horizontal={true}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => {
                return <View style={styles.flatListSeparator} />;
              }}
              keyExtractor={(product) => product.id}
            />
          </View>
          {this.separator()}
          <View style={styles.recommandationBackground}>
            <Text style={styles.margin10}>相關推薦</Text>
          </View>
          {Array(Product1.length)
            .fill(0)
            .map((v, i) => {
              return (
                <View style={styles.onlyFlexDirection}>
                  {Product1[i].map((data) => {
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
                        <Text style={styles.pCoin}>p幣</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
        </Animated.ScrollView>
        <View style={styles.onlyFlexDirection}>
          {this.footerButton('comment', '靈靈通')}
          {this.footerButton('shopping-cart', '加入購物車')}
          <TouchableOpacity style={styles.bottomButton1}>
            <Text>立即購買</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    //商品圖
    height: 355,
  },
  image1: {
    //點擊後商品圖
    height: 355,
    justifyContent: 'center',
  },
  //商品圖上的icon
  imageIconContainer: {
    borderRadius: 30,
    backgroundColor: 'grey',
    height: 30,
    width: 30,
    justifyContent: 'center',
    opacity: 0.8,
  },
  //品名
  itemNameText: {
    fontSize: 18,
  },
  //價格
  itemPriceText: {
    fontSize: 20,
    color: 'red',
  },
  itemDataContentView: {
    width: width - 20,
    flexDirection: 'row',
    marginTop: 10,
  },
  itemSaleText: {
    color: 'grey',
    padding: 5,
  },
  //下拉
  dropdownContainer: {
    padding: 10,
    width: width,
    flexDirection: 'row',
  },
  dropdownTitleView: {
    width: width - 50,
    justifyContent: 'center',
  },
  dropdownTitle: {
    fontSize: 15,
  },
  dropdownIcon: {
    justifyContent: 'center',
  },
  margin10: {
    margin: 10,
  },
  dropdownPayImageView: {
    width: 300,
    flexDirection: 'row',
  },
  dropdownPayImage: {
    width: 20,
    height: 20,
    borderRadius: 3,
    margin: 5,
  },
  dropdownIconWidthHeight: {
    width: 30,
    height: 30,
  },
  padding10: {
    padding: 10,
  },
  padding5: {
    padding: 5,
  },
  width: {
    width: width,
  },
  shippingRange: {
    width: 300,
    padding: 5,
  },
  sellerImage: {
    width: 20,
    height: 20,
    borderRadius: 3,
    margin: 2,
  },
  sellerImageView: {
    flexDirection: 'row',
    width: width - 180,
  },
  sellerImageContainer: {
    width: width - 60,
    padding: 5,
    flexDirection: 'row',
  },
  sellContainer: {
    width: width - 54,
    padding: 5,
  },
  sellerAvatarView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerSeparator: {
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    width: width - 20,
    alignSelf: 'center',
    marginBottom: 5,
  },
  //大頭貼
  avatar: {
    backgroundColor: 'grey',
  },
  threeViewContainer: {
    width: width,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  flatListSeparator: {
    width: 5,
  },
  recommandationBackground: {
    backgroundColor: '#DDDDDD',
  },
  recommandationTouch: {
    width: width / 2,
    padding: 10,
  },
  recommandationImage: {
    width: 100 + '%',
    height: 200,
  },
  bottomButton: {
    width: width / 4,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  bottomButton1: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  //分割器
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
    width: width - 20,
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
    justifyContent: 'center',
  },
  smallButtonText: {
    padding: 2,
    color: '#FF8800',
    fontSize: 11,
    alignSelf: 'center',
  },
  sellerButton: {
    flexDirection: 'row',
    width: width / 3,
    padding: 5,
  },
  buttonTitle: {
    alignSelf: 'center',
    fontSize: 12,
  },
  buttonCounts: {
    alignSelf: 'center',
    fontSize: 12,
    color: 'red',
  },
  animatedLeft: {
    width: width - 150,
    fontSize: 18,
    padding: 10,
  },
  animatedContainer: {
    width: width,
    flexDirection: 'row',
    marginTop: 20,
    position: 'absolute',
    zIndex: 500,
  },
  animatedDisappear: {
    zIndex: 100,
    marginTop: 20,
    width: width - 20,
    flexDirection: 'row',
  },
  pCoin: {
    width: 25,
    borderColor: 'orange',
    borderWidth: 0.5,
    borderRadius: 3,
    justifyContent: 'center',
  },
  //floatIcon
  bottom: {
    width: width,
    position: 'absolute',
    bottom: 10,
    opacity: 0.7,
    zIndex: 1000,
  },
  actionButton: {
    color: 'black',
  },
});
