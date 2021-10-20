<template>
  <view class="add-container flex flex-direction" :style="{'padding-bottom': bottomSafeArea}">
    <top-nav :isBack="true"></top-nav>

    <u-form :error-type="['toast']" :model="weaponForm" ref="weaponForm">
      <u-form-item
        v-for="(item, index) in formConfig"
        :key="index"
        :prop="item.key"
      >
        <view class="cu-form-group" :class="{'margin-top': item.marginTop}">
          <view class="title"> {{item.label}} </view>
          <template v-if="item.type==='input'">
            <u-input
              v-model="weaponForm[item.key]"
              :placeholder="item.placeholder"
            />
          </template>

          <template v-else-if="item.type==='select'">
            <xm-picker
              v-model="weaponForm[item.key]"
              :options="item.options"
              :placeholder="item.placeholder"
            ></xm-picker>
          </template>

          <template v-if="item.type==='textarea'">
            <u-input
              v-model="weaponForm[item.key]"
              type="textarea"
              :placeholder="item.placeholder"
              :maxlength="Infinity"
              :height="120"
            />
          </template>
          
          <template v-if="item.type==='switch'">
            <u-switch v-model="weaponForm[item.key]"></u-switch>
          </template>
        </view>
      </u-form-item>

      <!-- 武器每级能力 -->
      <template v-for="(propItem, index) in awakableProp">
        <view class="cu-bar bg-white solid-bottom margin-top" :key="index">
          <view class="action">
            <text class="cuIcon-title text-blue"></text>{{propItem==='skill'?'武器效果':propItem}}
          </view>
        </view>
        <template v-for="(item, index) in awakeLvIndex">
          <u-form-item
            :key="index"
            :prop="`${propItem}_${item}`"
            v-if="!weaponForm.isOnlyMax || item===4"
          >
            <view class="cu-form-group">
              <view class="title">觉醒等级 {{item===4?'Max':item}} </view>
              <template v-if="propItem==='skill'">
                <u-input
                  v-model="weaponForm['skill_'+item]"
                  type="textarea"
                  :placeholder="`填写觉醒等级${item===4?'Max':item}的武器效果`"
                  :maxlength="Infinity"
                  :height="120"
                />
              </template>
              
              <template v-else>
                <u-input
                  v-model="weaponForm[propItem+'_'+item]"
                  type="number"
                  :placeholder="`填写觉醒等级${item===4?'Max':item}的${propItem}`"
                />
              </template>
            </view>
          </u-form-item>
        </template>
      </template>
      
    </u-form>
    
    <!-- 生成JSON按钮 -->
    <button class="cu-btn bg-red margin-tb-sm margin-lr-sm lg" @tap="generateJson">生成JSON</button>
    <!-- JSON文本显示 -->
    <u-input v-if="jsonStr!==''" v-model="jsonStr" type="textarea" border :focus="true" :maxlength="Infinity" />
  </view>
</template>

<script>
import XmPicker from "../../../components/picker.vue";

// 星级选项
const starRatingOptions = [
  { value: 1, label: "1星" },
  { value: 2, label: "2星" },
  { value: 3, label: "3星" },
  { value: 4, label: "4星" },
  { value: 5, label: "5星" },
];
// 属性选项
const attributeOptions = [
  { value: "fire", label: "火" },
  { value: "wind", label: "风" },
  { value: "thunder", label: "雷" },
  { value: "water", label: "水" },
  { value: "light", label: "光" },
  { value: "dark", label: "暗" },
];


export default {
  components: { XmPicker },
  data() {
    return {
      bottomSafeArea: this.bottomSafeArea+'px',
      jsonStr: '',
      weaponForm: {
        cnName: "",
        jpName: "",
        weaponImg: "",
        obtain: "",
        starRating: "",
        attribute: "",
        isOnlyMax: false,
        HP_0: "",
        HP_1: "",
        HP_2: "",
        HP_3: "",
        HP_4: "",
        ATK_0: "",
        ATK_1: "",
        ATK_2: "",
        ATK_3: "",
        ATK_4: "",
        skill_0: "",
        skill_1: "",
        skill_2: "",
        skill_3: "",
        skill_4: "",
      },
      formConfig: [
        {
          key: "cnName",
          label: "中文名称",
          placeholder: "例：普罗米修斯之剑",
          type: "input",
          marginTop: true,
          rule: [{required: true, message: '中文名不能为空'}],
        },
        {
          key: "jpName",
          label: "日文名称",
          placeholder: "例：",
          type: "input",
        },
        {
          key: "weaponImg",
          label: "武器图标",
          placeholder: "武器图标图片链接",
          type: "input",
          rule: [{required: true, message: '武器图标图片链接不能为空'}],
        },
        {
          key: "obtain",
          label: "入手方法",
          placeholder: "输入入手方法",
          type: "textarea",
        },
        {
          key: "starRating",
          label: "星级",
          placeholder: "请选择星级",
          type: "select",
          options: starRatingOptions,
          marginTop: true,
          rule: [{required: true, message: '星级不能为空'}],
        },
        {
          key: "attribute",
          label: "属性",
          placeholder: "请选择属性",
          type: "select",
          options: attributeOptions,
          rule: [{required: true, message: '属性不能为空'}],
        },
        {
          key: "isOnlyMax",
          label: "是否只有觉醒Max",
          type: "switch",
          marginTop: true,
        },
      ],
      awakeLvIndex: [0,1,2,3,4],
      awakableProp: ['HP', 'ATK', 'skill']
    };
  },
  methods: {
    // 生成JSON字符串
    generateJson(){
      this.$refs['weaponForm'].validate(valid => {
        if(valid) {
          this.jsonStr = JSON.stringify(this.$refs['weaponForm'].model, null, 4)
        }
      })
    },
  },
  onReady() {
    let rules = {}
    // 遍历表单配置信息提取其rule配置
    this.formConfig.forEach(({key, rule}) => { rules[key] = rule || [] })
    /**
     * 配置武器HP、ATK、武器效果的验证规则
     * 允许只填写Max觉醒等级的信息
     */
    this.awakableProp.forEach(item => {
      this.awakeLvIndex.forEach(index => {
        rules[`${item}_${index}`] = index === 4
        ? [{
          required: true, 
          message: `只有觉醒Max时,${item==='skill'?'武器效果':item}的Max等级不能为空`
        }]
        : []
      })
    })
    this.$refs['weaponForm'].setRules(rules);
  }
};
</script>

<style lang="scss">
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
.u-form-item {
  padding: 0 !important;
}
</style>