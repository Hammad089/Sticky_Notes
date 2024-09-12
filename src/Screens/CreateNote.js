import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreateNote = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const noteKey = route.params?.noteKey || 'notes';

    useEffect(() => {
        loadNotes();
        if (route.params?.note) {
            const { note } = route.params;
            setSelectedNote(note);
            setTitle(note.title);
            setContent(note.content);
        }
    }, [route.params]);

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem(noteKey);
            if (savedNotes !== null) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.log('Failed to load notes', error);
        }
    };

    const saveNotes = async (newNotes) => {
        try {
            await AsyncStorage.setItem(noteKey, JSON.stringify(newNotes));
            if (route.params?.updateNotes) {
                route.params.updateNotes();
            }
            navigation.goBack();
        } catch (error) {
            console.log('Failed to save notes', error);
        }
    };

    const handleSaveNote = () => {
        let updatedNotes;
        if (selectedNote) {
            updatedNotes = notes.map((note) =>
                note.id === selectedNote.id
                    ? { ...note, title, content }
                    : note
            );
        } else {
            const newNote = {
                id: Date.now(),
                title,
                content,
            };
            updatedNotes = [...notes, newNote];
        }

        setNotes(updatedNotes);
        saveNotes(updatedNotes);
        setSelectedNote(null);
        setTitle('');
        setContent('');
    };

    const handleDeleteNote = () => {
        if (selectedNote) {
            const updatedNotes = notes.filter(
                (item) => item.id !== selectedNote.id
            );
            setNotes(updatedNotes);
            saveNotes(updatedNotes);
            setSelectedNote(null);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.modalContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter note title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.contentInput}
                multiline
                placeholder="Enter note content"
                value={content}
                onChangeText={setContent}
            />
            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSaveNote} color="#007BFF" />
                <Button title="Cancel" onPress={() => navigation.goBack()} color="#FF3B30" />
                {selectedNote && (
                    <Button title="Delete" onPress={handleDeleteNote} color="#FF9500" />
                )}
            </View>
        </View>
    );
};

export default CreateNote;



const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 0.5,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    contentInput: {
        borderBottomWidth: 0.5,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        height: 150,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
