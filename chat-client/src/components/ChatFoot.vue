<template>
  <footer class="px-20px">
    <!--工具栏-->
    <el-row type="flex" class="mb-10px">
      <el-popover placement="top" popper-class="chat-icon-popover" trigger="click">
        <template #reference>
          <div class="text-20px cursor-pointer dark:filter-invert-100">
            <img width="24" height="24" class="block" src="@/assets/emoji.svg">
          </div> 
        </template>
        <el-scrollbar class="emoji" height="150px">
          <ul class="m0 p0 pr-2px flex flex-wrap">
            <li
              v-for="item in store.emojiList"
              :key="item.title"
              class="p-5px list-none hover:animate-heart-beat animate-count-animated animate-duration-1s cursor-pointer"
              :title="item.title"
            >
              <img width="30" height="30" :src="item.icon" @click="selectIcon(item.icon)" />
            </li>
          </ul>
        </el-scrollbar>
      </el-popover>
      <div class="ml-10px text-20px i-ep-picture-rounded !cursor-pointer">
        <input
          ref="referenceUpload"
          class="opacity-0"
          name="customerService"
          type="file"
          value=""
          accept="image/*"
          v-on:change="sendImage"
        />
      </div>
      <div class="ml-10px text-20px i-ep-video-camera !cursor-pointer">
        <input
          ref="referenceUploadVideo"
          class="opacity-0"
          name="customerService"
          type="file"
          value=""
          accept="video/*"
          v-on:change="sendVideo"
        />
      </div>
    </el-row>
    <ChatEditor
      v-model="store.sendInfo"
      ref="editor"
      id="chatEditor"
      :height="135"
      class="answer-editor"
      placeholder="请输入聊天"
    ></ChatEditor>
  </footer>
</template>

<script setup lang="ts">
  import Conversition from "@/class/Conversition"
  import { useMainStore } from "@/store/main"
  import { ElMessage } from 'element-plus'
  import { uploadFile } from "@/api/common"
  import { ref, getCurrentInstance } from "vue"
  const { proxy }: any = getCurrentInstance()
  const store = useMainStore()
const editor = ref(null)

// 选择表情
function selectIcon(icon: string) {
  let iconContent = `<img src='${icon}' class='emo-image' />`
  store.editor.cmd.do("insertHTML", iconContent)
}

function blurHighLight(data: any) {
  // 这里做数据过滤或样式变更操作
  store.sendInfo = data
}

//发送图片
async function sendImage(e: any) {
  const fileData = e.target.files[0]
  if (fileData != null) {
    if (!/image\/\w+/.test(fileData.type)) {
      return alert("请选择图片文件!")
    }
    if (fileData.size > 1024 * 1024 * 10) {
      return alert("上传图片不能超过10M!")
    } else {
      console.log(fileData)
      const tempFilePath =  URL.createObjectURL(fileData)
      let conversition = new Conversition(
        store.userInfo.id,
        store.recipient.id,
        tempFilePath,
        1,
        0,
        +new Date(),
        "",
        false,
        store.userInfo.avatar
      )
      store.sendLocal(conversition)
      const result: any = await _uploadFile(e.target.files[0])
      if (result) {
        conversition.content = result.url
        store.sendInfos(conversition)
      }
      proxy.$refs.referenceUpload.value = null
    }
  }
}

//发送视频
async function sendVideo(e: any) {
  const resultFile = e.target.files
  const fileObj = new Blob([resultFile[0]], { type: "video/mp4" })
  const tempFilePath = URL.createObjectURL(fileObj)
  let conversition = new Conversition(
    store.userInfo.id,
    store.recipient.id,
    tempFilePath,
    2,
    0,
    +new Date(),
    "",
    false,
    store.userInfo.avatar
  )
  store.sendLocal(conversition)
  const result: any = await _uploadFile(e.target.files[0])
  if (result) {
    conversition.content = result.url
    store.sendInfos(conversition)
  }
  proxy.$refs.referenceUploadVideo.value = null
}

//上传文件资源
function _uploadFile(tempFilePath: string) {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append("file", tempFilePath)
    uploadFile(formData)
      .then((res: any) => {
        if(res.code === 200)
          resolve(res.data)
        resolve(undefined)
      })
      .catch(() => {
        resolve(undefined)
      })
  })
}
</script>