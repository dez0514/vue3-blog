import angry from '../../assets/images/emoji/angry.gif'
import cool from '../../assets/images/emoji/cool.gif'
import cute from '../../assets/images/emoji/cute.gif'
import disdain from '../../assets/images/emoji/disdain.gif'
import embarrassed from '../../assets/images/emoji/embarrassed.gif'
import evil from '../../assets/images/emoji/evil.gif'
import frighten from '../../assets/images/emoji/frighten.gif'
import kiss from '../../assets/images/emoji/kiss.gif'
import love from '../../assets/images/emoji/love.gif'
import pig from '../../assets/images/emoji/pig.gif'
import pull from '../../assets/images/emoji/pull.gif'
import sad from '../../assets/images/emoji/sad.gif'
import scared from '../../assets/images/emoji/scared.gif'
import smile from '../../assets/images/emoji/smile.gif'
import smirking from '../../assets/images/emoji/smirking.gif'
import sunk from '../../assets/images/emoji/sunk.gif'
import sweat from '../../assets/images/emoji/sweat.gif'
import wordless from '../../assets/images/emoji/wordless.gif'
// face
import face_weixiao from '../../assets/images/face/weixiao.gif'
import face_xixi from '../../assets/images/face/xixi.gif'
import face_haha from '../../assets/images/face/haha.gif'
import face_keai from '../../assets/images/face/keai.gif'
import face_kelian from '../../assets/images/face/kelian.gif'
import face_wabi from '../../assets/images/face/wabi.gif'
import face_chijing from '../../assets/images/face/chijing.gif'
import face_haixiu from '../../assets/images/face/haixiu.gif'
import face_jiyan from '../../assets/images/face/jiyan.gif'
import face_bizui from '../../assets/images/face/bizui.gif'
import face_bishi from '../../assets/images/face/bishi.gif'
import face_aini from '../../assets/images/face/aini.gif'
import face_lei from '../../assets/images/face/lei.gif'
import face_touxiao from '../../assets/images/face/touxiao.gif'
import face_qinqin from '../../assets/images/face/qinqin.gif'
import face_shengbing from '../../assets/images/face/shengbing.gif'
import face_taikaixin from '../../assets/images/face/taikaixin.gif'
import face_baiyan from '../../assets/images/face/baiyan.gif'
import face_youhengheng from '../../assets/images/face/youhengheng.gif'
import face_zuohengheng from '../../assets/images/face/zuohengheng.gif'
import face_xu from '../../assets/images/face/xu.gif'
import face_shuai from '../../assets/images/face/shuai.gif'
import face_tu from '../../assets/images/face/tu.gif'
import face_haqian from '../../assets/images/face/haqian.gif'
import face_baobao from '../../assets/images/face/baobao.gif'
import face_nu from '../../assets/images/face/nu.gif'
import face_yiwen from '../../assets/images/face/yiwen.gif'
import face_chanzui from '../../assets/images/face/chanzui.gif'
import face_baibai from '../../assets/images/face/baibai.gif'
import face_sikao from '../../assets/images/face/sikao.gif'
import face_han from '../../assets/images/face/han.gif'
import face_kun from '../../assets/images/face/kun.gif'
import face_shui from '../../assets/images/face/shui.gif'
import face_qian from '../../assets/images/face/qian.gif'
import face_shiwang from '../../assets/images/face/shiwang.gif'
import face_ku from '../../assets/images/face/ku.gif'
import face_se from '../../assets/images/face/se.gif'
import face_heng from '../../assets/images/face/heng.gif'
import face_guzhang from '../../assets/images/face/guzhang.gif'
import face_yun from '../../assets/images/face/yun.gif'
import face_beishang from '../../assets/images/face/beishang.gif'
import face_zhuakuang from '../../assets/images/face/zhuakuang.gif'
import face_heixian from '../../assets/images/face/heixian.gif'
import face_yinxian from '../../assets/images/face/yinxian.gif'
import face_numa from '../../assets/images/face/numa.gif'
import face_hufen from '../../assets/images/face/hufen.gif'
import face_shudaizi from '../../assets/images/face/shudaizi.gif'
import face_fennu from '../../assets/images/face/fennu.gif'
import face_ganmao from '../../assets/images/face/ganmao.gif'
import face_xin from '../../assets/images/face/xin.gif'
import face_shangxin from '../../assets/images/face/shangxin.gif'
import face_zhu from '../../assets/images/face/zhu.gif'
import face_xiongmao from '../../assets/images/face/xiongmao.gif'
import face_tuzi from '../../assets/images/face/tuzi.gif'
import face_ok from '../../assets/images/face/ok.gif'
import face_ye from '../../assets/images/face/ye.gif'
import face_good from '../../assets/images/face/good.gif'
import face_no from '../../assets/images/face/no.gif'
import face_zan from '../../assets/images/face/zan.gif'
import face_lai from '../../assets/images/face/lai.gif'
import face_ruo from '../../assets/images/face/ruo.gif'
import face_caonima from '../../assets/images/face/caonima.gif'
import face_shenma from '../../assets/images/face/shenma.gif'
import face_jiong from '../../assets/images/face/jiong.gif'
import face_fuyun from '../../assets/images/face/fuyun.gif'
import face_geili from '../../assets/images/face/geili.gif'
import face_weiguan from '../../assets/images/face/weiguan.gif'
import face_weiwu from '../../assets/images/face/weiwu.gif'
import face_huatong from '../../assets/images/face/huatong.gif'
import face_lazhu from '../../assets/images/face/lazhu.gif'
import face_dangao from '../../assets/images/face/dangao.gif'
import face_fahongbao from '../../assets/images/face/fahongbao.gif'
// const getImgUrl = (name: string) => {
//   return new URL(`/src/assets/images/face/${name}`, import.meta.url).href
// }
export interface EmojiItem {
  name: string
  url: string
  cn: string
}
export const emojiList: EmojiItem[] = [
  { name: 'angry', url: angry, cn: '愤怒'},
  { name: 'cool', url: cool, cn: '酷' },
  { name: 'cute', url: cute, cn: '可爱' },
  { name: 'disdain', url: disdain, cn: '蔑视' },
  { name: 'embarrassed', url: embarrassed, cn: '尴尬' },
  { name: 'evil', url: evil, cn: '邪恶' },
  { name: 'frighten', url: frighten, cn: '吓唬' },
  { name: 'kiss', url: kiss, cn: '吻' },
  { name: 'love', url: love, cn: '喜欢' },
  { name: 'pig', url: pig, cn: '猪' },
  { name: 'pull', url: pull, cn: '抠鼻' },
  { name: 'sad', url: sad, cn: '伤心' },
  { name: 'scared', url: scared, cn: '害怕' },
  { name: 'smile', url: smile, cn: '微笑' },
  { name: 'smirking', url: smirking, cn: '奸笑' },
  { name: 'sunk', url: sunk, cn: '囧' },
  { name: 'sweat', url: sweat, cn: '流汗' },
  { name: 'wordless', url: wordless, cn: '闭嘴' }
]
export const faceList: EmojiItem[] = [
  { name: 'face_weixiao', url: face_weixiao, cn: '微笑' },
  { name: 'face_xixi', url: face_xixi, cn: '嘻嘻' },
  { name: 'face_haha', url: face_haha, cn: '哈哈' },
  { name: 'face_keai', url: face_keai, cn: '可爱' },
  { name: 'face_kelian', url: face_kelian, cn: '可怜' },
  { name: 'face_wabi', url: face_wabi, cn: '挖鼻' },
  { name: 'face_chijing', url: face_chijing, cn: '吃惊' },
  { name: 'face_haixiu', url: face_haixiu, cn: '害羞' },
  { name: 'face_jiyan', url: face_jiyan, cn: '挤眼' },
  { name: 'face_bizui', url: face_bizui, cn: '闭嘴' },
  { name: 'face_bishi', url: face_bishi, cn: '鄙视' },
  { name: 'face_aini', url: face_aini, cn: '爱你' },
  { name: 'face_lei', url: face_lei, cn: '泪' },
  { name: 'face_touxiao', url: face_touxiao, cn: '偷笑' },
  { name: 'face_qinqin', url: face_qinqin, cn: '亲亲' },
  { name: 'face_shengbing', url: face_shengbing, cn: '生病' },
  { name: 'face_taikaixin', url: face_taikaixin, cn: '太开心' },
  { name: 'face_baiyan', url: face_baiyan, cn: '白眼' },
  { name: 'face_youhengheng', url: face_youhengheng, cn: '右哼哼' },
  { name: 'face_zuohengheng', url: face_zuohengheng, cn: '左哼哼' },
  { name: 'face_xu', url: face_xu, cn: '嘘' },
  { name: 'face_shuai', url: face_shuai, cn: '衰' },
  { name: 'face_tu', url: face_tu, cn: '吐' },
  { name: 'face_haqian', url: face_haqian, cn: '哈欠' },
  { name: 'face_baobao', url: face_baobao, cn: '抱抱' },
  { name: 'face_nu', url: face_nu, cn: '怒' },
  { name: 'face_yiwen', url: face_yiwen, cn: '疑问' },
  { name: 'face_chanzui', url: face_chanzui, cn: '馋嘴' },
  { name: 'face_baibai', url: face_baibai, cn: '拜拜' },
  { name: 'face_sikao', url: face_sikao, cn: '思考' },
  { name: 'face_han', url: face_han, cn: '汗' },
  { name: 'face_kun', url: face_kun, cn: '困' },
  { name: 'face_shui', url: face_shui, cn: '睡' },
  { name: 'face_qian', url: face_qian, cn: '钱' },
  { name: 'face_shiwang', url: face_shiwang, cn: '失望' },
  { name: 'face_ku', url: face_ku, cn: '酷' },
  { name: 'face_se', url: face_se, cn: '色' },
  { name: 'face_heng', url: face_heng, cn: '哼' },
  { name: 'face_guzhang', url: face_guzhang, cn: '鼓掌' },
  { name: 'face_yun', url: face_yun, cn: '晕' },
  { name: 'face_beishang', url: face_beishang, cn: '悲伤' },
  { name: 'face_zhuakuang', url: face_zhuakuang, cn: '抓狂' },
  { name: 'face_heixian', url: face_heixian, cn: '黑线' },
  { name: 'face_yinxian', url: face_yinxian, cn: '阴险' },
  { name: 'face_numa', url: face_numa, cn: '怒骂' },
  { name: 'face_hufen', url: face_hufen, cn: '互粉' },
  { name: 'face_shudaizi', url: face_shudaizi, cn: '书呆子' },
  { name: 'face_fennu', url: face_fennu, cn: '愤怒' },
  { name: 'face_ganmao', url: face_ganmao, cn: '感冒' },
  { name: 'face_xin', url: face_xin, cn: '心' },
  { name: 'face_shangxin', url: face_shangxin, cn: '伤心' },
  { name: 'face_zhu', url: face_zhu, cn: '猪' },
  { name: 'face_xiongmao', url: face_xiongmao, cn: '熊猫' },
  { name: 'face_tuzi', url: face_tuzi, cn: '兔子' },
  { name: 'face_ok', url: face_ok, cn: 'OK' },
  { name: 'face_ye', url: face_ye, cn: '耶' },
  { name: 'face_good', url: face_good, cn: 'GOOD' },
  { name: 'face_no', url: face_no, cn: 'NO' },
  { name: 'face_zan', url: face_zan, cn: '赞' },
  { name: 'face_lai', url: face_lai, cn: '来' },
  { name: 'face_ruo', url: face_ruo, cn: '弱' },
  { name: 'face_caonima', url: face_caonima, cn: '草泥马' },
  { name: 'face_shenma', url: face_shenma, cn: '神马' },
  { name: 'face_jiong', url: face_jiong, cn: '囧' },
  { name: 'face_fuyun', url: face_fuyun, cn: '浮云' },
  { name: 'face_geili', url: face_geili, cn: '给力' },
  { name: 'face_weiguan', url: face_weiguan, cn: '围观' },
  { name: 'face_weiwu', url: face_weiwu, cn: '威武' },
  { name: 'face_huatong', url: face_huatong, cn: '话筒' },
  { name: 'face_lazhu', url: face_lazhu, cn: '蜡烛' },
  { name: 'face_dangao', url: face_dangao, cn: '蛋糕' },
  { name: 'face_fahongbao', url: face_fahongbao,cn: '发红包' }
]

// 解析表情
export const formatEmoji = (value: string) => {
  return value.replace(/\[(.+?)\]/g, (val, content) => {
    const arr = content.split('emoji=')
    const name = arr[1] ? arr[1].trim() : ''
    const list = emojiList.concat(faceList)
    const current = list.find((item) => item.name === name)
    const text = `<img src="${current?.url}" class="comment-emoji"/>`
    return name ? text : val
  })
}