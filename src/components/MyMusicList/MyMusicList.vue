<template>
  <div class="my-music-list">
    <!-- 返回按钮 -->
    <div @click="back" class="back">
      <i class="icon-back"></i>
    </div>
    <!-- 顶部歌手名字 -->
    <div v-html="title" class="title"></div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <!--蒙层 -->
      <div class="filter"></div>
    </div>
    <!-- 推动层 -->
    <div class="bg-layer" ref="layer"></div>
    <my-scroll @scroll="scroll" class="list" ref="list" :data="songs" :probe-type="probeType" :listen-scroll="listenScroll">
      <div class="song-list-wrapper">
        <my-song-list :songs="songs">
        </my-song-list>
      </div>
      <!-- loading 组件 -->
      <div class="loading-container" v-show="!songs.length">
        <my-loading></my-loading>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
import MyLoading from '@/components/base/MyLoading/MyLoading';
import MySongList from '@/components/base/MySongList/MySongList';
import { prefixStyle } from '../../common/js/dom';

const TRANSFORM = prefixStyle('transform');
const RESERVED_HEIGHT = 40;
export default {
  components: {
    MyScroll,
    MySongList,
    MyLoading
  },
  data() {
    return {
      scrollY: 0
    };
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTranslate = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = this.imageHeight + 'px';
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    }
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslate, newY);
      let zIndex = 0;
      let scale = 1;
      this.$refs.layer.style[TRANSFORM] = `translate3d(0,${translateY}px,0)`;
      const percent = Math.abs(newY / this.imageHeight);
      if (newY > 0) {
        scale = 1 + percent;
        zIndex = 10;
      }
      if (newY < this.minTranslate) {
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = RESERVED_HEIGHT + 'px';
      } else {
        this.$refs.bgImage.style.paddingTop = '70%';
        this.$refs.bgImage.style.height = 0;
      }
      this.$refs.bgImage.style.zIndex = zIndex;
      this.$refs.bgImage.style[TRANSFORM] = `scale(${scale})`;
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/MyMusicList/MyMusicList.scss";
</style>