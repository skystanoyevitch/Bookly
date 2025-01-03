import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// type Book = {
//   bookId: string;
//   volumeInfo: {};
// };

const BookOptions = () => {
  // const router = useRouter();
  const { bookId, volumeInfo }: any = useLocalSearchParams();
  const parsedPreferences = volumeInfo ? JSON.parse(volumeInfo) : null;

  const addBook = async (id: any, bookInfo: any) => {
    // 2. create new book object
    const newBook = {
      bookId: id,
      volumeInfo: bookInfo,
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
    <View>
      <Text>Title: {parsedPreferences?.info.title}</Text>
      <Text>Author: {parsedPreferences?.info.authors}</Text>
      <Text>Description: {parsedPreferences?.info.description}</Text>

      <Pressable onPress={() => addBook(bookId, parsedPreferences.info)}>
        <Text
          style={{
            padding: 20,
            borderRadius: 20,
            backgroundColor: "gray",
          }}
        >
          Add Book
        </Text>
      </Pressable>
      <TouchableOpacity>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookOptions;
