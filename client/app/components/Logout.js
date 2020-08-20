import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../store/actions/user'
import { getTodos } from '../store/actions/todo'


export default ({ navigation }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser({}))
        dispatch(getTodos([]))
        navigation.navigate('login')
    }, [])

    return (
        <>
        </>
    )
}