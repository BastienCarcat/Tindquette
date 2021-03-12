import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import _ from 'lodash'
import {
    Body,
    Button,
    Input,
    Item,
    List,
    ListItem,
    Right,
    Text,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
// import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog'
import { connect } from 'react-redux'

const UsersManagement = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState(null)
    const [visible, setVisible] = useState(false)
    const token = user.token // ICI ON RECUPERA LE TOKEN QU'ON A EU A LA CONNECTION
    const userId = user.userId // ID UTILISATEUR RECUPERER A LA CONNEXION

    const isFocused = useIsFocused()

    const handleDelete = (userIdDelete) => {
        console.log('userIdDelete', userIdDelete)
        deleteUser(userIdDelete)
        setData(data.filter((user) => user.id !== userIdDelete))
    }

    useEffect(() => {
        if (isFocused) {
            recoverUser()
        }
    }, [isFocused])

    useEffect(() => {
        setSearchResult(data)
    }, [data])

    const recoverUser = () => {
        const config = {
            headers: { Authorization: 'Bearer ' + token },
        }
        axios
            .get('http://172.16.18.18:8080/getAllUser', config)
            .then(function (response) {
                console.log(response.data)
                setData(response.data.filter((user) => user.isAdmin === 0))
                setLoader(false)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    const deleteUser = (userIdDelete) => {
        axios
            .delete('http://172.16.18.18:8080/user', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    userId: userId, // ID DE L'ADMIN QUI VA SUPPRIMER L'utilisateur
                    userIdDelete: userIdDelete, // ID DE l'utilisateur à supprimer
                },
            })
            .then(function (response) {
                console.log('user', response)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    const getValue = (obj, path, defaultValue = null) => {
        if (_.has(obj, path)) {
            return _.get(obj, path)
        }
        return defaultValue
    }

    useEffect(() => {
        const result = _.filter(
            data,
            (user) =>
                `${getValue(user, 'pseudo', [])} ${getValue(user, 'mail', [])}`
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase()) >= 0,
        )
        setSearchResult(result)
    }, [searchTerm])

    return (
        <View style={styles.container}>
            {loader ? (
                <ActivityIndicator size="large" />
            ) : (
                <List style={styles.list}>
                    <ListItem itemDivider style={styles.search}>
                        <Text style={styles.users}>Utilisateurs</Text>
                        <Item rounded style={styles.input}>
                            <Input
                                placeholder="Rechercher"
                                onChangeText={(text) => setSearchTerm(text)}
                                value={searchTerm}
                            />
                        </Item>
                    </ListItem>
                    {_.map(searchResult, (user, index) => (
                        <ListItem key={index}>
                            <Body>
                                <Text>{user.pseudo}</Text>
                                <Text note>{user.mail}</Text>
                            </Body>
                            <Right style={{ alignContent: 'center' }}>
                                <Button
                                    icon
                                    transparent
                                    // onPress={() => setVisible(true)}
                                    onPress={() => handleDelete(user.id)}
                                >
                                    <Ionicons
                                        // name="ellipsis-horizontal"
                                        name="trash-outline"
                                        size={25}
                                    />
                                </Button>
                                {/* <Dialog
                                    visible={visible}
                                    onTouchOutside={() => {
                                        setVisible(false)
                                    }}
                                >
                                    <DialogContent>
                                        <DialogButton
                                            text="Supprimer"
                                            onPress={() =>
                                                handleDelete(user.id)
                                            }
                                        />
                                    </DialogContent>
                                </Dialog> */}
                            </Right>
                        </ListItem>
                    ))}
                </List>
            )}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(UsersManagement)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        justifyContent: 'center',
        flexDirection: 'column',
    },
    list: {
        backgroundColor: '#FFF',
    },
    input: {
        width: 300,
        height: 35,
        backgroundColor: '#FFF',
    },
    users: {
        marginTop: 20,
        marginBottom: 20,
    },
})
