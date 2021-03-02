import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Item, Input, Button, Text } from 'native-base'

const SignIn = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 2,
                    justifyContent: 'center',
                }}
            >
                <Image
                    style={styles.img}
                    source={require('../../../assets/logo.png')}
                />
            </View>
            <View style={{ flex: 2 }}>
                <Item rounded style={styles.email}>
                    <Input placeholder="Addresse mail" />
                </Item>
                <Item rounded style={styles.password}>
                    <Input placeholder="Mot de passe" />
                </Item>
                <Button
                    rounded
                    style={styles.button}
                    // onPress={() =>
                    // navigation.navigate(
                    //     'HomeStackScreen',
                    //     {},
                    //     NavigationActions.navigate({
                    //         routeName: 'Home',
                    //     }),
                    // )
                    // }
                >
                    <Text>Se connecter</Text>
                </Button>
                <View style={styles.signUp}>
                    <Text>Nouveau ici ? </Text>
                    <Text
                        style={styles.signUpLink}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        S'inscrire
                    </Text>
                </View>
            </View>
            <Text style={styles.footer}>Tindquette</Text>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    email: {
        width: 350,
    },
    password: {
        width: 350,
        marginTop: 16,
    },
    button: {
        alignSelf: 'center',
        marginTop: 60,
        backgroundColor: '#FF515B',
    },
    img: {
        width: 200,
        height: 200,
    },
    signUp: {
        marginTop: 20,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    signUpLink: {
        color: '#FF515B',
        textDecorationLine: 'underline',
    },
    footer: {
        fontSize: 12,
        fontStyle: 'italic',
    },
})
