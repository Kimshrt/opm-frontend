'use client'
import React from 'react'
import { useEffect, useState } from 'react'

export default function Page() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) return <div>Loading...</div>
    if (!user) return <div>No user data found.</div>

    return (
        <div>
            <h1>About Me</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
