import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialVal: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonVal = localStorage.getItem(key)
        if (jsonVal == null) {
            if (typeof initialVal === 'function') {
                return (initialVal as () => T)()
            } else {
                return initialVal
            }
        } else {
            return JSON.parse(jsonVal)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [T, typeof setValue]
}