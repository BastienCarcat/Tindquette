import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper'
import { Button, Icon, Right } from 'native-base'
const Home = () => {
    return (
        <View style={styles.container}>
            <Swiper
                cards={[
                    ' je te baise',
                    'MORE',
                    'OF',
                    'WHAT',
                    'MAKES',
                    'YOU',
                    'HAPPY',
                    ' jkfze',
                    'MORE',
                    'OF',
                    'WHAT',
                    'MAKES',
                    'YOU',
                    'HAPPY',
                    ' je te baise',
                    'MORE',
                    'OF',
                    'WHAT',
                    'MAKES',
                    'YOU',
                    'HAPPY',
                    ' jkfze',
                    'MORE',
                    'OF',
                    'WHAT',
                    'MAKES',
                    'YOU',
                    'HAPPY',
                ]}
                renderCard={(card) => {
                    return (
                        <View style={styles.card}>
                            <Text style={styles.text}>{card}</Text>
                            <View style={styles.container_button}>
                                <Button
                                    transparent
                                    style={styles.dislike_button}
                                >
                                    <Ionicons size={60} name="close-circle" />
                                </Button>
                                <Button transparent style={styles.like_button}>
                                    <Ionicons size={60} name="heart-circle" />
                                </Button>
                            </View>
                        </View>
                    )
                }}
                onSwiped={(cardIndex) => {
                    console.log(cardIndex)
                }}
                onSwipedAll={() => {
                    console.log('onSwipedAll')
                }}
                cardIndex={0}
                backgroundColor={'#FFFF'}
                stackSize={3}
            ></Swiper>
        </View>
    )
}

const width_proportion = '100%'
const height_proportion = '80%'
const height_button_like_dislike = '100%'

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
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#424242',
        justifyContent: 'center',
        backgroundColor: '#FE3C72',
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: 'transparent',
    },
    container_button: {
        display: 'flex',
        width: width_proportion,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 20,
    },
    like_button: {
        height: height_button_like_dislike,
    },
    dislike_button: {
        height: height_button_like_dislike,
    },
})

export default Home
