import { createStore } from 'vuex'

import largeSidebar from './modules/largeSidebar'
import userInfo from './modules/userInfo'
export default createStore({
    modules: {
        largeSidebar,
        userInfo,
    },
})
