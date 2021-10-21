<template>
  <view class="add-container flex flex-direction" :style="{'padding-bottom': bottomSafeArea}">
    <top-nav :isBack="true"></top-nav>

    <u-form :error-type="['toast']" :model="characterForm" ref="characterForm">
      <u-form-item
        v-for="(item, index) in formConfig"
        :key="index"
        :prop="item.key"
      >
        <view class="cu-form-group" :class="{'margin-top': item.marginTop}">
          <view class="title"> {{item.label}} </view>
          <template v-if="item.type==='input'">
            <u-input
              v-model="characterForm[item.key]"
              :placeholder="item.placeholder"
            />
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

          <template v-if="item.type==='textarea'">
            <u-input
              v-model="characterForm[item.key]"
              type="textarea"
              :placeholder="item.placeholder"
              :maxlength="Infinity"
              :height="120"
            />
          </template>
          
          <template v-if="item.type==='switch'">
            <u-switch v-model="characterForm[item.key]"></u-switch>
          </template>
        </view>
      </u-form-item>

      <!-- 被动能力 -->
      <template v-for="(item, index) in abilitysIndex">
        <u-form-item
          :key="index"
          :prop="`abilitys_${item}`"
          v-if="characterForm.isSix || item <= 3"
        >
          <view class="cu-form-group">
            <view class="title">能力 {{item}} </view>
            <u-input
              v-model="characterForm['abilitys_'+item]"
              type="textarea"
              :placeholder="`填写能力${item}`"
              :maxlength="Infinity"
              :height="120"
            />
          </view>
        </u-form-item>
      </template>
    </u-form>
    
    <!-- 生成JSON按钮 -->
    <button class="cu-btn bg-red margin-tb-sm margin-lr-sm lg" @tap="generateJson">生成JSON</button>
    <!-- JSON文本显示 -->
    <u-input v-if="jsonStr!==''" v-model="jsonStr" type="textarea" border :focus="true" :maxlength="Infinity" />
  </view>
</template>

