import { getBookByIsbn } from "@/api/books";
import { FIRESTORE_DB } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);

  useEffect(() => {
    // when page loads, get books data from firebase database
    // getAllDocuments();

    loadCachedBooks();
  }, [books]);

  const loadCachedBooks = async () => {
    // get all keys in local storage (for testing purposes)
    // const keys = await AsyncStorage.getAllKeys();
    // const result = await AsyncStorage.multiGet(keys); // Get all key-value pairs
    // console.log(result);

    try {
      const getBooks = await AsyncStorage.getItem("Books");

      if (getBooks) {
        const parsedBookObject = JSON.parse(getBooks);
        // console.log("Books loaded:", parsedBookObject);
        setBooks(parsedBookObject);
      }

      // console.log("parsed Book", books);
    } catch (error) {
      console.error("Error loading array:", error);
    }
  };

  // const getAllDocuments = async () => {
  //   const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
  //   const booksData = querySnapshot.docs.map((doc) => {
  //     return { id: doc.id, ...doc.data() };
  //   });
  //   setBooks(booksData);
  // };

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      const filteredData = books.filter((book: any) =>
        book.volumeInfo.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filteredData);
    } else if (query.trim() === "") {
      return books;
    }
  };

  const getCameraPermissions = async () => {
    // ask user for permission to use camera
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
    } else {
      setHasPermission(false);
      Alert.alert("Permission denied", "You cannot access the camera.");
    }
  };

  const onOpenDropdownList = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const handleOptionPress = (option: any) => {
    if (option.label === "QR Code") {
      getCameraPermissions();
      setCameraActive(true);
      setScanner(false);
      setDropdownVisible(false);
    }
  };

  const handleBarcodeScanner = async ({ data }: any) => {
    setScanner(true);
    const bookData = await getBookByIsbn(data);
    // addBook(bookData);
    setCameraActive(false);
    router.push({
      pathname: "/(AddBook)/BookOptions",
      params: {
        data: bookData,
        volumeInfo: JSON.stringify({ info: bookData.items[0].volumeInfo }),
        bookId: bookData.items[0].id,
      },
    });
  };

  // const addBook = async (book: any) => {
  //   // After user successfully scanned book, add to newBook object
  //   const newBook = {
  //     bookId: book.items[0].id,
  //     volumeInfo: book.items[0].volumeInfo,
  //   };

  //   try {
  //     const db = await addDoc(collection(FIRESTORE_DB, "users"), newBook);
  //   } catch (error) {
  //     console.log("error adding document", error);
  //   }
  // };

  const renderItems: ListRenderItem<any> = ({ item }) => (
    <View style={styles.bookListContainer}>
      <TouchableOpacity
        onPress={() =>
          router.push(
            `./(Book)/${item.id}?title=${encodeURIComponent(
              item.volumeInfo.title
            )}&author=${encodeURIComponent(
              item.volumeInfo.authors
            )}&thumbnail=${encodeURIComponent(
              item.volumeInfo.imageLinks?.thumbnail
            )}`
          )
        }
      >
        <Image
          source={{ uri: item.volumeInfo.imageLinks?.thumbnail }}
          style={{ width: 100, height: 100 }}
        />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Title {item.volumeInfo?.title}
        </Text>
        <Text style={{ fontSize: 14, fontStyle: "italic" }}>
          {item.volumeInfo?.authors}
        </Text>
        <Text>{item.volumeInfo?.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        style={{ marginLeft: 20, marginRight: 20 }}
        data={searchQuery ? filteredBooks : books}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
      />
      {!cameraActive ? (
        <Pressable style={styles.buttonStyle} onPress={onOpenDropdownList}>
          <Text>+</Text>
        </Pressable>
      ) : (
        <View>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanner ? undefined : handleBarcodeScanner}
          />
          <Pressable
            style={{
              width: 60,
              height: 40,
              backgroundColor: "yellow",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setCameraActive(false)}
          >
            <Text>X</Text>
          </Pressable>
        </View>
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

  searchBar: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

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
