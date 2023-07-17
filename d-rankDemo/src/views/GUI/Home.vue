<template>
  <div class="word-stream">
    <div class="word-stream-bg"></div>
    <div class="word-stream-tools">
      <div class="word-stream-tools-return">
        <ElIcon color="#fff" size="26"><ArrowLeft /></ElIcon>
      </div>
      <div class="word-stream-tools-buttons">
        <img
          v-for="item in tools"
          :key="item.text"
          :title="item.text"
          :src="item.icon"
          @click="toolsClick(item)"
          class="word-stream-tools-buttons-item"
        />
      </div>
    </div>
    <div class="word-stream-header">
      <div class="word-stream-header-main">
        <div class="word-stream-header-main-title">行业热度</div>
        <div class="word-stream-header-main-industry"></div>
        <div class="word-stream-header-main-sentiment"></div>
        <div class="word-stream-header-main-date">
          <ElIcon color="#fff" size="20">
            <Calendar />
          </ElIcon>
        </div>
      </div>
      <div class="word-stream-header-sub">二级行业热点变化</div>
    </div>

    <div class="word-stream-container">
      <div class="word-stream-container-main" id="container"></div>
    </div>
    <div class="word-stream-foot"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElIcon } from 'element-plus';
import 'element-plus/es/components/icon/style/css';
import { ArrowLeft, Calendar } from '@element-plus/icons-vue';
import musicIcon from '@/assets/icons/music.png';
import muteIcon from '@/assets/icons/music.png';
import messageIcon from '@/assets/icons/message.png';
import shareIcon from '@/assets/icons/share.png';
import { useChart } from './useChart';

useChart('container');

const isMusicOpen = ref(false);

const tools = computed(() => {
  return [
    {
      icon: isMusicOpen.value ? musicIcon : muteIcon,
      text: '音乐'
    },
    {
      icon: messageIcon,
      text: '留言'
    },
    {
      icon: shareIcon,
      text: '分享'
    }
  ];
});

function toolsClick(item: any) {
  if (item.text === '音乐') {
    isMusicOpen.value = !isMusicOpen.value;
  }
}
</script>
<style scoped lang="less">
.word-stream {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #eb382f 0%; #eb382f 200px; #f5f5f5 320px; #f5f5f5 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &-bg {
    width: 100%;
    height: 200px;
    position: fixed;
    top: 0;
    left: 0;
    background-image: url('../assets/images/header-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center top;
    pointer-events: none;
    z-index: 0;
  }

  &-tools {
    width: 100%;
    padding: 60px 16px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-return {
      height: 100%;
      display: flex;
      align-items: center;
    }
    &-buttons {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &-item {
        width: 24px;
        height: 24px;
        margin-left: 16px;
      }
    }
  }
  &-header {
    width: 100%;
    padding: 0px 16px;
    margin-top: 20px;
    &-main {
      display: flex;
      align-items: center;
      &-title {
        background: linear-gradient(to right, #ffeba7 0%, #fff 100%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        font-family: PingFangSC-Semibold;
        font-size: 22px;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: 600;
      }
      &-industry {
        width: 88px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 4px;
        padding: 0px 8px;
        margin-left: 8px;
      }
      &-sentiment {
        width: 88px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 4px;
        padding: 0px 8px;
        margin-left: 8px;
      }
      &-date {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.18);
        margin-left: 8px;
        border-radius: 4px;
      }
    }
    &-sub {
      margin-top: 8px;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #ffeae8;
      letter-spacing: 0;
      font-weight: 400;
      margin-bottom: 8px;
    }
  }
  &-container {
    width: 100%;
    flex: 1;
    padding: 0px 8px;
    border-radius: 6px 6px 0 0;
    z-index: 1;
    &-main {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 6px 6px 0 0;
    }
  }
  &-foot {
    width: 100%;
    height: 92px;
    padding: 8px 16px 40px;
    background: #ffffff;
    box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px 8px 0 0;
    z-index: 2;
  }
}
</style>
