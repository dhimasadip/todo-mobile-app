import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, ImageBackground, StyleSheet } from 'react-native'
import { Input, Button, Block, Text, Toast } from 'galio-framework'
import { useDispatch } from 'react-redux'
import { getUser } from '../store/actions/user'
import { gql, useMutation, useQuery } from '@apollo/client'
import { LinearGradient } from 'expo-linear-gradient';
import bg from '../assets/bg.jpg'
import { getTodos } from '../store/actions/todo'

const GET_USER = gql`
    mutation ($uname: String, $pass: String){
        getUser(username: $uname, password: $pass) {
            _id
            username
            name
        }
    }
`

const ADD_USER = gql`
    mutation AddUser($new: inputUser) {
        addUser(newUser: $new) {
            _id
            name
            username
        }
    }
`


export default ({ navigation }) => {
    const dispatch = useDispatch()
    const [input, setInput] = useState({ username: '', password: '' })
    const [inputRegister, setInputRegister] = useState({ name: '', username: '', password: '' })
    const [showLogin, setShowLogin] = useState(true)
    const [signUp] = useMutation(ADD_USER)
    const [getUserLogin, { data }] = useMutation(GET_USER)
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        if (data && data.getUser) {
            const userData = {
                id: data.getUser._id,
                name: data.getUser.name,
                username: data.getUser.username
            }

            dispatch(getUser(userData))
            setShowLogin(true)
            setInput({ username: '', password: '' })
            setInputRegister({ name: '', username: '', password: '' })
            navigation.navigate('tabbar', {
                screen: 'homepage'
            })
        } else if (data && !data.getUser) {
            setIsShow(true)
            setInput({ ...input, password: '' })
            setTimeout(() => {
                setIsShow(false)
            }, 2000)
        }
    }, [data])

    const onChangeUsername = (e) => {
        setInput({ ...input, username: e.nativeEvent.text })
    }

    const onChangePassword = (e) => {
        setInput({ ...input, password: e.nativeEvent.text })
    }

    const handleLogin = () => {
        getUserLogin({
            variables: {
                uname: input.username,
                pass: input.password
            }
        })
    }

    const handleRegister = async () => {
        await signUp({
            variables: {
                new: inputRegister
            }
        })

        await getUserLogin({
            variables: {
                uname: inputRegister.username,
                pass: inputRegister.password
            }
        })
    }




    return (
        <View style={{ flex: 1 }}>
            <Toast
                isShow={isShow}
                positionOffset={50}
                positionIndicator="top"
                color="#eb4d4b"
            >
                <Text style={{ color: '#fff' }}>Incorrect username / password</Text>
            </Toast>
            <ImageBackground source={bg} resizeMode="cover" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <View style={styles.containerForm}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                colors={['#FFF2F9', '#FDE2FF']}
                                style={{ borderRadius: 20 }}
                            >
                                {
                                    showLogin &&
                                    <Block middle style={{ paddingVertical: 20, paddingHorizontal: 13 }}>
                                        <Button
                                            onlyIcon
                                            icon="user-plus"
                                            iconFamily="font-awesome"
                                            iconSize={20}
                                            color="#FC427B"
                                            iconColor="#fff"
                                            style={{ width: '17%', height: '15%', alignSelf: 'flex-end', margin: 0 }}
                                            onPress={_ => setShowLogin(false)}
                                        >warning</Button>
                                        <Text h5 color="purple">Welcome</Text>
                                        <Input
                                            rounded
                                            value={input.username}
                                            placeholder="Username"
                                            onChange={onChangeUsername}
                                        />
                                        <Input
                                            rounded password viewPass
                                            value={input.password}
                                            placeholder="Password"
                                            onChange={onChangePassword}
                                        />
                                        <Button color="#9b59b6" onPress={handleLogin}>Login</Button>
                                    </Block>
                                }
                                {
                                    !showLogin &&
                                    <Block middle style={{ paddingVertical: 20, paddingHorizontal: 13 }}>
                                        <Button
                                            onlyIcon
                                            icon="sign-in"
                                            iconFamily="font-awesome"
                                            iconSize={20}
                                            color="purple"
                                            iconColor="#fff"
                                            style={{ width: '17%', height: '13%', alignSelf: 'flex-end', margin: 0 }}
                                            onPress={_ => setShowLogin(true)}
                                        >warning</Button>
                                        <Text h5 color="#FC427B">Sign Up</Text>
                                        <Input
                                            rounded
                                            value={inputRegister.name}
                                            placeholder="Full name"
                                            onChange={e => setInputRegister({ ...inputRegister, name: e.nativeEvent.text })}
                                        />
                                        <Input
                                            rounded
                                            value={inputRegister.username}
                                            placeholder="Username"
                                            onChange={e => setInputRegister({ ...inputRegister, username: e.nativeEvent.text })}
                                        />
                                        <Input
                                            rounded password viewPass
                                            value={inputRegister.password}
                                            placeholder="Password"
                                            onChange={e => setInputRegister({ ...inputRegister, password: e.nativeEvent.text })}
                                        />
                                        <Button onPress={handleRegister}>Sign Up</Button>
                                    </Block>
                                }
                            </LinearGradient>

                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    containerForm: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderRadius: 20,
        width: '70%'
    }
})