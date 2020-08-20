import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Button } from 'galio-framework'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import CardContent from '../components/CardContent'
import { gql, useLazyQuery } from '@apollo/client'
import { getTodos } from '../store/actions/todo';

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
    const { todos } = useSelector(state => state.todoReducer)
    const { user } = useSelector(state => state.userReducer)
    
    let [refetchTodo, { loading, error }] = useLazyQuery(GET_TODO, {
        onCompleted: datas => {
            dispatch(getTodos(datas.getTodo))
        },
        fetchPolicy: 'no-cache',
        nextFetchPolicy: 'no-cache'
    })
    const [mode, setMode] = useState('All')

    useEffect(() => {
        if (user && user.name) {
            refetchTodo({
                variables: { userId: user.id }
            })
        }
    }, [user])

    if (loading) return <Text p>Loading...</Text>
    if (error) return <Text p>ERROR</Text>

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                colors={['#CF8BF3', '#A770EF', '#FDB99B', '#FDB99B']}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, paddingHorizontal: 7, justifyContent: 'space-evenly', flexDirection: 'column' }}>
                        <View>
                            <Text h3 bold color="#fff">Hi {user.name},</Text>
                            <Text p color="#fff">Let's be productive today!</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', overflow: 'scroll' }}>
                            <ScrollView horizontal>
                                <Button shadowColor="#34495e" style={styles.card1} onPress={_ => setMode('All')}>
                                    <Text h3 bold style={{ color: '#fff' }}>{todos.length}</Text>
                                    <Text p style={{ color: '#fff' }}>Total Task</Text>
                                </Button>
                                <Button shadowColor="#34495e" style={styles.card2} onPress={_ => setMode('Completed')}>
                                    <Text h3 bold style={{ color: '#fff' }}>
                                        {todos.filter(todo => todo.status === 'Completed').length}
                                    </Text>
                                    <Text p style={{ color: '#fff' }}>Completed</Text>
                                </Button>
                                <Button shadowColor="#34495e" style={styles.card3} onPress={_ => setMode('On Progress')}>
                                    <Text h3 bold style={{ color: '#fff' }}>
                                        {todos.filter(todo => todo.status === 'On Progress').length}
                                    </Text>
                                    <Text p style={{ color: '#fff' }}>On Progress</Text>
                                </Button>
                                <Button shadowColor="#34495e" style={styles.card4} onPress={_ => setMode('Waiting')}>
                                    <Text h3 bold style={{ color: '#fff' }}>
                                        {todos.filter(todo => todo.status === 'Waiting').length}
                                    </Text>
                                    <Text p style={{ color: '#fff' }}>Waiting</Text>
                                </Button>

                            </ScrollView>

                        </View>
                    </View>

                    <View style={{ flex: 2 }}>
                        <View style={styles.bottomSide}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                colors={['#FFF2F9', '#FDE2FF']}
                                style={{ flex: 1 }}
                            >
                                <ScrollView>
                                    {
                                        todos.length > 0 && mode == 'All' &&
                                        todos.map((todo, i) => {
                                            return (
                                                <TouchableOpacity key={i} onPress={_ => navigation.navigate('detail', { todo })}>
                                                    <CardContent
                                                        todo={todo}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                    {
                                        todos.length > 0 && mode != 'All' &&
                                        todos.filter(el => el.status == mode).map((todo, i) => {
                                            return (
                                                <TouchableOpacity key={i} onPress={_ => navigation.navigate('detail', { todo })}>
                                                    <CardContent
                                                        todo={todo}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                    {
                                        todos.length > 0 && mode != 'All' && todos.filter(el => el.status == mode).length == 0 &&
                                        <View style={{ alignSelf: 'center', marginTop: 30 }}>
                                            <Text h5 color="#c7c7c7">No Data</Text>
                                        </View>
                                    }
                                    {
                                        todos.length == 0 &&
                                        <View style={{ alignSelf: 'center', marginTop: 30 }}>
                                            <Text h5 color="#c7c7c7">No Data</Text>
                                        </View>
                                    }
                                </ScrollView>
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
    card1: {
        backgroundColor: '#ff7675',
        margin: 5,
        padding: 15,
        borderRadius: 17,
        height: 'auto'
    },
    card2: {
        backgroundColor: '#e84393',
        margin: 5,
        padding: 15,
        borderRadius: 17,
        height: 'auto'
    },
    card3: {
        backgroundColor: '#3498db',
        margin: 5,
        padding: 15,
        borderRadius: 17,
        height: 'auto'
    },
    card4: {
        backgroundColor: '#f368e0',
        margin: 5,
        padding: 15,
        borderRadius: 17,
        height: 'auto'
    },
    cardTodo: {
        borderRadius: 15,
        backgroundColor: '#fff',
        marginVertical: 15,
        marginHorizontal: 20,
        padding: 15,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    status: {
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#1dd1a1',
        width: '40%',
        alignSelf: 'center',
        marginBottom: 4
    }

})