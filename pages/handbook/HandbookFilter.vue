<template>
  <view class="filter-content">
    <template v-for="(filterItem, filterIndex) in filterConfig">
      <view class="cu-bar bg-white  margin-top solid-bottom" :key="filterIndex">
        <view class="action">
          <text class="cuIcon-title text-blue"></text>{{filterItem.title}}
        </view>
      </view>
      <view class="padding bg-white" :key="filterIndex">
        <checkbox-group @change="starSelect" class="checkbox-group">
          <template v-for="(item, index) in filterItem.values">
            <label :key="index" class="checkbox">
              <checkbox :value="item" style="transform:scale(0.6)"/>
              <image v-if="filterItem.imageTag" :src="`/static/image/icon/${item}.png`" mode="heightFix" class="filter-image">
              <text v-if="filterItem.textTags.length !== 0">{{filterItem.textTags[index]}}</text>
            </label>
          </template>
        </checkbox-group>
      </view>
    </template>

    <view class="cu-bar bg-white margin-top solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-blue"></text>排序
      </view>
    </view>
    <view class="padding bg-white">
      <radio-group @change="sortFilterChange" class="radio-group margin-bottom">
        <label v-for="(item, index) in sortFilters" :key="index" class="radio-label">
          <radio :value="item.value"/>{{item.label}}
        </label>
      </radio-group>

      <radio-group @change="sortOrderChange" class="radio-group margin-bottom">
        <label class="radio-label">
          <radio value="ascending"/>升序
        </label>
        <label class="radio-label">
          <radio value="descending"/>降序
        </label>
      </radio-group>
    </view>

    <view class="cu-bar bg-white  margin-top solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-blue"></text>其他筛选
      </view>
    </view>
    <view class="padding bg-white">
      <label class="switch-label">
        觉醒头像：<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
      </label>
      
      <label class="switch-label">
        只看New：<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
      </label>
      
      <label class="switch-label">
        只看6技角色：<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
      </label>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return {
      filterConfig: [
        {title: '星级', values: ['star-1', 'star-2','star-3','star-4','star-5',], imageTag: true},
        {title: '属性', values: ['fire', 'nature', 'thunder', 'water', 'light', 'dark'], imageTag: true},
        {title: '职业', values: ['special', 'fighter', 'shooter', 'supporter', 'swordsman'], imageTag: true, textTags: ['特殊', '格斗家', '射手', '辅助', '剑士']},
        {title: '性别', values: ['man', 'women', 'unknown', 'lili'], textTags: ['男', '女', '不明', 'リリィ(莉莉)']},
        {title: '种族', values: ['human', 'dragon', 'demon', 'monster', 'beast', 'immortal', 'plant', 'elf', 'mechanical', 'amphibious'], textTags: ['人', '龙', '妖', '魔', '兽', '不死', '植物', '精灵', '机械', '两栖']},
      ],
      sortFilters: [
        {label: '星级', value: 'star'},
        {label: '技能槽', value: 'skillSlot'},
        {label: 'HP(血量)', value: 'hp'},
        {label: 'ATK(攻击力)', value: 'atk'},
        {label: '技能倍率', value: 'skillRate'},
        {label: '技能HIT', value: 'skillHit'},
      ],
      switchC: false
    }
  },
  methods: {
    starSelect({detail}){
      console.log(detail.value);
    }
  }
}
</script>

<style lang="scss">
.filter-content{
  overflow: hidden;
  margin-right: 30rpx;


  .checkbox-group{
    display: flex;
    flex-wrap: wrap;

    .checkbox{
      display: flex;
      align-items: center;

      .filter-image{
        height: 30rpx;
      }
    }
  }

  .radio-group{
    display: flex;
    flex-wrap: wrap;

    .radio-label{
      display: flex;
      align-items: center;
      margin: -0.5rpx -1rpx;
      padding-right: 10rpx;
      border: #DCDFE6 solid 2rpx;

      &[aria-checked="true"]{
        &{
          border-color: #39b54a;
          background-color: #39b54a;
          color: white;
        }
      }

      radio{
        transform:scale(0.7)
      }
    }
  }

  .switch-label{
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
    switch{
      transform:scale(0.9)
    }
  }
}
</style>