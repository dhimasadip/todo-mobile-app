import React, { useState } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { Text, Button, Toast } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon } from 'react-native-elements'
import { gql, useMutation, useQuery } from '@apollo/client'
import { editTodoPriority, editTodoStatus } from '../store/actions/todo'

const UPDATE_STATUS = gql`
    mutation UpdateStatus($status: String, $id: String) {
        editTodo(status: $status, id: $id) {
            title   
        }
    }
`

const UPDATE_PRIORITY = gql`
    mutation UpdatePriority($priority: String, $id: String) {
        editPriority(priority: $priority, id: $id) {
            title   
        }
    }
`

export default ({ route, navigation }) => {

    const dispatch = useDispatch()
    const { todo } = route.params
    const [priority, setPriority] = useState(todo.priority)
    const [status, setStatus] = useState(todo.status)

    const [showNotifStatus, setShowNotifStatus] = useState(false)
    const [showNotifPriority, setShowNotifPriority] = useState(false)
    const [showPriority, setShowPriority] = useState(false)
    const [editStatus] = useMutation(UPDATE_STATUS)
    const [editPriority] = useMutation(UPDATE_PRIORITY)

    const handleStatus = (newStatus) => {
        editStatus({
            variables: {
                id: todo._id,
                status: newStatus
            }
        })
        dispatch(editTodoStatus({ id: todo._id, status: newStatus }))
        setShowNotifStatus(true)
        setTimeout(() => {
            setShowNotifStatus(false)
        }, 2000)
    }

    const handlePriority = (newPriority) => {
        editPriority({
            variables: {
                id: todo._id,
                priority: newPriority
            }
        })
        dispatch(editTodoPriority({ id: todo._id, priority: newPriority }))
        setShowNotifPriority(true)
        setTimeout(() => {
            setShowNotifPriority(false)
        }, 2000)
    }

    const setColor = () => {
        return status == 'Completed' ? '#55efc4' : status == 'On Progress' ? '#0984e3' : 'purple'
    }

    const setIcon = () => {
        return status == 'Completed' ? "check-square" : status == 'Waiting' ? 'calendar' : 'hourglass-half'
    }

    return (
        <View style={{ flex: 1 }}>
            <Toast
                isShow={showNotifStatus}
                positionOffset={55}
                positionIndicator="top"
                color="#00b894"
            >
                <Text style={{ color: '#fff' }}>Successfully update status!</Text>
            </Toast>
            <Toast
                isShow={showNotifPriority}
                positionOffset={55}
                positionIndicator="top"
                color="#00b894"
            >
                <Text style={{ color: '#fff' }}>Successfully update priority!</Text>
            </Toast>
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                colors={['#ff9897', '#CF8BF3', '#CF8BF3', '#FDB99B']}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity onPress={_ => navigation.navigate('tabbar', { screen: 'homepage', params: { isAdded: false } })}>
                        <Icon name="arrow-back" type="ion-icon" size={30} color="#30336b" style={styles.back} />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <View style={{ justifyContent: 'center', flexDirection: 'column', marginRight: 10, flex: 1 }}>
                            <View >
                                <Text h4 bold color="#fff" style={{ marginBottom: 5 }}>{todo.title}</Text>
                                <Text p color="#fff" size={12}>{new Date(todo.due_date).toDateString().replace(/ /, ', ')}</Text>
                            </View>
                        </View>
                        <View style={{ borderWidth: 1, padding: 10, borderRadius: 17, borderColor: setColor() }}>
                            <Icon
                                name={setIcon()}
                                type="font-awesome" color={setColor()} size={40}
                            />
                            <Text h6 color="#fff" size={17}>{status}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 3 }}>
                        <View style={styles.bottomSide}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                colors={['#FFF2F9', '#FDE2FF']}
                                style={{ flex: 1 }}
                            >
                                <View style={{ marginTop: 10, justifyContent: 'space-between', height: '85%' }}>
                                    <View>
                                        <View style={styles.bottomPriority}>
                                            <View style={{ justifyContent: 'center', height: '100%' }}>
                                                <Text p color="gray">Priority</Text>
                                            </View>
                                            {
                                                showPriority &&
                                                <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                    <Button
                                                        disabled={priority == 'High' ? true : false}
                                                        color={priority == 'High' ? '#c7c7c7' : 'rgba(253, 121, 168,0.75)'}
                                                        shadowless
                                                        size="small"
                                                        style={{ width: '17%', height: '70%', flexGrow: 1 }}
                                                        onPress={_ => {
                                                            setPriority('High')
                                                            setShowPriority(false)
                                                            handlePriority('High')
                                                        }}
                                                    >
                                                        <Text p size={12} color="#fff">High</Text>
                                                    </Button>
                                                    <Button
                                                        disabled={priority == 'Medium' ? true : false}
                                                        color={priority == 'Medium' ? '#c7c7c7' : 'rgba(253, 203, 110,0.75)'}
                                                        shadowless
                                                        style={{ width: '17%', height: '70%', flexGrow: 1 }}
                                                        onPress={_ => {
                                                            setPriority('Medium')
                                                            setShowPriority(false)
                                                            handlePriority('Medium')
                                                        }}
                                                    >
                                                        <Text p size={12} color="#fff">Medium</Text>
                                                    </Button>
                                                    <Button
                                                        disabled={priority == 'Low' ? true : false}
                                                        color={priority == 'Low' ? '#c7c7c7' : 'rgba(85, 239, 196,0.75)'}
                                                        shadowless
                                                        size="small"
                                                        style={{ width: '17%', height: '70%', flexGrow: 1 }}
                                                        onPress={_ => {
                                                            setPriority('Low')
                                                            setShowPriority(false)
                                                            handlePriority('Low')
                                                        }}
                                                    >
                                                        <Text p size={12} color="#fff">Low</Text>
                                                    </Button>
                                                </View>
                                            }
                                            {
                                                !showPriority &&
                                                <Button
                                                    color={priority == 'High' ? 'rgba(253, 121, 168,0.75)' : priority == 'Medium' ? 'rgba(253, 203, 110,0.75)' : 'rgba(85, 239, 196,0.75)'}
                                                    shadowless
                                                    size="small"
                                                    style={{ width: '23%', height: '70%' }}
                                                    onPress={_ => {
                                                        setShowPriority(true)
                                                    }}
                                                >
                                                    <Text p size={13} color="#fff">{priority} ⤓</Text>
                                                </Button>
                                            }
                                        </View>

                                        <View style={styles.bottomDescription}>
                                            <Text h6 style={{ marginBottom: 5 }}>Description</Text>
                                            <Text p color="gray" size={14}>{todo.description}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: 15 }}>
                                        <Text h6>Status</Text>
                                        <View style={styles.bottomStatus}>
                                            {
                                                status !== 'Completed' &&
                                                <TouchableOpacity onPress={_ => {
                                                    setStatus('Completed')
                                                    handleStatus('Completed')
                                                }}>
                                                    <View style={{ borderWidth: 1, padding: 10, borderRadius: 17, borderColor: '#27ae60' }}>
                                                        <Icon
                                                            name="check-square"
                                                            type="font-awesome" color="#27ae60" size={40}
                                                        />
                                                        <Text h6 color="#27ae60" size={17}>Completed</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {
                                                status !== 'On Progress' &&
                                                <TouchableOpacity onPress={_ => {
                                                    setStatus('On Progress')
                                                    handleStatus('On Progress')
                                                }}>
                                                    <View style={{ borderWidth: 1, padding: 10, borderRadius: 17, borderColor: '#0984e3' }}>
                                                        <Icon
                                                            name="hourglass-half"
                                                            type="font-awesome" color="#0984e3" size={40}
                                                        />
                                                        <Text h6 color="#0984e3" size={17}>On Progress</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            {
                                                status !== 'Waiting' &&
                                                <TouchableOpacity onPress={_ => {
                                                    setStatus('Waiting')
                                                    handleStatus('Waiting')
                                                }}>
                                                    <View style={{ borderWidth: 1, padding: 10, borderRadius: 17, borderColor: 'purple' }}>
                                                        <Icon
                                                            name="calendar"
                                                            type="font-awesome" color="purple" size={40}
                                                        />
                                                        <Text h6 color="purple" size={17}>Waiting</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                </View>

                            </LinearGradient>

                        </View>
                    </View>

                </SafeAreaView>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomSide: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden'

    },
    back: {
        alignSelf: 'flex-start',
        paddingTop: 10,
        paddingLeft: 15
    },
    bottomPriority: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        height: '30%'
    },
    bottomDescription: {
        marginHorizontal: 15,
        marginVertical: 5
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 25,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomStatus: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginTop: 10
    }

})