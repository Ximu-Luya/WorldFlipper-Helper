import weapon from "@/static/weapon.json";
export default {
  namespaced: true,
  state: {
    characters: [],
    weapons: [],
  },
  getters: {
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
    // 初始化武器数据
    initWeapons(state, weapons) {
      state.weapons = weapons;
    },
    // 初始化角色数据
    initCharacters(state, characters) {
      state.characters = characters;
    },
  },
  actions: {
    // 获取图鉴数据
    async getHandbookData({ commit, dispatch }) {
      const weapons = [weapon];
      const characters = [];
      commit("initWeapons", weapons);
      commit("initCharacters", characters);
      // 同步贡献者的本地数据
      dispatch(
        "contributor/syncHandbookData",
        { weapons, characters },
        { root: true }
      );
    },
  },
};
