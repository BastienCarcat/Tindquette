import { Body, Button, Card, CardItem, Icon, Text } from 'native-base'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

const Validation = () => {
    const data = [
        {
            id: '1',
            content: 'Ceci est une disquette pas très terrible mais bon ...',
            isValid: true,
        },
        {
            id: '2',
            content: 'Ceci est une disquette pas très terrible mais bon ... 2',
            isValid: true,
        },
        {
            id: '3',
            content: 'Ceci est une disquette pas très terrible mais bon ... 3',
            isValid: true,
        },
        {
            id: '4',
            content: 'Ceci est une disquette pas très terrible mais bon ... 4',
            isValid: true,
        },
    ]

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <CardItem>
                            <Body>
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
