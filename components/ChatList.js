import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import tw from "twrnc";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import ChatRow from "./ChatRow";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";

const ChatList = () => {
	const [matches, setMatches] = useState([]);
	const { user } = useAuth();

	useEffect(
		() =>
			onSnapshot(query(collection(db, "matches"), where("usersMatched", "array-contains", user.uid)), (snapshot) =>
				setMatches(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				)
			),
		[user]
	);

	console.log(matches);

	return matches.length > 0 ? (
		<FlatList style={tw`h-full`} data={matches} keyExtractor={(item) => item.id} renderItem={({ item }) => <ChatRow matchDetails={item} />} />
	) : (
		<View style={tw`p-5`}>
			<Text>No matches at the moment 😢</Text>
		</View>
	);
};
export default ChatList;
