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

const UsersManagement = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState(null)

    const getAllUsers = async () => {
        try {
            let response = await fetch('http://localhost:8080/getAllUser/', {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
            })
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
        getAllUsers().then((allUsers) =>
            setData(allUsers.filter((user) => user.isAdmin === 0)),
        )
    }, [])

    useEffect(() => {
        setSearchResult(data)
    }, [data])

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

export default UsersManagement

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
