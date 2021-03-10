import { Body, Card, CardItem, Text, Form, Button } from 'native-base'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { connect } from 'react-redux'

const FormAdd = ({ user }) => {
    const [input, setInput] = useState('')
    const token = user.token // ICI ON RECUPERA LE TOKEN QU'ON A EU A LA CONNECTION
    const userId = user.userId // ID UTILISATEUR RECUPERER A LA CONNEXION

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )

    const handleSubmit = () => {
        AddDisquette()
    }

    function AddDisquette() {
        const config = {
            headers: { Authorization: 'Bearer ' + token },
        }

        const bodyParameters = {
            content: input,
            userId: userId,
        }

        axios
            .post('http://localhost:8081/disquette', bodyParameters, config)
            .then(function (response) {
                console.log(response)
                if (response.data === 'OK') {
                    setInput('')
                }
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    return (
        // <DismissKeyboard>
        <View style={styles.container}>
            <Card style={styles.card}>
                <LinearGradient
                    colors={['#CD8EFF', '#F57777']}
                    start={[0.2, 0.1]}
                    end={[0.9, 0.4]}
                    style={styles.linearGradient}
                >
                    <LinearGradient
                        colors={[
                            'rgba(174,227,255,0.9)',
                            'rgba(245,119,119,0.2)',
                        ]}
                        start={[1, 0]}
                        end={[0, 0.8]}
                        style={styles.linearGradient}
                    >
                        <CardItem
                            style={{
                                flex: 4,
                                backgroundColor: 'transparent',
                            }}
                        >
                            <Body
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 60,
                                        alignSelf: 'flex-start',
                                        marginBottom: -25,
                                    }}
                                >
                                    "
                                </Text>
                                <Form style={{ alignSelf: 'stretch' }}>
                                    <TextInput
                                        placeholder="Ecrivez nous votre meilleure disquette"
                                        maxLength={120}
                                        style={styles.input}
                                        multiline
                                        value={input}
                                        onChangeText={(text) => setInput(text)}
                                    />
                                </Form>
                                <Text
                                    style={{
                                        fontSize: 60,
                                        alignSelf: 'flex-end',
                                    }}
                                >
                                    "
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem
                            footer
                            style={{
                                flex: 1,
                                justifyContent: 'space-around',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 100,
                                    height: 100,
                                    backgroundColor: 'transparent',
                                    borderRadius: 100,
                                }}
                                onPress={handleSubmit}
                            >
                                <Ionicons
                                    name={'checkmark-circle-outline'}
                                    size={90}
                                    color="#00B990"
                                />
                            </TouchableOpacity>
                        </CardItem>
                    </LinearGradient>
                </LinearGradient>
            </Card>
        </View>
        // </DismissKeyboard>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(FormAdd)
const width_proportion = '90%'
const height_proportion = '80%'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: width_proportion,
        height: height_proportion,
        borderWidth: 2,
        borderColor: '#424242',
        justifyContent: 'center',
        borderRadius: 10,
    },
    input: {
        fontFamily: 'Barlow_200ExtraLight',
        fontSize: 28,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'center',
        height: 65,
    },
    linearGradient: {
        flex: 1,
        borderRadius: 10,
    },
    button: {
        color: '#00B990',
    },
})
