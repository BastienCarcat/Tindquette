import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Item, Input, Button, Text } from 'native-base'
import axios from 'axios'
import { connect } from 'react-redux'
import { addUser } from '../../store/actions'

const SignIn = ({ addUser, navigation }) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        connexion()
    }

    const connexion = () => {
        axios
            .post('http://localhost:8080/connection', {
                mail: mail,
                password: password,
            })
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    addUser(response.data)
                }
            })
            .catch(function (error) {
                console.error(error)
            })
        return null
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
                <Item rounded style={styles.email}>
                    <Input
                        placeholder="Addresse mail"
                        value={mail}
                        onChangeText={(text) => setMail(text)}
                    />
                </Item>
                <Item rounded style={styles.password}>
                    <Input
                        placeholder="Mot de passe"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </Item>
                <Button rounded style={styles.button} onPress={handleSubmit}>
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

export default connect(null, { addUser })(SignIn)

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
