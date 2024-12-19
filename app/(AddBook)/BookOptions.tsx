import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { Text, TouchableOpacity, View } from "react-native";

const BookOptions = () => {
  // const router = useRouter();
  const { bookId, title, authors, description, volumeInfo }: any =
    useLocalSearchParams();
  const parsedPreferences = volumeInfo ? JSON.parse(volumeInfo) : null;

  // const { id, [searchInfo], textSnippet }: any = useLocalSearchParams();
  // console.log("Destructured data", id, searchInfo, textSnippet);
  console.log(
    "params:",
    bookId,
    title,
    authors,
    description,
    "info:",
    parsedPreferences.info.title
  );

  // const addBook = async () => {
  //   // After user successfully scanned book, add to newBook object
  //   const newBook = {
  //     // bookId: id,
  //     title: "",
  //   };

  //   try {
  //     const db = await addDoc(collection(FIRESTORE_DB, "users"), newBook);
  //     router.push("/");
  //   } catch (error) {
  //     console.log("error adding document", error);
  //   }
  // };

  return (
    <View>
      <Text>Title: {parsedPreferences?.info.title}</Text>
      <Text>Author: {parsedPreferences?.info.authors}</Text>
      <Text>Description: {parsedPreferences?.info.description}</Text>

      {/* <TouchableOpacity onPress={addBook}>
        <Text>Add Book</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Cancel</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default BookOptions;
