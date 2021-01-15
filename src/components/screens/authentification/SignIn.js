import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Label,
} from 'native-base'

const SignIn = ({ navigation }) => {
    return (
        <Container>
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input />
                    </Item>
                </Form>
            </Content>
            <Button
                title="S'inscrire"
                onPress={() => navigation.navigate('SignUp')}
            />
        </Container>
        // <View style={styles.container}>
        //     <Text>SignIn</Text>

        // </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
