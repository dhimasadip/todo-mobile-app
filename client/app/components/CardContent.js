import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'galio-framework'

export default ({ todo }) => {

    const priorityColor = todo.priority == 'High' ? '#ff7675' : todo.priority == 'Medium' ? '#e67e22' : '#2ecc71'
    const backgroundPriority = todo.priority == 'High' ? 'rgba(253, 121, 168,0.4)' : todo.priority == 'Medium' ? 'rgba(253, 203, 110,0.4)' : 'rgba(85, 239, 196,0.4)'

    const statusColor = todo.status == 'Completed' ? '#e84393' : todo.status == 'On Progress' ? '#0984e3' : '#f368e0'

    const styles = StyleSheet.create({
        cardTodo: {
            borderRadius: 15,
            backgroundColor: '#fff',
            marginVertical: 15,
            marginHorizontal: 20,
            padding: 15,
            shadowColor: "#636e72",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 4,
            borderRadius: 20,
        },
        content: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        status: {
            borderWidth: 1,
            borderRadius: 7,
            borderColor: statusColor,
            width: '40%',
            alignSelf: 'center',
            marginBottom: 4
        }

    })

    return (
        <View style={styles.cardTodo}>
            <View style={styles.status}>
                <Text p center size={12} style={{ color: statusColor }}>{todo.status}</Text>
            </View>
            <View style={styles.content}>
                <View>
                    <Text h6 bold>{todo.title}</Text>
                    <Text p size={12} style={{ color: '#636e72', marginTop: 10 }}>Due date:</Text>
                    <Text p size={12} style={{ color: '#636e72' }}>{new Date(todo.due_date).toDateString().replace(/ /, ', ')}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <View style={{ backgroundColor: backgroundPriority, borderRadius: 7, padding: 7 }}>
                        <Text h6 size={12} style={{ color: priorityColor }}>{todo.priority}</Text>
                    </View>
                </View>

            </View>
        </View>

    )
}

