<template>
  <div>
    <transition :name="prefixCls + '-fade'">
      <div
        v-show="visible"
        :class="(prefixCls + '-shadow')"></div>
    </transition>

    <transition :name="prefixCls + '-ease'">
      <div
        v-show="visible"
        :class="prefixCls"
        @click.self="handleShadowClose">
        <div
          :class="(prefixCls + '-content')"
          :style="styles">
          <!-- header -->
          <div :class="(prefixCls + '-header')">
            <span class="header-title">{{ title }}</span>
            <i class="header-close el-icon-close"
             @click="handleClose"></i>
          </div>

          <!-- body -->
          <div ref="bodyWrap" :class="(prefixCls + '-body-box')" :style="bodyStyle">
            <div v-if="$slots.body">
              <slot name="body"></slot>
            </div>
            <div :class="(prefixCls + '-body')" v-else>
              <slot></slot>
            </div>
          </div>
          
          <!-- footer -->
          <div v-if="$slots.footer"
              ref="footer"
              :class="(prefixCls + '-footer')">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { on, off, scrollbarWidth } from '@/utils/index';
  
  const prefixCls = 'v-sidebar';

  export default {
    name: prefixCls,

    props: {
      value: Boolean,
      title: String,
      width: [Number, String],
      beforeClose: Function,
      shadowClose: Boolean,
      scrollMethod: Function
      // closable: {
      //   default: true,
      //   type: Boolean
      // }
    },

    data() {
      return {
        prefixCls,
        visible: false,
        bodyStyle: null
      };
    },

    computed: {
      styles() {
        let style = {};

        if (this.width) {
          if (this.width.indexOf('%') > 0 || this.width.indexOf('vw') > 0 || this.width.indexOf('px') > 0) {
            style['width'] = this.width;
          } else {
            style['width'] = `${this.width}px`;
          }

          return style;
        }
      }
    },

    mounted() {
      if (typeof this.scrollMethod === 'function') {
        // this.$refs.bodyWrap
        on(this.$refs.bodyWrap, 'scroll', this.handleScroll);
      }
    },

    watch: {
      value(val) {
        this.visible = val;
      },

      visible(val) {
        this.$emit('input', val);

        if (val) {
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = scrollbarWidth() + 'px';
          this.setBodyBottom();
        } else {
          document.body.style.overflow = 'auto';
          document.body.style.paddingRight = 0;
        }
      }
    },

    methods: {
      handleShadowClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
          return;
        }
        this.hide();
      },

      handleClose() {
        if (typeof this.beforeClose === 'function' && !this.shadowClose) {
          this.beforeClose(this.hide);
          return;
        }
        this.hide();
      },

      hide() {
        this.visible = false;
      },

      setBodyBottom() {
        this.$nextTick(() => {
          if (this.$slots.footer) {
            const height = this.$refs.footer.getBoundingClientRect().height + 'px';
            this.bodyStyle = {
              marginBottom: height
            };
          }

          this.$refs.bodyWrap.scrollTop = 0;
        });
      },

      handleScroll() {
        this.scrollMethod(this.$refs.bodyWrap);
      }
    },

    beforeDestroy() {
      off(this.$refs.bodyWrap, 'scroll', this.handleScroll);
    }
  };
</script>

<style lang="scss" scoped>
  $sidebar-prefix-cls: "v-sidebar";

  .#{$sidebar-prefix-cls}-shadow {
    @extend %dialog-shadow;
    z-index: 98;
  }

  .#{$sidebar-prefix-cls} {
    @extend %dialog-container;
    z-index: 99;
    transition: all 0.5s;
  }

  .#{$sidebar-prefix-cls}-content {
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    right: 0;
    width: 600px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    border-radius: 1px 0 0 1px;
  }

  .#{$sidebar-prefix-cls}-header {
    @extend %dialog-header ;
    height: 40px;
    line-height: 40px;
    border: 0;
    background-color: #EBF6FF;
  }

  .#{$sidebar-prefix-cls}-body-box {
    overflow:auto;
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 40px;
    text-align: left;
  }

  .#{$sidebar-prefix-cls}-body {
    @extend %dialog-body;
  }

  .#{$sidebar-prefix-cls}-footer {
    @extend %dialog-footer;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .#{$sidebar-prefix-cls}-fade-enter,
  .#{$sidebar-prefix-cls}-fade-leave-active {
    opacity: 0;
  }

  .#{$sidebar-prefix-cls}-ease-enter {
    transform: translateX(100%);
  }

  .#{$sidebar-prefix-cls}-ease-leave {
    transition: all 0.7s;
    transform: translateX(0);
  }

  .#{$sidebar-prefix-cls}-ease-leave-active {
    transform: translateX(100%);
  }

  %dialog-shadow {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  %dialog-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    
  }

  %dialog-header {
    line-height: 39px;
    border-bottom: 1px solid #D3Dee8;
    text-align: left;

    .header-title {
      display: inline-block;
      font-size: 14px;
      color: #343E4C;
      text-indent: 24px;
      font-weight: bold;
    }

    .header-close {
      float: right;
      display: block;
      margin: 13px 15px 0 0;
      font-size: 20px;
      color: #77889e;
      cursor: pointer;
      transition: color .2s linear;

      &:hover {
        color: #2386EE;
      }
    }
  }


  %dialog-body {
    padding: 20px 24px;
    color: #343E4C;
    font-size: 12px;
  }

  %dialog-footer {
    padding: 10px 20px;
    text-align: center;
    line-height: 1;
    box-sizing: border-box;
    border-top: 1px solid #D3Dee8;
    background: #F1F4FB;

    // .dialog-btns {
    //   display: block;
    //   margin-bottom: 40px;
    // }

    button:nth-child(2) {
      margin-left: 14px;
    }
  }
</style>
