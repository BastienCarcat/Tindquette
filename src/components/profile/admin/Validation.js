import { Body, Button, Card, CardItem, Icon, Text } from 'native-base'
import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'

const Validation = () => {
    const [loader, setLoader] = useState(true)
    const [disquettes, setDisquettes] = useState()

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getAllDisquette()
        }
    }, [isFocused])

    const getAllDisquette = () => {
        axios
            .get('http://localhost:8081/getAllDisquette')
            .then(function (response) {
                setDisquettes(
                    response.data.filter(
                        (disquette) => disquette.isValid === 0,
                    ),
                )
                setLoader(false)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    return (
        <View style={styles.container}>
            {loader ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    style={styles.list}
                    data={disquettes}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <CardItem>
                                <Body
                                    style={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text>{item.content}</Text>
                                </Body>
                            </CardItem>
                            <CardItem footer style={styles.footer}>
                                <Button iconLeft danger>
                                    <Icon name="trash" />
                                    <Text>Refuser</Text>
                                </Button>
                                <Button iconLeft success>
                                    <Icon name="checkmark" />
                                    <Text>Accepter</Text>
                                </Button>
                            </CardItem>
                        </Card>
                    )}
                />
            )}
        </View>
    )
}

export default Validation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 20,
    },
    footer: {
        justifyContent: 'space-around',
    },
    list: {
        paddingRight: 10,
        paddingTop: 20,
        paddingLeft: 10,
    },
    card: {
        marginBottom: 15,
    },
})
