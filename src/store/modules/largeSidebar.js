
const largeSidebar = {

    namespaced: true,
    state: {
        sidebarToggleProperties: {
            isSideNavOpen: true,
           
        }
    },
    getters: {
        getSideBarToggleProperties: state => state.sidebarToggleProperties
       

    },

    mutations: {

        toggleSidebarProperties: state =>
        (state.sidebarToggleProperties.isSideNavOpen = !state
          .sidebarToggleProperties.isSideNavOpen),
    },
}
export default largeSidebar;
