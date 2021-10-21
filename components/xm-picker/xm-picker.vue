<template>
  <view class="u-select">
    <u-select
      v-model="show"
      mode="single-column"
      :list="options"
      :placeholder="placeholder"
      @confirm="onConfirm"
    ></u-select>
    <view class="selector-button" @tap="show = true">
      {{curValue.label || placeholder}}
    </view>
  </view>
</template>

<script>
export default {
  options: {
    virtualHost: true
  },
  props: {
    // 选项
    options: {
      type: Array,
      default: () => [],
      // 检查选项是否有value与label，暂不兼容只有value
      validator: (options) => options.every(item => {
        return item.hasOwnProperty('value') && item.hasOwnProperty('label')
      })
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 绑定值
    value: {
      required: true
    }
  },
  data(){
    return {
      show: false,
      curValue: null
    }
  },
  created() {
    this.matchCurValue()
  },
  methods: {
    // 匹配当前值
    matchCurValue(){
      for(let i=this.options.length-1; i>=0; i--){
        if(this.value === this.options[i].value) {
          this.curValue = this.options[i]
          break
        }

        /** 
         * 若已最后一项仍找不到匹配选项
         * 当前项设置为value
         */
        if(this.value !== this.options[i].value && i===0)
          this.curValue = {value: this.value, label: this.value}
      }
    },
    // 确认选择
    onConfirm(data){
      this.curValue = data[0]
      this.$emit('input', data[0].value)
    }
  }
}
</script>

<style>

</style>