import { Body, Card, CardItem, Text, Form, Button } from 'native-base'
import React from 'react'
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

const FormAdd = () => {
    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )

    return (
        <DismissKeyboard>
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
        </DismissKeyboard>
    )
}

export default FormAdd
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
    },
    linearGradient: {
        flex: 1,
        borderRadius: 10,
    },
    button: {
        color: '#00B990',
    },
})
