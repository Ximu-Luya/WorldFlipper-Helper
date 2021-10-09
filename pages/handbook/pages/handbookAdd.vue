<template>
  <view class="add-container flex flex-direction" :style="{'padding-bottom': bottomSafeArea}">
    <top-nav :isBack="true"></top-nav>

    <u-form :model="characterForm" ref="characterForm">
      <u-form-item
        v-for="(item, index) in formConfig"
        :key="index"
        :prop="item.key"
      >
        <view class="cu-form-group" :class="{'margin-top': item.marginTop}">
          <view class="title"> {{item.label}} </view>
          <template v-if="item.type==='input'">
            <u-input v-model="characterForm[item.key]" :placeholder="item.placeholder" />
          </template>
          
          <template v-else-if="item.type==='input-number'">
            <u-input
              v-model="characterForm[item.key]"
              type="number"
              :placeholder="item.placeholder"
            />
          </template>

          <template v-else-if="item.type==='select'">
            <xm-picker
            v-model="characterForm[item.key]"
            :options="item.options"
            :placeholder="item.placeholder"
          ></xm-picker>
          </template>
        </view>
      </u-form-item>
    </u-form>

    <button class="cu-btn bg-red margin-tb-sm lg" @tap="generateJson">生成JSON</button>

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
// 职业选项
const typeOptions = [
  { value: "special", label: "特殊" },
  { value: "fighter", label: "格斗家" },
  { value: "shooter", label: "射手" },
  { value: "supporter", label: "辅助" },
  { value: "swordsman", label: "剑士" },
];
// 种族选项
const raceOptions = [
  { value: "human", label: "人" },
  { value: "dragon", label: "龙" },
  { value: "demon", label: "妖" },
  { value: "monster", label: "魔" },
  { value: "beast", label: "兽" },
  { value: "immortal", label: "不死" },
  { value: "plant", label: "植物" },
  { value: "elf", label: "精灵" },
  { value: "mechanical", label: "机械" },
  { value: "amphibious", label: "两栖" },
];
// 性别选项
const sexOptions = [
  { value: "male", label: "男" },
  { value: "female", label: "女" },
  { value: "unknown", label: "不明" },
  { value: "lili", label: "リリィ(莉莉)" },
];

export default {
  components: { XmPicker },
  data() {
    return {
      bottomSafeArea: this.bottomSafeArea+'px',
      jsonStr: '',
      characterForm: {},
      formConfig: [
        {
          key: "cnName",
          label: "中文名称",
          placeholder: "例：希尔媞",
          type: "input",
          marginTop: true,
        },
        {
          key: "jpName",
          label: "日文名称",
          placeholder: "例：シルティー",
          type: "input",
        },
        {
          key: "designation",
          label: "称号",
          placeholder: "例：星の少女騎士",
          type: "input",
        },
        {
          key: "HP",
          label: "HP",
          placeholder: "输入角色满级的血量",
          type: "input-number",
        },
        {
          key: "ATK",
          label: "攻击力",
          placeholder: "输入角色满级的攻击力",
          type: "input-number",
        },
        {
          key: "CV",
          label: "CV",
          placeholder: "输入角色声优名字",
          type: "input",
        },
        {
          key: "commonTachie",
          label: "普通立绘",
          placeholder: "普通立绘图片链接",
          type: "input",
          marginTop: true,
        },
        {
          key: "awakeTachie",
          label: "觉醒立绘",
          placeholder: "觉醒立绘图片链接",
          type: "input",
        },
        {
          key: "commonAvatar",
          label: "普通头像",
          placeholder: "普通头像图片链接",
          type: "input",
        },
        {
          key: "awakeAvatar",
          label: "觉醒头像",
          placeholder: "觉醒头像图片链接",
          type: "input",
        },
        {
          key: "starRating",
          label: "星级",
          placeholder: "请选择星级",
          type: "select",
          options: starRatingOptions,
          marginTop: true,
        },
        {
          key: "attribute",
          label: "属性",
          placeholder: "请选择属性",
          type: "select",
          options: attributeOptions,
        },
        {
          key: "type",
          label: "职业",
          placeholder: "请选择职业",
          type: "select",
          options: typeOptions,
        },
        {
          key: "race",
          label: "种族",
          placeholder: "请选择种族",
          type: "select",
          options: raceOptions,
        },
        {
          key: "sex",
          label: "性别",
          placeholder: "请选择性别",
          type: "select",
          options: sexOptions,
        },
      ],
      weaponForm: {},
    };
  },
  methods: {
    generateJson(){
      this.$refs['characterForm'].validate(valid => {
        if(valid) {
          this.jsonStr = JSON.stringify(this.$refs['characterForm'].model, null, 4)
        }
      })
    }
  },
  mounted(){
    this.formConfig.forEach(item => {
      this.$set(this.characterForm, item.key, null)
    })
    console.log(this.$refs["characterForm"]);
    console.log(1);
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