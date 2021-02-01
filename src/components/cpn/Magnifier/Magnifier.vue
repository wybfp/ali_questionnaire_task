<template>
  <!-- 整个区域 -->
  <!-- wrap表示一个元素节点 -->
  <div class="magnifier-wrap" ref="wrap">
    <!-- 小图显示 -->
    <div
      class="small-wrap"
      @mouseenter="onMouseenter"
      @mousemove="onMousemove"
      @mouseleave="onMouseleave"
    >
      <!-- 小图里的遮罩层，也就是要放大部分 -->
      <div class="mask-wrap"></div>
      <img src="./img/min.jpg" alt="" />
    </div>
    <!-- 放大显示 -->
    <div class="max-wrap" v-show="isShow">
      <img src="./img/max.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import { tool } from "../../../utils/index";

export default {
  name: "Magnifier",
  data() {
    return {
      isShow: false,
      maxImgWidth: "",
      maxImgHeight: "",
    };
  },
  methods: {
    // mounted()挂载到dom后回调
    mounted() {
      // 当文档被滚动时发生的事件。
      window.addEventListener("scroll", tool.throttle(this.setMaxBoxPos));
    },
    onMouseenter() {
      this.isShow = true;
    },
    onMouseleave() {
      this.isShow = false;
    },
    // 鼠标在小图中移动
    onMousemove() {},

    setMaxBoxPos() {
      // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
      // 如果是标准盒子模型，元素的尺寸等于width/height + padding + border-width的总和。
      // 如果box-sizing: border-box，元素的的尺寸等于 width/height。

      // 最大盒子的边框
      const leftPosition = this.wrap.getBoundingClientRect().left;
      const topPosition = this.wrap.getBoundingClientRect().top;

      const paddingLeft = this.getDomAttr(this.wrap, "padding-left");
      const padddingTop = this.getDomAttr(this.wrap, "padding-top");
    },
  },
};
</script>

<style scoped lang="less">
.magnifier-wrap {
  position: relative;
  box-sizing: border-box;
  background-color: pink;
  .small-wrap {
    display: inline-block;
    z-index: 1;
    border: 1px solid black;
    box-sizing: border-box;

    .mask-wrap {
      position: absolute;
      // cursor 属性规定要显示的光标的类型（形状）。move 此光标指示某对象可被移动
      cursor: move;
      background: RGBA(255, 255, 255, 0.5);
      z-index: 1;
    }
  }

  .max-wrap {
    position: fixed;
    border: 1px solid #ccc;
    overflow: hidden;
    background: rgb(231, 10, 10);

    .img {
      position: absolute;
    }
  }
}
</style>
