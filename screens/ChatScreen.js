import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import ChatList from "../components/ChatList";
import Header from "../components/Header";
const ChatScreen = () => {
	return (
		<SafeAreaView style={styles.AndroidSafeArea}>
			<Header title="Chat" />
			<ChatList />
		</SafeAreaView>
	);
};
export default ChatScreen;

const styles = StyleSheet.create({
	AndroidSafeArea: {
		flex: 1,
		backgroundColor: "white",
		paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
});
