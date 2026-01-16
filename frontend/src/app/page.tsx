"use client"

import React from "react"


export default function Page () {
    React.useEffect(() => {
        if (window.location.pathname === "/") window.location.href = "/home"    
    })
    return
} 