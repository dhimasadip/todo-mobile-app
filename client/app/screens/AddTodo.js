import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Text, Button, Toast } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient'
import { Item, Input, Label } from 'native-base'
import Textarea from 'react-native-textarea';
import DatePicker from 'react-native-datepicker'
import { useSelector, useDispatch } from 'react-redux'
import { gql, useQuery, useMutation } from '@apollo/client'
import { addTodo } from '../store/actions/todo'

const ADD_TODO = gql`
    mutation AddTodo ($new: inputTodo) {
        addTodo(newTodo: $new) {
            _id
            title
            description
            status
            priority
            due_date
        }
    }
`

const GET_TODO = gql`
    query ($userId: String){
        getTodo(UserId: $userId) {
            _id
            title
            description
            status
            priority
            due_date
        }
    }
`

export default ({ navigation }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const currDate = new Date().toISOString().split('T')[0]
    const [date, setDate] = useState(currDate)
    const [priority, setPriority] = useState('')
    const [newTask, setNewTask] = useState({
        UserId: user.id,
        title: '',
        description: '',
        status: 'Waiting',
        priority: '',
        due_date: new Date(currDate).toLocaleDateString()
    })
    const [showNotif, setShowNotif] = useState(false)

    const [addNewTodo, { data }] = useMutation(ADD_TODO, {
        refetchQueries: [{
            query: GET_TODO,
            variables: { UserId: user.id }
        }]
    })

    useEffect(() => {
        if (data) {
            delete data.addTodo.__typename
            dispatch(addTodo(data.addTodo))
        }
    }, [data])


    const createTask = () => {
        if (
            newTask.UserId == '' ||
            newTask.title == '' ||
            newTask.description == '' ||
            newTask.status == '' ||
            newTask.due_date == '' ||
            newTask.priority == ''
        ) {
            setShowNotif(true)
            setTimeout(() => {
                setShowNotif(false)
            }, 3000)
        } else {
            addNewTodo({
                variables: {
                    new: newTask
                }
            })

            setNewTask({
                UserId: user.id,
                title: '',
                description: '',
                status: 'Waiting',
                priority: '',
                due_date: new Date(currDate).toLocaleDateString()
            })
            navigation.navigate('tabbar', {
                screen: 'homepage',
                params: { isAdded: true }
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Toast
                isShow={showNotif}
                positionOffset={50}
                positionIndicator="top"
                color="#eb4d4b"
            >
                <Text style={{ color: '#fff' }}>Please fill the field correctly!</Text>
            </Toast>
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                colors={['#CF8BF3', '#A770EF', '#FDB99B', '#FDB99B']}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, paddingHorizontal: 7, justifyContent: 'center', flexDirection: 'column' }}>
                        <View>
                            <Text h4 bold color="#fff">Create New Task</Text>
                        </View>
                    </View>

                    <View style={{ flex: 5 }}>
                        <View style={styles.bottomSide}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                colors={['#FFF2F9', '#FDE2FF']}
                                style={{ flex: 1 }}
                            >
                                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" >
                                    <View style={{ width: '70%', alignSelf: 'center' }}>
                                        <View style={styles.form}>

                                            <Item floatingLabel>
                                                <Label>Title</Label>
                                                <Input
                                                    value={newTask.title}
                                                    onChange={e => setNewTask({ ...newTask, title: e.nativeEvent.text })}
                                                />
                                            </Item>
                                            <Textarea
                                                value={newTask.description}
                                                containerStyle={styles.textareaContainer}
                                                style={styles.textarea}
                                                maxLength={100}
                                                placeholder={'Description'}
                                                placeholderTextColor={'#c7c7c7'}
                                                underlineColorAndroid={'transparent'}
                                                onChange={e => setNewTask({ ...newTask, description: e.nativeEvent.text })}
                                            />
                                            <View>
                                                <Text p size={13} color="#636e72">Due Date:</Text>
                                                <DatePicker
                                                    style={{ width: '100%', marginTop: 5 }}
                                                    date={date}
                                                    mode="date"
                                                    placeholder="select date"
                                                    format="YYYY-MM-DD"
                                                    minDate={currDate}
                                                    maxDate="2022-12-31"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    customStyles={{
                                                        dateIcon: {
                                                            position: 'absolute',
                                                            left: 0,
                                                            top: 4,
                                                            marginLeft: 0
                                                        },
                                                        dateInput: {
                                                            marginLeft: 36
                                                        }
                                                    }}
                                                    onDateChange={(date) => {
                                                        setDate(date)
                                                        setNewTask({ ...newTask, due_date: new Date(date).toLocaleDateString() })
                                                    }}
                                                />
                                            </View>
                                            <View>
                                                <Text p size={13} color="#636e72">Priority</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                    <Button
                                                        disabled={priority == 'High' ? true : false}
                                                        color={priority == 'High' ? '#c7c7c7' : 'rgba(253, 121, 168,0.75)'}
                                                        shadowless
                                                        size="small"
                                                        style={{ width: '27%' }}
                                                        onPress={_ => {
                                                            setPriority('High')
                                                            setNewTask({ ...newTask, priority: 'High' })
                                                        }}
                                                    >High</Button>
                                                    <Button
                                                        disabled={priority == 'Medium' ? true : false}
                                                        color={priority == 'Medium' ? '#c7c7c7' : 'rgba(253, 203, 110,0.75)'}
                                                        shadowless
                                                        size="small"
                                                        style={{ width: '27%' }}
                                                        onPress={_ => {
                                                            setPriority('Medium')
                                                            setNewTask({ ...newTask, priority: 'Medium' })
                                                        }}
                                                    >Medium</Button>
                                                    <Button
                                                        disabled={priority == 'Low' ? true : false}
                                                        color={priority == 'Low' ? '#c7c7c7' : 'rgba(85, 239, 196,0.75)'}
                                                        shadowless
                                                        size="small"
                                                        style={{ width: '27%' }}
                                                        onPress={_ => {
                                                            setPriority('Low')
                                                            setNewTask({ ...newTask, priority: 'Low' })
                                                        }}
                                                    >Low</Button>
                                                </View>
                                            </View>
                                            <Button
                                                round color="#A770EF"
                                                style={{ width: '90%', alignSelf: 'center' }}
                                                onPress={createTask}
                                            >Create a Task</Button>
                                        </View>
                                    </View>
                                </KeyboardAvoidingView>

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
    form: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '95%',
        paddingTop: 20

    },
    textareaContainer: {
        height: 110,
        padding: 15,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#c7c7c7',
        borderRadius: 13,

    },
    textarea: {
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#333',
    },

})