<script>

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
  data() {
    return {
      bottomSafeArea: this.bottomSafeArea+'px',
      jsonStr: '',
      characterForm: {
        cnName: "",
        jpName: "",
        designation: "",
        HP: "",
        ATK: "",
        CV: "",
        commonTachie: "",
        awakeTachie: "",
        commonAvatar: "",
        awakeAvatar: "",
        starRating: null,
        attribute: null,
        type: null,
        race: null,
        sex: null,
        skill_title: "",
        skill_description: "",
        skill_data: "",
        skill_energy: "",
        leaderSkill_title: "",
        leaderSkill_description: "",
        isSix: true,
        abilitys_1: "",
        abilitys_2: "",
        abilitys_3: "",
        abilitys_4: "",
        abilitys_5: "",
        abilitys_6: "",
      },
      formConfig: [
        {
          key: "cnName",
          label: "中文名称",
          placeholder: "例：希尔媞",
          type: "input",
          marginTop: true,
          rule: [
            {required: true, message: '中文名不能为空', trigger: 'change'},
            {max: 3, message:'123', trigger: 'blur'}
          ],
        },
        {
          key: "jpName",
          label: "日文名称",
          placeholder: "例：シルティー",
          type: "input",
          rule: [{required: true, message: '日文名不能为空'}],
        },
        {
          key: "designation",
          label: "称号",
          placeholder: "例：星の少女騎士",
          type: "input",
          rule: [{required: true, message: '称号不能为空'}],
        },
        {
          key: "HP",
          label: "HP",
          placeholder: "输入角色满级的血量",
          type: "input-number",
          rule: [
            {required: true, message: 'HP为空'},
            {type: 'number', message: 'HP必须为数字'}
          ],
        },
        {
          key: "ATK",
          label: "攻击力",
          placeholder: "输入角色满级的攻击力",
          type: "input-number",
          rule: [
            {required: true, message: '攻击力为空'},
            {type: 'number', message: '攻击力必须为数字'}
          ],
        },
        {
          key: "CV",
          label: "CV",
          placeholder: "输入角色声优名字",
          type: "input",
          rule: [{required: true, message: '声优名不能为空'}],
        },
        {
          key: "commonTachie",
          label: "普通立绘",
          placeholder: "普通立绘图片链接",
          type: "input",
          marginTop: true,
          rule: [{required: true, message: '立绘图片链接不能为空'}],
        },
        {
          key: "awakeTachie",
          label: "觉醒立绘",
          placeholder: "觉醒立绘图片链接",
          type: "input",
          rule: [{required: true, message: '立绘图片链接不能为空'}],
        },
        {
          key: "commonAvatar",
          label: "普通头像",
          placeholder: "普通头像图片链接",
          type: "input",
          rule: [{required: true, message: '立绘图片链接不能为空'}],
        },
        {
          key: "awakeAvatar",
          label: "觉醒头像",
          placeholder: "觉醒头像图片链接",
          type: "input",
          rule: [{required: true, message: '立绘图片链接不能为空'}],
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
          key: "type",
          label: "职业",
          placeholder: "请选择职业",
          type: "select",
          options: typeOptions,
          rule: [{required: true, message: '职业不能为空'}],
        },
        {
          key: "race",
          label: "种族",
          placeholder: "请选择种族",
          type: "select",
          options: raceOptions,
          rule: [{required: true, message: '种族不能为空'}],
        },
        {
          key: "sex",
          label: "性别",
          placeholder: "请选择性别",
          type: "select",
          options: sexOptions,
          rule: [{required: true, message: '性别不能为空'}],
        },
        {
          key: "skill_title",
          label: "主动技能名称",
          placeholder: "例：自身[神速剑技]增加2层，以疾风般的剑术对前后方敌人造成风伤害 / 赋予我方加速效果",
          type: "input",
          marginTop: true,
          rule: [{required: true, message: '主动技能名称不能为空'}],
        },
        {
          key: "skill_description",
          label: "主动技能描述",
          placeholder: "例：自身[神速剑技]增加2层，以疾风般的剑术对前后方敌人造成风伤害 / 赋予我方加速效果",
          type: "textarea",
          rule: [{required: true, message: '主动技能描述不能为空'}],
        },
        {
          key: "skill_data",
          label: "主动技能数据",
          placeholder: "例：最大攻击段数2，最大倍率28 / 神速剑技+ 2 / 加速效果30%持续15秒",
          type: "textarea",
        },
        {
          key: "skill_energy",
          label: "主动技能能量",
          placeholder: "例：390（纯数字）",
          type: "input-number",
        },
        {
          key: "leaderSkill_title",
          label: "队长技能名称",
          placeholder: "例：剑鬼·二刀流+",
          type: "input",
          marginTop: true,
          rule: [{required: true, message: '队长技能名称不能为空'}],
        },
        {
          key: "leaderSkill_description",
          label: "队长技能描述",
          placeholder: "例：风属性角色攻击力+ 50 %\n自身[神速剑技]每有1层时，风属性角色的攻击力+ 5%[最大+ 100%]",
          type: "textarea",
          rule: [{required: true, message: '队长技能描述不能为空'}],
        },
        {
          key: "isSix",
          label: "是否6技",
          type: "switch",
          marginTop: true,
        },
      ],
      abilitysIndex: [1,2,3,4,5,6],
    };
  },
  methods: {
    // 是否6技开关change事件
    switchChange(value){
      this.characterForm.isSix = value ? 6 : 3
    },
    // 生成JSON字符串
    generateJson(){
      this.$refs['characterForm'].validate(valid => {
        if(valid) {
          this.jsonStr = JSON.stringify(this.$refs['characterForm'].model, null, 4)
        }
      })
    },
  },
  mounted(){},
  onReady() {
    let rules = {}
    // 遍历表单配置信息提取其rule配置
    this.formConfig.forEach(({key, rule}) => { rules[key] = rule })
    // 为被动技能项配置验证规则
    this.abilitysIndex.forEach(item => {
      rules[`abilitys_${item}`] = item<=3
      ? [{required: true, message: `能力${item}不能为空`}]
      : [{
        validator: (rule, value, callback) => {
          if(this.characterForm.isSix && value == '') callback(new Error(`6技角色的能力${item}不能为空`))
          else callback()
        },
      }]
    })
    this.$refs['characterForm'].setRules(rules);
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