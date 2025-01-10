import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface VolumeInfo {
  title: string;
  authors: string[];
  subtitle: string;
  imageLinks: {
    thumbnail: string;
  };
  industryIdentifiers: {
    identifier: string;
  }[];
  pageCount: number;
  publishedDate: string;
  description: string;
  currentPage?: number;
}

interface Book {
  bookId: string;
  volumeInfo: VolumeInfo;
  tag: string;
}

interface BookItemProps {
  book: Book;
  calculateProgress: (currentPage?: number, pageCount?: number) => number;
}

const BookItem: React.FC<BookItemProps> = ({ book, calculateProgress }) => {
  const router = useRouter();
  const progress = calculateProgress(
    book.volumeInfo?.currentPage,
    book.volumeInfo?.pageCount
  );

  const bookUrl = {
    title: book.volumeInfo?.title ?? "",
    author: book.volumeInfo?.authors.join(", ") ?? "",
    thumbnail: book.volumeInfo.imageLinks?.thumbnail ?? "",
    identifier: book.volumeInfo.industryIdentifiers[0]?.identifier ?? "",
    pageCount: book.volumeInfo?.pageCount ?? "",
    publishedDate: book.volumeInfo?.publishedDate ?? "",
    description: book.volumeInfo?.description ?? "",
  };
  return (
    <View key={book.bookId} style={styles.bookListContainer}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `../(Book)/${book.bookId}`,
            params: bookUrl,
          })
        }
      >
        <View>
          <Image
            source={{ uri: book.volumeInfo.imageLinks?.thumbnail }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{book.volumeInfo?.title}</Text>
        <Text style={styles.author}>{book.volumeInfo?.authors.join(", ")}</Text>
        <Text>{book.volumeInfo?.subtitle}</Text>
        <Text style={styles.tag}>{book?.tag}</Text>
        {book.tag === "Currently Reading" && (
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookListContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
    textAlign: "center",
  },
  tag: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  currentlyreading: {
    backgroundColor: "#76c7c0",
    color: "#fff",
  },
  readlater: {
    backgroundColor: "#f0ad4e",
    color: "#fff",
  },
  donereading: {
    backgroundColor: "#5cb85c",
    color: "#fff",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#76c7c0",
  },
});

export default BookItem;
