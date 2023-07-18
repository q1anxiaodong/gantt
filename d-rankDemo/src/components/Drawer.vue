<template>
  <div class="overlay" v-if="showOverlay" @click.self="hide" :style="{ backgroundColor }">
    <div class="drawer" :style="drawerStyle">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="main">
        <slot name="main"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  data() {
    return {
      showOverlay: false,
      drawerStyle: {
        bottom: '-466px',
      },
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }
  },
  methods: {
    show() {
      this.drawerStyle.bottom = 0;
      this.showOverlay = true;
      setTimeout(() => {
        this.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      });
    },
    hide() {
      this.drawerStyle.bottom = '-466px';
      this.backgroundColor = 'rgba(0, 0, 0, 0)';
      setTimeout(() => {
        this.showOverlay = false;
      }, 300);
    },
  },
}
</script>

<style scoped lang="less">
[data-adapter='thsIphoneXAdapter'] {
  .drawer {
    padding-bottom: 34px !important;
  }
}
.overlay {
  position: fixed;
  z-index: 2;
  box-sizing: border-box;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: background-color 300ms linear;
}
.drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  transition: bottom linear 100ms;
  width: 100vw;
  height: 466px;
  border-radius: 10px 10px 0 0;
  animation: slide 300ms linear;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.header {
  height: 64px;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.84);
  line-height: 22px;
  font-weight: 500;
}
.footer {
  height: 60px;
  padding: 8px 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.main {
  height: 0;
  flex: 1;
  box-sizing: border-box;
  padding: 0 16px;
  overflow-y: auto;
}
@keyframes slide {
  0% {
    bottom: -300px;
  }
  100% {
    bottom: 0;
  }
}
</style>
