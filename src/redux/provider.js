// this will be the client component -> because it works on the client componet

"use client"

import { Provider } from "react-redux"
import { store } from "./store"


function Providers({children}) {
    return <Provider store={store}>{children}</Provider>
}

export default Providers