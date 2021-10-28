export default {
  namespaced: true,
  state: {
    characters: [],
    weapons: [],
  },
  getters: {
    // 返回所有数据的JSON字符串
    generateJson: (state) => {
      return JSON.stringify(state, null, 4);
    },
    // 通过uuid查询角色
    getCharacterByUuid: (state) => (uuid) => {
      return state.characters.find(
        (item) => item.uuid === uuid
      );
    },
    // 通过uuid查询武器
    getWeaponByUuid: (state) => (uuid) => {
      return state.weapons.find(
        (item) => item.uuid === uuid
      );
    },
  },
  mutations: {
    // 初始化贡献者本地数据
    initData(state, data) {
      state.characters = data.characters;
      state.weapons = data.weapons;
    },
    // 设置已有数据
    setDataByUuid(state, payload) {
      // 根据uuid寻找要修改的数据
      const dataIndex = state[payload.type].findIndex(
        (item) => item.uuid === payload.data.uuid
      );
      /**
       * 替换指定内容
       * 若找不到指定uuid则push新内容
       */
      dataIndex !== -1
        ? (state[payload.type] = state[payload.type].splice(
            dataIndex,
            1,
            payload.data
          ))
        : state[payload.type].push(payload.data);
      
      console.log(state);
    },
  },
  actions: {
    // 同步远程图鉴数据
    syncHandbookData({ commit }, data) {
      commit("initData", data);
    },
    // 替换指定角色信息
    setChatacterInfo({ commit }, data) {
      commit("setDataByUuid", { type: "characters", data });
    },
    // 替换指定武器信息
    setWeaponInfo({ commit }, data) {
      commit("setDataByUuid", { type: "weapons", data });
    },
  },
};
