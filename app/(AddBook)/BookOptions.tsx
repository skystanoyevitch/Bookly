import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const BookOptions = () => {
  const { description } = useLocalSearchParams();
  console.log("add book page", `${description}`);
  return (
    <View>
      <Text>Description: {description}</Text>
    </View>
  );
};

export default BookOptions;
