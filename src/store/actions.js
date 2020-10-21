
const actions = {
    setMenu({commit}, menuList) {
        commit('RECEIVE_MENU_LIST', menuList);
    }
};

export default actions;