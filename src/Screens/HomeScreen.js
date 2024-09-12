import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
const HomeScreen = () => {
    const [notes, setNotes] = useState([]);
    const [isGridView, setIsGridView] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 

    useEffect(() => {
        if (isFocused) {
            loadNotes();
        }
    }, [isFocused]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={toggleViewMode} 
                    style={{ marginHorizontal: 10 }}
                >
                    <Ionicons
                        name={isGridView ? 'list-outline' : 'grid-outline'}
                        size={25}
                    />
                </TouchableOpacity>
            )
        });
    }, [isGridView]);

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes !== null) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.log("Failed to load notes", error);
        }
    };

    const handleEditNote = (note) => {
        navigation.navigate('CreateNote', { note, updateNotes: loadNotes });
    };

    const handleDeleteNote = (note) => {
        const updatedNotes = notes.filter(item => item.id !== note.id);
        setNotes(updatedNotes);
        saveNotes(updatedNotes);
    };

    const saveNotes = async (updatedNotes) => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
            // Notify home screen to reload notes
            loadNotes();
        } catch (error) {
            console.log('Failed to save notes', error);
        }
    };

    const toggleViewMode = () => {
        setIsGridView(!isGridView);
    };

    const renderNotes = () => {
        return notes.map((note, index) => (
            <GestureHandlerRootView key={index}>
                <Swipeable
                    renderRightActions={() => (
                        <TouchableOpacity
                            onPress={() => handleDeleteNote(note)}
                            style={isGridView ? styles.gridDeleteButton : styles.listDeleteButton}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    )}
                >
                    <TouchableOpacity
                        onPress={() => handleEditNote(note)}
                        style={isGridView ? styles.gridCard : styles.listCard}
                    >
                        <Text style={styles.noteTitle}>Title: {note.title}</Text>
                        <Text style={styles.noteContent}>{note.content}</Text>
                    </TouchableOpacity>
                </Swipeable>
            </GestureHandlerRootView>
        ));
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={notes.length === 0 ? styles.emptyContainer : isGridView ? styles.gridContainer : null}
                style={styles.noteList}
            >
                {notes.length === 0 ? (
                    <Text style={styles.emptyText}>Create your first note</Text>
                ) : (
                    renderNotes()
                )}
            </ScrollView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('CreateNote')}
            >
                <AntDesign name='pluscircleo' size={30} color={'#fff'} />
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6e6e6",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#333',
        fontSize: 16,
    },
    listCard: {
        flexDirection: 'column',
        margin: 10,
        width: wp(90),
        backgroundColor: "#FD99FF",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    gridCard: {
        width: wp(44),
        backgroundColor: "#FD99FF",
        borderRadius: 10,
        padding: 10,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    listDeleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        marginVertical: 13,
        borderRadius: 10,
        width: '20%',
    },
    gridDeleteButton: {
        marginTop:8,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: '25%',
        borderRadius: 10,
    },
    deleteButtonText: {
        color: 'white',
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    noteContent: {
        fontSize: 14,
        color: "#333",
    },
    addButton: {
        position: 'absolute',
        right: wp(4),
        bottom: 10,
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#252525",
        paddingVertical: 12,
        borderRadius: 50,
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        padding: 50,
        backgroundColor: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    contentInput: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        height: 150,
        textAlignVertical: "top",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
});


