import React, { useContext } from 'react'
import ContextAPI from "../contextAPI/ContextAPI"

function Homepage() {

    const context = useContext(ContextAPI)

    return (
        <div>
            This is homepage
        </div>
    )
}

export default Homepage
