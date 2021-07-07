const cookieParse = process.server ? require("cookieparser") : undefined

export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.headers.cookie) {
            try {
                let parsed = cookieParse.parse(req.headers.cookie)
                commit("setUser", JSON.parse(parsed.user))
            } catch (err) {
                console.log(err)
            }
        }
    }
}
