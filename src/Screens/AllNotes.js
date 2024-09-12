import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
const AllNotes = () => {
  const {selectedLanguage} = useSelector(state => state.languageReducer)
  const [allNotes, setAllNotes] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadAllNotes();
  }, []);

  const loadAllNotes = async () => {
    const keys = [
      'notes_sunday',
      'notes_monday',
      'notes_tuesday',
      'notes_wednesday',
      'notes_thursday',
      'notes_friday',
      'notes_saturday',
    ];

    try {
      const notesArray = await AsyncStorage.multiGet(keys);
      const allNotesArray = notesArray.reduce((acc, [key, value]) => {
        if (value) {
          const parsedNotes = JSON.parse(value).map(note => {
            if (!note.day) {
              note.day = key.replace('notes_', '');
            }
            return note;
          });
          acc.push(...parsedNotes);
        }
        return acc;
      }, []);

      setAllNotes(allNotesArray);
    } catch (error) {
      console.log('Failed to load all notes', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleDeleteNote = async note => {
    const dayKey = `notes_${(note.day?.toString().toLowerCase() || '').replace(
      ' ',
      '',
    )}`;
    try {
      const notes = await AsyncStorage.getItem(dayKey);
      if (notes) {
        const updatedNotes = JSON.parse(notes).filter(
          item => item.id !== note.id,
        );
        await AsyncStorage.setItem(dayKey, JSON.stringify(updatedNotes));
        loadAllNotes();
      }
    } catch (error) {
      console.log('Failed to delete note', error);
    }
  };

  const renderNotes = useMemo(() => {
    return allNotes.map((note, index) => {
      const day = note.day ? note.day.toString().toLowerCase() : 'unknown';

      return (
        <GestureHandlerRootView key={index}>
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity
                onPress={() => handleDeleteNote(note)}
                style={
                  isGridView ? styles.gridDeleteButton : styles.listDeleteButton
                }>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateNote', {
                  note,
                  noteKey: `notes_${day}`,
                  updateNotes: loadAllNotes,
                })
              }
              style={isGridView ? styles.gridCard : styles.listCard}>
              <Text style={styles.noteTitle}>Title: {note.title}</Text>
              <Text style={styles.noteContent}>{note.content}</Text>
              <Text style={styles.noteDay}>Day: {note.day || 'Unknown'}</Text>
            </TouchableOpacity>
          </Swipeable>
        </GestureHandlerRootView>
      );
    });
  }, [allNotes, isGridView]);

  const toggleViewMode = () => {
    setIsGridView(!isGridView);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007BFF"
          style={{justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            allNotes.length === 0
              ? styles.emptyContainer
              : isGridView
              ? styles.gridContainer
              : null
          }
          style={styles.noteList}>
          {allNotes.length === 0 ? (
            <>
            <View style={{marginTop:10,}}>
            <Image source={require('../assets/images/nonActive.png')} style={styles.image}/>
            <Text style={styles.emptyText}>{selectedLanguage.no_notes_availible}</Text>
            </View>
            </>
          ) : (
            renderNotes
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default AllNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noteList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  gridCard: {
    width: '48%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteContent: {
    marginTop: 5,
    fontSize: 14,
  },
  noteDay: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  listDeleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
  gridDeleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 60,
    marginVertical: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 10,
  },
  image:{
    width:100,
    height:100,
    marginHorizontal:widthPercentageToDP(5),
    marginVertical:heightPercentageToDP(3)
  }
});
