import { Body, Button, Card, CardItem, Icon, Text } from 'native-base'
import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'

const Validation = () => {
    const [loader, setLoader] = useState(true)
    const [disquettes, setDisquettes] = useState()

    const getAllDisquette = async () => {
        try {
            let response = await fetch(
                'http://localhost:8080/getAllDisquette/',
                {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                },
            )
            let json = await response.json()
            setTimeout(() => {
                setLoader(false)
            })
            return json
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllDisquette().then((allDisquettes) =>
            setDisquettes(
                allDisquettes.filter((disquette) => disquette.isValid === 0),
            ),
        )
    }, [])

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
