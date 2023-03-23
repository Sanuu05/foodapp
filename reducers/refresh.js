const init = {
    post: [],
    del: []
}

export default (state = init, action) => {
    switch (action.type) {
        case "POST_TOP":
            return {
                post: action.payload.data
            }
        case "DEL_TOP":
            return {
                del: action.payload.data
            }

        default: return state
    }
}