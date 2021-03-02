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
                    source={require('../../../../assets/logo.png')}
                />
            </View>
            <View style={{ flex: 2 }}>
                <Item rounded style={styles.width}>
                    <Input placeholder="Pseudo" />
                </Item>
                <Item rounded style={styles.margin}>
                    <Input placeholder="Adresse mail" />
                </Item>
                <Item rounded style={styles.margin}>
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
                    <Text>S'inscrire</Text>
                </Button>
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
    width: {
        width: 350,
    },
    margin: {
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
    footer: {
        fontSize: 12,
        fontStyle: 'italic',
    },
})
