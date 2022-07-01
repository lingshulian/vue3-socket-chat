<!--
 * @Author: Mr.Yu
 * @Description: 最好的我们
 * @Date: 2022-06-27 17:02:20
 * @LastEditTime: 2022-07-01 15:31:24
-->
<template>
  <!--接收信息提示音-->
  <audio id="tip-music">
    <source src="@/assets/message/notice.mp3" type="audio/mp3" />
  </audio>
  <div absolute right-30px top-15px >
    <el-switch
      class="chat-switch-music"
      v-model="store.openMusic"
      inline-prompt
      active-text="开提示"
      inactive-text="关提示"
    />
  </div>
  <el-row type="flex" align="middle" justify="center">
    <el-card shadow="hover" class="lg:w-1200px w-full mt-30px chat-container">
      <ChatContainer></ChatContainer>
    </el-card>
  </el-row>
</template>

<script setup lang="ts">
  import { watch } from "vue";
  import { useMainStore } from "@/store/main"
  const store = useMainStore()
  // 监听声音开启
  watch(
    () => store.openMusic,
    (newVal, oldVal) => {
      if (newVal) {
        store.tipMusic = document.getElementById("tipMusic") as HTMLMediaElement
      }
    }
  )
</script>

<style scoped lang="scss">
  .chat-switch-music{
    :deep(.ep-switch__core){
      width: 100px;
    }
  }
  .chat-container{
    :deep(.ep-card__body){
      padding-left: 0!important;
      @media (max-width: 1024px){
        padding-right: 0!important;
      }
    }
  }
</style>
