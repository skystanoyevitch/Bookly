import { getBookByIsbn } from "@/api/books";
import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<any | null>(null);
  const [scanner, setScanner] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [books, setBooks] = useState<any[]>([]);

  // TODO: fix and refactor logic to add book to firestore DB and retrieve it in the UI //

  useEffect(() => {
    // when page loads, get books data from firebase database

    const getAllDocuments = async () => {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
      const booksData = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
        // console.log(doc.id, " => ", doc.data());
      });
      setBooks(booksData);

      console.log(books);
    };

    // const getCollection = collection(FIRESTORE_DB, "users");
    // const snapshot = getCollection.get()
    // if (getCollection.empty) {
    //   console.log('No matching documents.');
    //   return;
    // }
    // onSnapshot(getCollection, (snapshot) => {
    //   const books = snapshot.docs.map((doc) => {
    //     return { id: doc.id, ...doc.data };
    //   });
    //   setBooks(books);
    // });

    getAllDocuments();
  }, [books]);

  const getCameraPermissions = async () => {
    // ask user for permission to use camera
    const { status } = await Camera.requestCameraPermissionsAsync();
    // setHasPermission(status === "granted");

    if (status === "granted") {
      setHasPermission(true);
      setCameraActive(true);
      setScanner(false);
      Alert.alert("Permission granted", "You can now access the camera!");
    } else {
      setHasPermission(false);
      Alert.alert("Permission denied", "You cannot access the camera.");
    }
  };

  const handleBarcodeScanner = async ({ type, data }: any) => {
    setScanner(true);
    const bookData = await getBookByIsbn(data);
    // console.log(bookData.items[0].id);
    addBook(bookData);
    setCameraActive(false);
  };

  const addBook = async (book: any) => {
    // After user successfully scanned book, add to newBook object
    const newBook = {
      bookId: book.items[0].id,
      volumeInfo: book.items[0].volumeInfo,
    };

    try {
      const db = await addDoc(collection(FIRESTORE_DB, "users"), newBook);
    } catch (error) {
      console.log("error adding document", error);
    }

    // console.log(newBook);
    // console.log(db);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainViewContainer}>
        {!cameraActive ? (
          <Pressable style={styles.buttonStyle} onPress={getCameraPermissions}>
            <Text>Tap to scan QR Code</Text>
          </Pressable>
        ) : (
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanner ? undefined : handleBarcodeScanner}
          />
        )}

        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text> --- {item.volumeInfo.title}</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  title: {
    color: "blue",
    textAlign: "center",
    fontSize: 20,
  },

  mainViewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    borderColor: "blue",
    borderWidth: 1,
    margin: 15,
    padding: 22,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 100,
    padding: 15,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  imageBackgroundStyles: {
    width: "100%",
    height: 150,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});
