import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";

const MatchScreen = () => {
	const navigation = useNavigation();
	const { params } = useRoute();

	const { loggedInProfile, userSwiped } = params;

	return (
		<View style={[tw`h-full bg-red-500 pt-20`, { opacity: 0.89 }]}>
			<View style={tw`justify-center px-6 pt-20`}>
				<Image style={tw`h-20 w-full`} source={{ uri: "https://links.papareact.com/mg9" }} />

				<Text style={tw`text-white text-center mt-5 text-lg`}>You and {userSwiped.displayName} have liked each other.</Text>

				<View style={tw`flex-row justify-evenly mt-5`}>
					<Image style={tw`h-32 w-32 rounded-full`} source={{ uri: loggedInProfile.photoURL }} />
					<Image style={tw`h-32 w-32 rounded-full`} source={{ uri: userSwiped.photoURL }} />
				</View>

				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
						navigation.navigate("Chat");
					}}
					style={tw`bg-white m-5 px-6 py-4 rounded-full mt-20`}
				>
					<Text style={tw`text-center text-lg`}>Send a Message</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default MatchScreen;
