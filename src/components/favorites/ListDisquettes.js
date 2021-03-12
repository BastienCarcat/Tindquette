import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { connect } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'

const ListDisquettes = ({ user }) => {
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)

    const token = user.token // ICI ON RECUPERA LE TOKEN QU'ON A EU A LA CONNECTION
    const userId = user.userId // ID UTILISATEUR RECUPERER A LA CONNEXION

    const isFocused = useIsFocused()
    useEffect(() => {
        console.log('data', data)
    }, [data])

    useEffect(() => {
        if (isFocused) {
            recoverMyFavoris()
        }
    }, [isFocused])

    const recoverMyFavoris = () => {
        const config = {
            headers: { Authorization: 'Bearer ' + token },
        }
        axios
            .get('http://172.16.18.18:8080/favori/' + userId, config)
            .then(function (response) {
                const formatData = _.map(response.data, (item) => {
                    return {
                        key: item.idDisquette,
                        text: item.content,
                    }
                })
                setData(formatData)
                setLoader(false)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    const deleteMyFavori = (idDisquette) => {
        axios
            .delete('http://172.16.18.18:8080/favori', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    userId: userId,
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

    const onRowDidOpen = (rowKey) => {
        console.log('This row opened', rowKey)
    }

    const onLeftActionStatusChange = (rowKey) => {
        console.log('onLeftActionStatusChange', rowKey)
    }

    const onRightActionStatusChange = (rowKey) => {
        console.log('onRightActionStatusChange', rowKey)
    }

    const onRightAction = (rowKey) => {
        console.log('onRightAction', rowKey)
    }

    const onLeftAction = (rowKey) => {
        console.log('onLeftAction', rowKey)
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow()
        }
    }

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey)
        const newData = [...data]
        console.log('rowMap', rowMap)
        const prevIndex = data.findIndex((item) => item.key === rowKey)
        newData.splice(prevIndex, 1)
        setData(newData)
        deleteMyFavori(rowKey)
    }

    const VisibleItem = ({
        data,
        rowHeightAnimatedValue,
        removeRow,
        leftActionState,
        rightActionState,
    }) => {
        if (rightActionState) {
            Animated.timing(rowHeightAnimatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => removeRow())
        }

        return (
            <Animated.View
                style={[styles.rowFront, { height: rowHeightAnimatedValue }]}
            >
                <TouchableHighlight style={styles.rowFrontVisible}>
                    <View>
                        <Text style={styles.title} numberOfLines={3}>
                            {data.item.text}
                        </Text>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        )
    }

    const renderItem = (data, rowMap) => {
        const rowHeightAnimatedValue = new Animated.Value(85)
        console.log('data render item', data)
        return (
            <VisibleItem
                data={data}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                removeRow={() => deleteRow(rowMap, data.item.key)}
            />
        )
    }

    const HiddenItemWithActions = ({
        onClose,
        onDelete,
        swipeAnimatedValue,
        leftActionActivated,
        rightActionActivated,
        rowActionAnimatedValue,
        rowHeightAnimatedValue,
    }) => {
        if (rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 500,
                useNativeDriver: false,
            }).start()
        } else {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 75,
                useNativeDriver: false,
            }).start()
        }
        return (
            <Animated.View
                style={[styles.rowBack, { height: rowActionAnimatedValue }]}
            >
                {/* <Text>Left</Text> */}
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={onClose}
                >
                    <Ionicons
                        name="close"
                        color="#fff"
                        size={25}
                        style={styles.trash}
                    />
                </TouchableOpacity>
                <Animated.View
                    style={[
                        styles.backRightBtn,
                        styles.backRightBtnRight,
                        {
                            flex: 1,
                            width: rowActionAnimatedValue,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                        onPress={onDelete}
                    >
                        <Animated.View
                            style={[
                                styles.trash,
                                {
                                    transform: [
                                        {
                                            scale: swipeAnimatedValue.interpolate(
                                                {
                                                    inputRange: [-90, -45],
                                                    outputRange: [1, 0],
                                                    extrapolate: 'clamp',
                                                },
                                            ),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Ionicons name="trash" color="#fff" size={25} />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        )
    }

    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75)
        const rowHeightAnimatedValue = new Animated.Value(85)

        console.log('data.item.id hiddenItem', data)

        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => {
                    closeRow(rowMap, data.item.key)
                }}
                onDelete={() => {
                    deleteRow(rowMap, data.item.key)
                }}
            />
        )
    }

    return (
        <View style={styles.container}>
            {loader ? (
                <ActivityIndicator size="large" />
            ) : (
                <SwipeListView
                    data={data}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    disableRightSwipe
                    onRowDidOpen={onRowDidOpen}
                    leftActivationValue={100}
                    rightActivationValue={-200}
                    leftActionValue={0}
                    rightActionValue={-500}
                    onLeftAction={onLeftAction}
                    onRightAction={onRightAction}
                    onLeftActionStatusChange={onLeftActionStatusChange}
                    onRightActionStatusChange={onRightActionStatusChange}
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

export default connect(mapStateToProps)(ListDisquettes)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        paddingTop: 20,
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 85,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 85,
        padding: 10,
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
        height: 85,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
        width: 200,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
    },
})
