import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/config/firebaseConfig";

const Book = () => {
  const { id } = useGlobalSearchParams();
  const [bookInfo, setBookInfo] = useState<any>(null);
  useEffect(() => {
    if (!id) return;

    const loadBookData = async () => {
      const getDocument = doc(FIRESTORE_DB, `users/${id}`);
      const documentSnapshot = await getDoc(getDocument);

      if (!documentSnapshot.exists()) return;

      const docData = documentSnapshot.data();
      setBookInfo(docData);
    };

    loadBookData();

    console.log(bookInfo);
  }, [id]);

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerTitle: bookInfo ? `${bookInfo.volumeInfo.title}` : "---",
        }}
      />

      {bookInfo && (
        <>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Image
                source={{ uri: bookInfo.volumeInfo.imageLinks.thumbnail }}
                style={styles.image}
              />
              <Text style={styles.title}>{bookInfo.volumeInfo.title}</Text>
              <Text style={styles.description}>
                {bookInfo.volumeInfo.description}
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Book;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3, // Adds a shadow (Android)
    shadowColor: "#000", // Shadow color for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowRadius: 5, // Shadow radius for iOS
    marginVertical: 10,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
