import React from 'react'
import Nav from './src/navigation/Navigation'
// import { useFonts } from 'expo-font'
import { useFonts, Barlow_200ExtraLight } from '@expo-google-fonts/barlow'
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'

const App = () => {
    const [loaded] = useFonts({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        Barlow_200ExtraLight,
        ...Ionicons.font,
    })

    if (!loaded) {
        return <ActivityIndicator size="large" />
    }
    return (
        <SafeAreaView style={styles.container}>
            <Nav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default App
