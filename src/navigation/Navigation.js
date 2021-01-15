import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../components/screens/authentification/SignIn'
import SignUp from '../components/screens/authentification/SignUp'

const AuthStack = createStackNavigator()

const AuthNav = () => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="SignIn">
                <AuthStack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ title: 'Se connecter' }}
                />
                <AuthStack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ title: 'Créer un compte' }}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}

export default AuthNav
