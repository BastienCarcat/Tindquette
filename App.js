import React from 'react'
import AuthNav from './src/navigation/Navigation'
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'

const App = () => {
    const [loaded] = useFonts({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
    })

    if (!loaded) {
        return <ActivityIndicator size="large" />
    }
    return <AuthNav />
}

export default App
