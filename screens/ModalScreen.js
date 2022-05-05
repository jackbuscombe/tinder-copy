import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import tw from "twrnc";
import useAuth from "../hooks/useAuth";
import { useState, useLayoutEffect } from "react";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

const ModalScreen = () => {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [image, setImage] = useState(null);
	const [occupation, setOccupation] = useState(null);
	const [age, setAge] = useState(null);

	const incompleteForm = !image || !occupation || !age;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
			headerTitle: "Update Your Profile",
			headerStyle: {
				backgroundColor: "#FF5864",
			},
			headerTitleStyle: { color: "white" },
		});
	}, []);

	const updateUserProfile = () => {
		setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			displayName: user.displayName,
			photoURL: image,
			occupation: occupation,
			age: age,
			timestamp: serverTimestamp(),
		})
			.then(() => {
				navigation.navigate("Home");
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<SafeAreaView style={[tw`items-center`, styles.AndroidSafeArea]}>
			<Image style={tw`h-20 w-full`} resizeMode="contain" source={{ uri: "https://links.papareact.com/2pf" }} />
			<Text style={tw`text-xl text-gray-500 p-2 font-bold`}>Welcome {user.displayName}</Text>

			<Text style={tw`text-center p-4 font-bold text-red-400`}>Step 1: Profile Picture</Text>
			<TextInput value={image} onChangeText={(text) => setImage(text)} style={tw`text-center text-xl pb-2`} placeholder="Enter a profile picture URL" />

			<Text style={tw`text-center p-4 font-bold text-red-400`}>Step 2: Occupation</Text>
			<TextInput value={occupation} onChangeText={(text) => setOccupation(text)} style={tw`text-center text-xl pb-2`} placeholder="Enter your occupation" />

			<Text style={tw`text-center p-4 font-bold text-red-400`}>Step 3: Age</Text>
			<TextInput value={age} onChangeText={(text) => setAge(text)} maxLength={2} keyboardType="numeric" style={tw`text-center text-xl pb-2`} placeholder="Enter your age" />

			<TouchableOpacity onPress={updateUserProfile} disabled={incompleteForm} style={[tw`w-64 p-3 rounded-xl absolute bottom-10 bg-red-400`, incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`]}>
				<Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};
export default ModalScreen;

const styles = StyleSheet.create({
	AndroidSafeArea: {
		flex: 1,
		backgroundColor: "white",
		paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
});
