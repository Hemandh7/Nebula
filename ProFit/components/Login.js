// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { getUserByEmail } from '../data/userdata';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError(''); // Reset any previous errors
    setEmail('');
    setPassword('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const user = getUserByEmail(email);

    if (user && user.password === password) {
      // Successfully logged in
      // Navigate to the SectionPage
      navigation.navigate('Section');

      // You can add additional actions here if needed
      alert('Logged in successfully!');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSkip = () => {
    navigation.navigate("Section"); // Navigate to the section screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          { backgroundColor: pressed ? 'darkgreen' : 'green' },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
      <Text
        style={styles.signupText}
        onPress={() => navigation.navigate('Signup')}
      >
        Don't have an account? Sign Up
      </Text>
      <Pressable  onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Continue as Guest</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
    width: '90%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    marginTop: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  signupText: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
