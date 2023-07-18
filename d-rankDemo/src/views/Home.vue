<script setup lang="ts">
import Vue, { computed, getCurrentInstance, onMounted, ref } from 'vue'
import ExampleView from './GUI/ExampleView.vue'
import Drawer from '../components/Drawer.vue'

import { ElIcon } from 'element-plus'
import 'element-plus/es/components/icon/style/css'
import { ArrowLeft, Calendar } from '@element-plus/icons-vue'
import musicIcon from '@/assets/icons/music.png'
import muteIcon from '@/assets/icons/music.png'
import messageIcon from '@/assets/icons/message.png'
import shareIcon from '@/assets/icons/share.png'

const isMusicOpen = ref(false);
const musicDom = ref();
const datasetDrawer = ref();

const tools = computed(() => {
  return [
    {
      icon: messageIcon,
      text: '留言'
    },
    {
      icon: shareIcon,
      text: '分享'
    }
  ]
})

// function toolsClick(item) {
//   if (item.text === '音乐') {
//     isMusicOpen.value = !isMusicOpen.value;

//   }
// }

function click11() {
  datasetDrawer.value.show()
}

onMounted(() => {
  const musicPlayer = new MusicPlayer('#music', { probability: 0.33,});
})
</script>
<template>
  <div class="rank">
    <div class="rank-bg"></div>
    <div class="rank-tools">
      <div class="rank-tools-return">
        <ElIcon color="#fff" size="26"><ArrowLeft /></ElIcon>
      </div>
      <div class="rank-tools-buttons">
        <div style="height: 30px;width: 30px;backgroundColor: #fff" id="music"></div>
        <img
          v-for="item in tools"
          :key="item.text"
          :title="item.text"
          :src="item.icon"
          class="rank-tools-buttons-item"
        />
      </div>
    </div>
    <div class="rank-header">
      <div class="rank-header-main">
        <div class="rank-header-main-title">行业热度</div>
        <div class="rank-header-main-industry" @click="click11">同花顺</div>
        <!-- <div class="rank-header-main-sentiment"></div> -->
        <div class="rank-header-main-date">
          <!-- <ElIcon color="#fff" size="20"> -->
        </div>
      </div>
      <div class="rank-header-sub">十大流通股东</div>
    </div>
    <div class="rank-container">
      <div class="rank-container-main" id="container">
        <div class="rank-container-main-legends">
          <div class="rank-container-main-legends-line">
            <div class="rank-container-main-legends-line-icon"></div>
            持股排名
          </div>
          <div class="rank-container-main-legends-circle">
            <div class="rank-container-main-legends-circle-icon"></div>
            持股量
          </div>
        </div>
        <div class="rank-container-main-content">
          <ExampleView />
        </div>
      </div>
    </div>
    <Drawer ref="datasetDrawer">
      <template #header> 123 </template>
      <template #main> 456 </template>
      <template #footer>
        <div class="btn" @click="hide">取消</div>
        <div class="btn confirm-btn" @click="handleConfirm">确定</div>
      </template>
    </Drawer>
  </div>
</template>
<style lang="less" scoped>
.rank {
  width: 100%;
  height: 100%;
  //   padding: 16px;
  background: linear-gradient(to bottom, #eb382f 0%; #eb382f 200px; #f5f5f5 320px; #f5f5f5 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  &-bg {
    box-sizing: border-box;

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
    box-sizing: border-box;
    width: 100%;
    padding: 30px 16px 0px;
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
    box-sizing: border-box;

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
        color: #fff;
        width: 88px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 4px;
        padding: 0px 8px;
        margin-left: 8px;
        position: relative;
        &::after {
          content: '';
          display: block;
          position: absolute;
          right: 8px;
          top: 12px;
          width: 0;
          height: 0;
          border-width: 6px;
          border-style: solid;
          border-color: #fff transparent transparent transparent;
        }
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
    box-sizing: border-box;
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

      @legends-height: 16px;
      &-legends {
        width: 100%;
        height: @legends-height;
        display: flex;
        font-size: 12px;
        padding-top: 8px;
        &-line {
          margin-right: 12px;
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.6);
          font-family: PingFangSC-Regular;
          &-icon {
            width: 12px;
            height: 1px;
            border: 1px solid #d1d1d1;
            background-color: #d1d1d1;
            border-radius: 10px;
            margin: 0 2px;
          }
        }
        &-circle {
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.6);
          font-family: PingFangSC-Regular;
          &-icon {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #d1d1d1;
            margin: 0 6px;
          }
        }
      }
      &-content {
        width: 100%;
        height: calc(100% - @legends-height);
      }
    }
  }
  &-foot {
    box-sizing: border-box;
    width: 100%;
    height: 92px;
    padding: 8px 16px 40px;
    background: #ffffff;
    box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px 8px 0 0;
    z-index: 2;
  }
}



.btn {
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.04);
  text-align: center;
  color: rgba(0, 0, 0, 0.84);
  font-size: 16px;
}
.confirm-btn {
  color: #fff;
  background-color: #ff2436;
}
</style>>
