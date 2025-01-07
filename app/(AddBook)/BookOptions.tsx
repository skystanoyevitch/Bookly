import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

// type Book = {
//   bookId: string;
//   volumeInfo: {};
// };

const BookOptions = () => {
  // const router = useRouter();
  const { bookId, volumeInfo }: any = useLocalSearchParams();
  const parsedPreferences = volumeInfo ? JSON.parse(volumeInfo) : null;
  // console.log(parsedPreferences.info.imageLinks.thumbnail);

  const addBook = async (id: any, bookInfo: any, bookTag: string) => {
    // 2. create new book object
    const newBook = {
      bookId: id,
      volumeInfo: bookInfo,
      tag: bookTag,
    };
    try {
      // 1. Get existing books from local storage
      const getStoredBooks = await AsyncStorage.getItem("Books");
      // console.log(getStoredBooks);
      let listOfBooks = [];
      if (getStoredBooks) {
        listOfBooks = JSON.parse(getStoredBooks) || [];

        // Check if the parsed data is not an array (defensive coding)
        if (!Array.isArray(listOfBooks)) {
          listOfBooks = [];
        }
      }

      // 3. add new book to the end of the array of books
      listOfBooks.push(newBook);

      // 4. Store book in local storage
      await AsyncStorage.setItem("Books", JSON.stringify(listOfBooks));
      console.log("Book saved", listOfBooks);
      router.back();
    } catch (error) {
      console.error("Error saving data:", error);
    }

    // TODO = 5. add book to Firestore Database

    // try {
    //   const db = await addDoc(collection(FIRESTORE_DB, "users"), newBook);
    //   // console.log(db);
    //   router.back();
    // } catch (error) {
    //   console.log("error adding document", error);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailCard}>
        <Image
          source={{ uri: parsedPreferences.info.imageLinks?.thumbnail }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </View>
      <Text>Title: {parsedPreferences?.info.title}</Text>
      <Text>Author: {parsedPreferences?.info.authors}</Text>
      <Text>Description: {parsedPreferences?.info.description}</Text>

      {/* <Pressable onPress={() => addBook(bookId, parsedPreferences.info)}>
        <Text
          style={{
            padding: 20,
            borderRadius: 20,
            backgroundColor: "gray",
          }}
        >
          Add Book
        </Text>
      </Pressable> */}
      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.skeuomorphicButton}
          onPress={() =>
            addBook(bookId, parsedPreferences.info, "Done Reading")
          }
        >
          <Text style={styles.buttonText}>Done Reading</Text>
        </Pressable>
        <Pressable
          style={styles.skeuomorphicButton}
          onPress={() =>
            addBook(bookId, parsedPreferences.info, "Currently Reading")
          }
        >
          <Text style={styles.buttonText}>Currently Reading</Text>
        </Pressable>
        <Pressable
          style={styles.skeuomorphicButton}
          onPress={() => addBook(bookId, parsedPreferences.info, "Read Later")}
        >
          <Text style={styles.buttonText}>Read Later</Text>
        </Pressable>
      </View>
      {/* <TouchableOpacity>
        <Text>Cancel</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default BookOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  thumbnailCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
    alignItems: "center",
  },
  thumbnail: {
    width: 200,
    height: 350,
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "gray",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  skeuomorphicButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
});
