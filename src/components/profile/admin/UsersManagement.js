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
import { StyleSheet, View } from 'react-native'
import _ from 'lodash'

const UsersManagement = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState(data)

    const data = {
        users: [
            {
                id: '1',
                pseudo: 'Jean',
                name: 'Michel',
            },
            {
                id: '2',
                pseudo: 'Greg',
                name: 'le bogoss',
            },
            {
                id: '3',
                pseudo: 'Bastien',
                name: 'le plus bo',
            },
            {
                id: '4',
                pseudo: 'Greg',
                name: 'le pas bo',
            },
        ],
    }

    const getValue = (obj, path, defaultValue = null) => {
        if (_.has(obj, path)) {
            return _.get(obj, path)
        }
        return defaultValue
    }

    useEffect(() => {
        const result = _.filter(
            getValue(data, 'users', []),
            (user) =>
                `${getValue(user, 'pseudo', [])} ${getValue(user, 'name', [])}`
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase()) >= 0,
        )
        setSearchResult(result)
    }, [searchTerm])

    return (
        <View style={styles.container}>
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
                            <Text note>{user.name}</Text>
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
