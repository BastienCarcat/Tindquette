import { Ionicons } from '@expo/vector-icons'
import { Button, Text } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { removeUser } from '../../store/actions'
import { connect } from 'react-redux'

const Account = ({ removeUser }) => {
    const handleDisconect = () => {
        removeUser()
    }

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Ionicons name="person-circle-outline" size={75} />
                <Button rounded style={styles.button} onPress={handleDisconect}>
                    <Text>Se déconnecter</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    view: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FF515B',
    },
})

export default connect(null, { removeUser })(Account)
