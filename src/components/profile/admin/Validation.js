import { Body, Button, Card, CardItem, Icon, Text } from 'native-base'
import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { connect } from 'react-redux'

const Validation = ({ user }) => {
    const [loader, setLoader] = useState(true)
    const [disquettes, setDisquettes] = useState()
    const token = user.token // ICI ON RECUPERA LE TOKEN QU'ON A EU A LA CONNECTION
    const userId = user.userId // ID UTILISATEUR RECUPERER A LA CONNEXION

    const isFocused = useIsFocused()

    const handleRefuse = (idDisquette) => {
        deleteDisquette(idDisquette)
        setDisquettes(
            disquettes.filter((disquette) => disquette.id !== idDisquette),
        )
    }

    const handleValidate = (idDisquette) => {
        validateDisquette(idDisquette)
        setDisquettes(
            disquettes.filter((disquette) => disquette.id !== idDisquette),
        )
    }

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

    const deleteDisquette = (idDisquette) => {
        axios
            .delete('http://localhost:8081/deleteDisquette', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    idDisquette: idDisquette,
                },
            })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    const validateDisquette = (idDisquette) => {
        const config = {
            headers: { Authorization: 'Bearer ' + token },
        }

        const bodyParameters = {
            idDisquette: idDisquette,
        }

        axios
            .post(
                'http://localhost:8081/acceptDisquette',
                bodyParameters,
                config,
            )
            .then(function (response) {
                console.log(response)
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
                                <Button
                                    iconLeft
                                    danger
                                    onPress={() => handleRefuse(item.id)}
                                >
                                    <Icon name="trash" />
                                    <Text>Refuser</Text>
                                </Button>
                                <Button
                                    iconLeft
                                    success
                                    onPress={() => handleValidate(item.id)}
                                >
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Validation)

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
