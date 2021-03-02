import { Form, Textarea } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const FormAdd = () => {
    return (
        <View style={styles.container}>
            <Form>
                <Textarea
                    rowSpan={5}
                    bordered
                    placeholder="Nouvelle disquette"
                />
            </Form>
        </View>
    )
}

export default FormAdd

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
