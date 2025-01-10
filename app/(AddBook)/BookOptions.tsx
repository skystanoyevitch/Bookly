// import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { useState } from "react";

// type Book = {
//   bookId: string;
//   volumeInfo: {};
// };

interface VolumeInfo {
  title: string;
  authors: string[];
  imageLinks: {
    thumbnail: string;
  };
  industryIdentifiers: {
    idenfifier: string;
  }[];
  pageCount: number;
  publishedDate: string;
  description: string;
  currentPage: number;
}

interface Book {
  bookId: string;
  volumeInfo: VolumeInfo;
  tag: string;
}

const BookOptions: React.FC = () => {
  // const router = useRouter();
  const { bookId, volumeInfo }: { bookId: string; volumeInfo: string } =
    useLocalSearchParams();
  const parsedPreferences = volumeInfo ? JSON.parse(volumeInfo) : null;
  const [currentlyReading, setCurrentlyReading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>("");
  const [pageCount, setPageCount] = useState<string | number>(
    parsedPreferences?.info.pageCount || ""
  );

  const addBook = async (id: string, bookInfo: VolumeInfo, bookTag: string) => {
    // 2. create new book object
    const newBook: Book = {
      bookId: id,
      volumeInfo: bookInfo,
      tag: bookTag,
    };
    try {
      // 1. Get existing books from local storage
      const getStoredBooks = await AsyncStorage.getItem("Books");
      // console.log(getStoredBooks);
      let listOfBooks: Book[] = [];
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
      // console.log("Book saved", listOfBooks);
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

  const handleCurrentlyReading = () => {
    if (
      isNaN(Number(currentPage)) ||
      Number(currentPage) < 1 ||
      Number(currentPage) > Number(pageCount)
    ) {
      setError("Please enter a valid page number.");
    } else {
      setError("");
      addBook(
        bookId,
        { ...parsedPreferences.info, currentPage, pageCount },
        "Currently Reading"
      );
    }
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
          onPress={() => setCurrentlyReading(!currentlyReading)}
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
      {currentlyReading && (
        <View style={styles.currentlyReadingCard}>
          <Text style={styles.cardTitle}>
            Page Count: {pageCount || "Not available"}
          </Text>
          {!pageCount && (
            <TextInput
              style={styles.input}
              placeholder="Enter total page count"
              value={pageCount.toString()}
              onChangeText={setPageCount}
              keyboardType="numeric"
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Enter current page"
            value={currentPage}
            onChangeText={setCurrentPage}
            keyboardType="numeric"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Pressable
            style={styles.skeuomorphicButton}
            onPress={handleCurrentlyReading}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      )}
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
  currentlyReadingCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
