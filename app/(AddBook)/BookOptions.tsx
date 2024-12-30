import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { Text, TouchableOpacity, View } from "react-native";

const BookOptions = () => {
  // const router = useRouter();
  const { bookId, volumeInfo }: any = useLocalSearchParams();
  const parsedPreferences = volumeInfo ? JSON.parse(volumeInfo) : null;

  // const { id, [searchInfo], textSnippet }: any = useLocalSearchParams();
  // console.log("Destructured data", id, searchInfo, textSnippet);
  // console.log("params:", bookId, "info:", parsedPreferences.info);

  // const handleOnPress = () => {
  //   addBook(bookId, parsedPreferences.info);
  // };
  const addBook = async (id: any, bookInfo: any) => {
    // After user successfully scanned book and clicked "add", add to newBook object and firebase DB //
    const newBook = {
      bookId: id,
      volumeInfo: bookInfo,
    };

    try {
      const db = await addDoc(collection(FIRESTORE_DB, "users"), newBook);
      // console.log(db);
      router.back();
    } catch (error) {
      console.log("error adding document", error);
    }
  };

  return (
    <View>
      <Text>Title: {parsedPreferences?.info.title}</Text>
      <Text>Author: {parsedPreferences?.info.authors}</Text>
      <Text>Description: {parsedPreferences?.info.description}</Text>

      <TouchableOpacity onPress={() => addBook(bookId, parsedPreferences.info)}>
        <Text
          style={{
            padding: 20,
            borderRadius: 20,
            backgroundColor: "gray",
          }}
        >
          Add Book
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookOptions;
