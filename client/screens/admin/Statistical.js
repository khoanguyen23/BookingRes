import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { API_URL } from "@env";

const UserListScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(API_URL);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin`);

            if (!response.data) {
                throw new Error('Failed to fetch users');
            }

            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            Alert.alert('Error', 'Failed to fetch users');
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/admin/${userId}`);

            if (response.status === 200) {
                // Update the user list after successful deletion
                fetchUsers();
                Alert.alert('Success', 'User deleted successfully');
            } else {
                Alert.alert('Error', 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            Alert.alert('Error', 'Failed to delete user');
        }
    };

    const renderUserItem = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteUser(item._id)}>
                <Text style={styles.deleteButton}>Delete User</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Image size="large" source={require('../../assets/load.gif')} style={styles.loadingImage} />
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item._id}
                    renderItem={renderUserItem}
                    ListHeaderComponent={() => (
                        <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>User Name</Text>
                            <Text style={styles.headerText}>Actions</Text>
                        </View>
                    )}
                />
            )}
            {/* Additional elements can be added outside of FlatList */}
            {/* Log the user count separately */}
            <Text>{`User count: ${users.length}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        color: 'red',
        marginTop: 5,
    },
    userCount: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default UserListScreen;
