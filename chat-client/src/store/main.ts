import { defineStore } from 'pinia'
import emojiList from "@/json/emoji.json"
import Conversition from "@/class/Conversition"
import edit from "wangeditor";
import Cookies from 'js-cookie'
import { getUserInfo } from '@/api/user'
import { Main } from '@/store/interface'
import {nextTick} from 'vue'

export const useMainStore = defineStore({
  id: 'main',
  state: (): Main => {
    return {
      token: Cookies.get('Authorization'),
      userInfo: null,
      drawer: false,
      recipient: null,
      readyRecipient: null,
      navId: '2',
      sessionList: [],
      sessionSelectId: 0,
      allSessionList: [],
      allSessionSelectId: 0,
      socket: null,
      navList: [
        { index: '1', lable: "消息列表", icon: "i-ep-chat-dot-round" },
        { index: '2', lable: "用户列表", icon: "i-ep-user" },
      ],
      conversitionList: [],
      sendInfo: null,
      emojiList: emojiList,
      chatScrollbar: null,
      chatEditor: null,
      editor: null,
      editorData: '',
      openMusic: false,
      tipMusic: null
    }
  },
  actions: {
    setToken(data: any){
      Cookies.set('Authorization', data?.token)
      this.token = data?.token
    },

    getUserInfo(){
      return new Promise((resolve, reject)=>{
        getUserInfo().then((res: any) => {
          if(res.code === 200){
            this.userInfo = res.data
            resolve('获取成功')
          }else
            reject()
        }).catch(()=>{
          reject()
        })
      })
    },

    // 声音提示
    playMusic() {
      if (this.tipMusic != null && this.openMusic) {
        this.tipMusic.currentTime = 0
        this.tipMusic.play()
      }
    },
    // 设置会话窗口到达底部
    toBottom() {
      const timer = setTimeout(()=>{
        this.chatScrollbar?.setScrollTop(9999)
        clearTimeout(timer)
      },300)
    },
    // 修改信息已读状态
    changeReaded(id: number) {
      let userConversition = this.conversitionList.filter(
        (x) =>
          x.sendId == id &&
          x.recipientId == this.userInfo?.id &&
          !x.isRead
      );
      if (userConversition.length) {
        userConversition.map((x) => {
          x.isRead = true
        })
      }
      const query = {
        sendId: id
      }
      this.socket.emit("changeMsgRead", query)
    },
    // 初始化编辑器
    initEditor() {
      if (this.editor != null) {
        this.editor.destroy();
        this.editor = null;
      }
      this.editor = new edit("#chatEditor")
      this.editor.config.showFullScreen = false
      this.editor.config.focus = true

      // 自定义菜单栏
      this.editor.config.menus = []

      // change
      this.editor.config.onchange = (html: any) => {
        this.editorData = html
      };

      // 上传最多1张
      this.editor.config.uploadImgMaxLength = 1
      // 添加上传本地图片接口
      this.editor.config.customUploadImg = function (
        files: any,
        insert: Function
      ) {
        insert(files)
      };
      // 聚焦操作
      nextTick(()=>{
        this.editor.create()
        this.editor.txt.html(this.editorData)
      })
    },
    // 本地新增信息记录
    sendLocal(conversition: Conversition) {
      this.conversitionList.push(conversition)
      this.toBottom();
    },
    // websocket发送消息
    sendInfos(conversition: Conversition) {
      let data = {
        // 发送内容
        conversition
      }
      if (this.socket != null) {
        this.socket.emit("sendMsg", data);
      }
    },
    // 注销
    logout() {
      Cookies.remove('Authorization')
      this.$patch((state)=>{
        state.userInfo = null
        state.token = undefined
        state.sessionList = []
        state.sessionSelectId=0
        state.allSessionList = []
        state.allSessionSelectId = 0
      })
      if (this.socket != null) {
        this.socket.disconnect()
      }
    },
  }
})