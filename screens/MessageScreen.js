import { useRoute } from "@react-navigation/native";
import { View, Text, Button, SafeAreaView, FlatList, StyleSheet, Platform, StatusBar, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { useState, useEffect } from "react";
import tw from "twrnc";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const MessageScreen = () => {
	const { user } = useAuth();
	const { params } = useRoute();
	const { matchDetails } = params;
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(
		() =>
			onSnapshot(query(collection(db, "matches", matchDetails.id, "messages"), orderBy("timestamp", "desc")), (snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				);
			}),
		[matchDetails, db]
	);

	const sendMessage = () => {
		addDoc(collection(db, "matches", matchDetails.id, "messages"), {
			timestamp: serverTimestamp(),
			userId: user.uid,
			displayName: user.displayName,
			photoURL: matchDetails.users[user.uid].photoURL,
			message: input,
		});

		setInput("");
	};

	return (
		<SafeAreaView style={styles.AndroidSafeArea}>
			<Header title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} callEnabled />
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`} keyboardVerticalOffset={10}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<FlatList inverted={-1} data={messages} style={tw`pl-4`} keyExtractor={(item) => item.id} renderItem={({ item: message }) => (message.userId === user.uid ? <SenderMessage key={message.id} message={message} /> : <ReceiverMessage key={message.id} message={message} />)} />
				</TouchableWithoutFeedback>
				<View style={tw`flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2`}>
					<TextInput style={tw`h-10 text-lg`} placeholder="Send Message..." value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={sendMessage} />
					<Button onPress={sendMessage} title="Send" color="#FF5864" />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
export default MessageScreen;

const styles = StyleSheet.create({
	cardShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	AndroidSafeArea: {
		flex: 1,
		backgroundColor: "white",
		paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
});
