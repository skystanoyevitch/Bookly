import { getBookByIsbn } from "@/api/books";
import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  ListRenderItem,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const options = [
  { id: "1", label: "QR Code" },
  { id: "2", label: "Search Online" },
  { id: "3", label: "Add Manually" },
];

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<any | null>(null);
  const [scanner, setScanner] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

      // console.log(books);
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
      setDropdownVisible(false);
      Alert.alert("Permission granted", "You can now access the camera!");
    } else {
      setHasPermission(false);
      Alert.alert("Permission denied", "You cannot access the camera.");
    }
  };

  const onOpenDropdownList = () => {
    setDropdownVisible((prevState) => !prevState);
  };
  const handleOptionPress = (option: any) => {
    // alert(`${option.label} - pressed!`);

    if ((option = "QR Code")) {
      getCameraPermissions();
    }
    // switch (option) {
    //   case "QR Code":
    //     getCameraPermissions;

    //     break;

    //   default:
    //     break;
    // }
  };

  const handleBarcodeScanner = async ({ type, data }: any) => {
    console.log("camera loading...");
    setScanner(true);
    console.log("camera opened!");
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

  const renderItems: ListRenderItem<any> = ({ item }) => (
    <View style={styles.bookListContainer}>
      <TouchableOpacity onPress={() => router.push(`./(Book)/${item.id}`)}>
        <Image
          source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
          style={{ width: 100, height: 100 }}
        />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {item.volumeInfo.title}
        </Text>
        <Text style={{ fontSize: 14, fontStyle: "italic" }}>
          {item.volumeInfo.authors}
        </Text>
        <Text>{item.volumeInfo.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginLeft: 20, marginRight: 20 }}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
      />
      {!cameraActive ? (
        <Pressable style={styles.buttonStyle} onPress={onOpenDropdownList}>
          <Text>+</Text>
        </Pressable>
      ) : (
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanner ? undefined : handleBarcodeScanner}
        />
      )}

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <View key={option.id}>
              <Pressable
                style={({ pressed }) => [
                  styles.dropdownOption,
                  { backgroundColor: pressed ? "#ddd" : "#fff" },
                ]}
                onPress={() => handleOptionPress(option)}
              >
                <Text>{option.label}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainViewContainer: {},

  bookListContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },

  textInput: {
    borderColor: "blue",
    borderWidth: 1,
    margin: 15,
    padding: 22,
  },
  buttonStyle: {
    position: "absolute", // Floating effect
    bottom: 30, // Distance from bottom
    right: 30, // Distance from right
    width: 60, // Circle size
    height: 60, // Circle size
    borderRadius: 30, // Makes it round
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  dropdown: {
    position: "absolute",
    bottom: 100, // Place it above the button
    right: 30,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 5,
    width: 200,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  imageBackgroundStyles: {
    width: "100%",
    height: 150,
  },
  camera: {
    width: 300,
    height: 300,
  },
});
