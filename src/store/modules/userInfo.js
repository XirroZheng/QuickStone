export default {
    namespaced: true,
    state: () => ({
        userName: null,
        userId: null,
        userRole: null,
        isLoggedIn: null,
        userAvatar: null,
    }),
    mutations: {
        setUserName(state, name) {
            state.userName = name
        },
        setUserRole(state, role) {
            state.userRole = role
        },
        isLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn
        },
        setUserId(state, id) {
            state.userId = id
        },
        setUserAvatar(state, avatar) {
            state.userAvatar = avatar
        },
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        getUserName: (state) => state.userName || '',
        getUserRole: (state) => state.userRole || '',
        getUserId: (state) => state.userId || '',
        getUserAvatar: (state) => state.userAvatar || '',
    },
}
