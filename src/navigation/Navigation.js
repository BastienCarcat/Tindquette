import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import SignIn from '../components/authentification/SignIn'
import SignUp from '../components/authentification/SignUp'
import Home from '../components/home/Home'
import ListDisquettes from '../components/favorites/ListDisquettes'
import Profile from '../components/profile/Profile'
import FormAdd from '../components/add/FormAdd'
import Validation from '../components/profile/admin/Validation'
import UsersManagement from '../components/profile/admin/UsersManagement'
import { connect } from 'react-redux'
import _ from 'lodash'
import Account from '../components/profile/Account'

const Logo = () => {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={require('../../assets/logo.png')}
        />
    )
}

const AuthStack = createStackNavigator()

const AuthStackScreen = () => {
    return (
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
    )
}

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{ headerTitle: (props) => <Logo {...props} /> }}
            />
        </HomeStack.Navigator>
    )
}

const FavoritesStack = createStackNavigator()

const FavoritesStackScreen = () => {
    return (
        <FavoritesStack.Navigator initialRouteName="Favorites">
            <FavoritesStack.Screen
                name="Favorites"
                component={ListDisquettes}
                options={{ headerTitle: (props) => <Logo {...props} /> }}
            />
        </FavoritesStack.Navigator>
    )
}

const ProfileStack = createStackNavigator()

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator initialRouteName="Profile">
            <ProfileStack.Screen
                name="Profile"
                component={Profile}
                options={{ headerTitle: (props) => <Logo {...props} /> }}
            />
            <ProfileStack.Screen
                name="Validation"
                component={Validation}
                options={{ headerTitle: (props) => <Logo {...props} /> }}
            />
            <ProfileStack.Screen
                name="UsersManagement"
                component={UsersManagement}
                options={{ headerTitle: (props) => <Logo {...props} /> }}
            />
            <ProfileStack.Screen
                name="Account"
                component={Account}
                options={{ headerTitle: (props) => <Logo {...props} /> }}
            />
        </ProfileStack.Navigator>
    )
}

const AddStack = createStackNavigator()

const AddStackScreen = () => {
    return (
        <AddStack.Navigator initialRouteName="Add">
            <AddStack.Screen
                name="Add"
                component={FormAdd}
                options={{ headerTitle: (props) => <Logo {...props} /> }}
            />
        </AddStack.Navigator>
    )
}

const AppTabs = createBottomTabNavigator()
const AppTabsScreen = () => {
    return (
        <AppTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home-sharp' : 'home-outline'
                            break
                        case 'Favorites':
                            iconName = focused ? 'heart' : 'heart-outline'
                            break
                        case 'Profile':
                            iconName = focused
                                ? 'person-circle'
                                : 'person-circle-outline'
                            break
                        case 'Add':
                            iconName = focused
                                ? 'add-circle'
                                : 'add-circle-outline'
                            break
                        default:
                            break
                    }
                    return (
                        <Ionicons name={iconName} color={color} size={size} />
                    )
                },
            })}
        >
            <AppTabs.Screen
                name="Home"
                options={() => ({
                    title: 'Accueil',
                })}
                component={HomeStackScreen}
            />
            <AppTabs.Screen
                name="Add"
                options={() => ({
                    title: 'Ajouter',
                })}
                component={AddStackScreen}
            />
            <AppTabs.Screen
                name="Favorites"
                options={() => ({
                    title: 'Favoris',
                })}
                component={FavoritesStackScreen}
            />
            <AppTabs.Screen
                name="Profile"
                options={() => ({
                    title: 'Profile',
                })}
                component={ProfileStackScreen}
            />
        </AppTabs.Navigator>
    )
}

export const Nav = ({ user }) => {
    return (
        <NavigationContainer>
            {_.isEmpty(user) ? <AuthStackScreen /> : <AppTabsScreen />}
            {/* {false ? <AuthStackScreen /> : <AppTabsScreen />} */}
        </NavigationContainer>
    )
}

// export default Nav
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Nav)
