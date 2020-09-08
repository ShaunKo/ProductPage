import React, { Component } from 'react'
import {
  Dimensions,
  ScrollView,
  View,
} from 'react-native'
import {WebView} from 'react-native-webview';
const BaseScript =
    `
    (function () {
        var height = null;
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setInterval(changeHeight, 100);
    } ())
    `

class Test2 extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'RZWebView'
    this.state = ({
      height: 0,
      image:'<div class="tidied-202003104141-1"><img  src="https://pp30033003.jjj802.com/kaokao/YOGA%20TPE/TOP.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="http://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-001.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="https://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-002.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="http://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-003.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="http://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-004.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="https://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-005.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="http://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-006.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="https://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-007.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="https://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-008.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="https://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-009.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-1"><img  src="https://pp30033003.jjj802.com/kaokao/YOGA%20TPE/YOGA%20TPE-010.jpg" border="0"></div><div class="tidied-202003104141-1"></div><div class="tidied-202003104141-2"></div><div class="tidied-202003104141-2"><p class="MsoNormal tidied-202003107025-2"><span class="tidied-202003107025-1">【特製加厚款附贈背帶<span>+</span>束帶】瑜珈墊<span>183x80x1cm TPE</span>超厚瑜珈墊<span>/</span>野餐墊遊戲墊<span>/</span>韻律墊<span>/</span>健身墊<span>/</span>有氧瑜珈墊</span></p><p class="MsoNormal tidied-202003107025-2"><span class="tidied-202003107025-3">&nbsp;</span></p><p class="MsoNormal tidied-202003107025-2"><span class="tidied-202003107025-3">﹝產品說明﹞</span></p><p class="MsoNormal tidied-202003107025-2"><span class="tidied-202003107025-4">環保，無毒，味道不刺鼻，可回收，密度高，彈性佳，韌性佳，防滑效果好，張力強，柔軟舒適。</span></p><p class="MsoNormal"><span class="tidied-202003107025-3">&nbsp;</span></p><p class="MsoNormal"><b><span class="tidied-202003107025-5">TPE</span></b><b><span class="tidied-202003107025-5">材質</span></b> <b><span class="tidied-202003107025-6">-</span></b> <span class="tidied-202003107025-7">回彈性較強，使用壽命長；<span>TPE&gt;PVE&gt;NBR</span></span></p><p class="MsoNormal"><span class="tidied-202003107025-3">&nbsp;</span></p><p class="MsoNormal"><b><span class="tidied-202003107025-5">環保健康</span></b> <b><span class="tidied-202003107025-5">-</span></b> <span class="tidied-202003107025-3">源自橡膠，有一點味道是正常的；挑選優質像膠，確保每一條都是健康品</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal"><span class="tidied-202003107025-3">&nbsp;</span><b><span class="tidied-202003107025-5">柔軟回彈</span></b> <b><span class="tidied-202003107025-5">-</span></b> <span class="tidied-202003107025-3">健康舒適 貼身相伴，提倡環保，回彈快，韌性足</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal"><span class="tidied-202003107025-3">&nbsp;</span><b><span class="tidied-202003107025-5">雙面紋路 <span>-</span></span></b> <span class="tidied-202003107025-3">正反面設計不同紋路，抓地力強，防滑效果更佳</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span><b><span class="tidied-202003107025-5">防水方便清潔 <span>-</span></span></b> <span class="tidied-202003107025-3">表層防水，不易參透，可以直接水洗擦乾後繼續使用</span></p><p class="MsoNormal tidied-202003107025-2"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal tidied-202003107025-2"><span class="tidied-202003107025-3">﹝產品規格﹞</span></p><p class="MsoNormal"><span class="tidied-202003107025-3">&nbsp;</span><b><span class="tidied-202003107025-9">品名 <span>-</span></span></b> <span class="tidied-202003107025-3">TPE</span><span class="tidied-202003107025-3">特製加厚瑜珈墊</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span><b><span class="tidied-202003107025-9">紋路 <span>-</span></span></b> <span class="tidied-202003107025-3">鳳羽紋路、水波紋路</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span><b><span class="tidied-202003107025-9">材質 <span>&ndash;</span></span></b> <span class="tidied-202003107025-3">TPE</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal"><span class="tidied-202003107025-10">&nbsp;</span><b><span class="tidied-202003107025-11">顏色 <span>-</span></span></b> <span class="tidied-202003107025-7">湖藍色</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span><b><span class="tidied-202003107025-9">尺寸 <span>-</span></span></b> <span class="tidied-202003107025-3">183(</span><span class="tidied-202003107025-3">長<span>)*80(</span>寬<span>)*1(</span>厚度<span>)cm</span></span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span></p><p class="MsoNormal"><span class="tidied-202003107025-8">&nbsp;</span><b><span class="tidied-202003107025-9">用途 <span>-</span></span></b> <span class="tidied-202003107025-3">專業健身、瑜珈、戶外</span></p><p class="MsoNormal"><span class="tidied-202003107025-12">&nbsp;</span></p></div></div>'
    })
  }

  /**
   * web端发送过来的交互消息
   */
  onMessage (event) {
    try {
      const action = JSON.parse(event.nativeEvent.data)
      if (action.type === 'setHeight' && action.height > 0) {
        this.setState({ height: action.height })
      }
    } catch (error) {
      // pass
    }
  }

  render () {
    return (
        <ScrollView>
            <View style={{flex:1}}>
                <View>
                    
                </View>
            </View>
        <WebView
          injectedJavaScript={BaseScript}
          style={{
            width: 100 + '%',
            height: 3665
          }}
          automaticallyAdjustContentInsets
          source={{ html: this.state.image }}
          decelerationRate='normal'
          scalesPageToFit
          javaScriptEnabled // 仅限Android平台。iOS平台JavaScript是默认开启的。
          domStorageEnabled // 适用于安卓
          scrollEnabled={true}
          onMessage={this.onMessage.bind(this)}
        />
        </ScrollView>
    )
  }
}

Test2.navigationOptions = {
  headerTitle: 'Test2'
}

export default Test2