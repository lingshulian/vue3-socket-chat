<template>
  <el-button
    class="fixed top-58px left-10px z-2 p-2px text-16px"
    type="primary"
    text
    @click="store.drawer = !store.drawer"
    > 
    <i v-if="!store.drawer" class="i-ep-expand"></i> <i v-else class="i-ep-fold"></i>
  </el-button>
  <el-row type="flex" class="w-full border-rounded-33px">
    <el-drawer v-model="store.drawer" size="90%" :lock-scroll="true" direction="ltr">
      <el-row>
        <ChatNav />
        <ChatDomain />
      </el-row>
    </el-drawer>
    <!-- 导航区域 -->
    <ChatNav class="lg:block hidden"/>
    <!-- 会话区域 -->
    <ChatDomain class="lg:block hidden"/>
    <!-- 聊天区域 -->
    <ChatContent />
  </el-row>
</template>

<script setup lang="ts">
import { userList } from "@/api/user.js"
import { onMounted, getCurrentInstance, ref } from "vue"
import Conversition from "@/class/Conversition"
import io from "socket.io-client"
import { useMainStore } from "@/store/main"
import { ElMessage } from 'element-plus'
import router from '@/router'

const store = useMainStore()
const { proxy }: any = getCurrentInstance()

const chatUrl: any = import.meta.env.VITE_BASE_API || "/"

onMounted(() => {
  init()
})

async function init() {
  if (store.token) {
    initSocket()
    if (!store.allSessionList.length) {
      getUserList()
    }
  }
}

// 获取用户列表
function getUserList() {
  userList().then((res: any) => {
    if (res?.code == 200) {
      store.allSessionList = res?.data
    } else {
      proxy.$message.error(res?.message)
    }
  })
}

// 连接聊天
function initSocket() {

  store.socket = io(chatUrl,  {
    // 通过token连接
    auth: {
      token: store.token
    }
  })

  // 初始化连接
  store.socket.on("connect", () => {
    console.log("连接成功")
    store.socket.emit("joinChat")
  })

  // 断开连接
  store.socket.on("disconnect", () => {
    console.log("连接已断开")
  })

  // 修改阅读状态
  store.socket.on("changMsgstatus", (data: any) => {
    store.conversitionList.map((x: Conversition) => {
      if (x.timestamp != null && x.timestamp == data.timestamp) {
        x.status = 1
      }
    })
  })

  // 加入会话成功
  store.socket.on("joinSuccess", (data: any) => {
    store.userInfo && (store.userInfo.onlineStatus = true)
    store.conversitionList = data.conversition
    store.sessionList = data.historySessionList
  })

  //接收信息
  store.socket.on("reviceMsg", (data: Conversition) => {
    if (data.recipientId == store.userInfo?.id) {
      store.playMusic()
      if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
          var n = new Notification("消息通知", {
            body: "你有一条新的消息",
          })
        })
      }
      for (let item of store.sessionList) {
        if (item.id == data.sendId && store.sessionSelectId == data.sendId && store.navId === '1') {
          data.isRead = true
          let query = {
            sendId: data.sendId
          }
          store.socket.emit("changeMsgRead", query)
          break
        }
      }
    }

    store.sendLocal(data)
    let len =
      store.sessionList.filter((x: any) => x.id == data.sendId)?.length ?? 0
    if (len === 0) {
      let item = store.allSessionList.filter((x: any) => x.id == data.sendId)
      store.sessionList.push(...item)
    }
    store.toBottom()
  })

  // 强制旧设备下线
  store.socket.on("squeezeOut", () => {
    store.logout()
    ElMessage.error("账户在其它地方登陆，会话已断开！")
    router.push({
      name: "Login"
    })
  })

  // 过期下线
  store.socket.on("forceOut", ()=> {
    store.logout()
    ElMessage.error("登录已过期！")
    router.push({
      name: "Login"
    })
  })

}
</script>

<style lang="scss" scoped>
  :deep(.ep-drawer__header){
    padding: 10px;
    margin-bottom: 0px;
  }
</style>