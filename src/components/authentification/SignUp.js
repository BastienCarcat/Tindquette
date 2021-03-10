import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Item, Input, Button, Text, Form } from 'native-base'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import axios from 'axios'
const SignIn = ({ navigation }) => {
    const [pseudo, setPseudo] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        newUser()
    }

    const newUser = () => {
        axios
            .post('http://localhost:8080/user', {
                mail: mail,
                pseudo: pseudo,
                password: password,
                isAdmin: 0,
            })
            .then(function (response) {
                console.log(response)
                if (response.data === 'OK') {
                    navigation.navigate('SignIn')
                }
            })
            .catch(function (error) {
                console.error(error)
            })
    }

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
                <Form>
                    <Item rounded style={styles.width}>
                        <Input
                            placeholder="Pseudo"
                            value={pseudo}
                            onChangeText={(text) => setPseudo(text)}
                        />
                    </Item>
                    <Item rounded style={styles.margin}>
                        <Input
                            placeholder="Adresse mail"
                            value={mail}
                            onChangeText={(text) => setMail(text)}
                        />
                    </Item>
                    <Item rounded style={styles.margin}>
                        <Input
                            placeholder="Mot de passe"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </Item>
                    <Button
                        rounded
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text>S'inscrire</Text>
                    </Button>
                </Form>
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
