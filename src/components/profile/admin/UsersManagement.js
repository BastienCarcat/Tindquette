import { Ionicons } from '@expo/vector-icons'
import {
    Body,
    Left,
    List,
    ListItem,
    Right,
    Item,
    Input,
    Text,
    Button,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import _ from 'lodash'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { connect } from 'react-redux'

const UsersManagement = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState(null)
    const token = user.token // ICI ON RECUPERA LE TOKEN QU'ON A EU A LA CONNECTION
    const userId = user.userId // ID UTILISATEUR RECUPERER A LA CONNEXION

    const isFocused = useIsFocused()

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
            .get('http://localhost:8081/getAllUser', config)
            .then(function (response) {
                console.log(response.data)
                setData(response.data.filter((user) => user.isAdmin === 0))
                setLoader(false)
            })
            .catch(function (error) {
                console.error(error)
            })
    }
    // function DeleteMyFavori () {
    //     // ICI ON RECUPERA LE TOKEN QU'ON A EU A LA CONNECTION
    //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE2MTUyODE2MTgsImV4cCI6MTYxNTI5NjAxOH0.I34ibHwo12YazrYVGbUSp1WU7Xu3YHG718_o1ntVerI"
    //     axios.delete('http://localhost:8081/user', {
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         },
    //         data: {
    //             userId: 18, // ID DE L'ADMIN QUI VA SUPPRIMER L'utilisateur
    //             userIdDelete: 1 // ID DE l'utilisateur à supprimer
    //         }
    //     }).then(function (response) {
    //         console.log(response);
    //     })
    //         .catch(function (error) {
    //             console.error(error);
    //         });

    // }

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
                                <Button icon transparent>
                                    <Ionicons
                                        name="ellipsis-horizontal"
                                        size={25}
                                    />
                                </Button>
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
