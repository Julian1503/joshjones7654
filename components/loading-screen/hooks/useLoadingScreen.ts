'use client'

import { useState, useEffect } from 'react'

export function useLoadingScreen() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Si el documento ya está cargado cuando el componente monta, igual
        // mostramos la pantalla el tiempo mínimo para que la animación termine.
        // El onCompleteAction que viene del componente se encarga de ocultarla.
    }, [])

    const handleComplete = () => {
        setIsVisible(false)
    }

    return { isVisible, handleComplete }
}