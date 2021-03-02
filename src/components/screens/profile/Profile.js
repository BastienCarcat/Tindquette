import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
    Container,
    Header,
    Content,
    Button,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Switch,
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Content>
                <ListItem
                    icon
                    button={true}
                    onPress={() => {
                        console.log('Changer le pseudo / se déco')
                    }}
                >
                    <Left>
                        <Button style={{ backgroundColor: '#FF9501' }}>
                            <Ionicons name="person-circle" size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Scrole</Text>
                    </Body>
                    <Right>
                        <Ionicons name="chevron-forward-outline" />
                    </Right>
                </ListItem>
            </Content>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    account: {
        height: 100,
    },
})
