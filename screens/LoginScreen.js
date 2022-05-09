import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, ImageBackground, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";
import { useLayoutEffect } from "react";
import tw from "twrnc";

const LoginScreen = () => {
	const { signInWithGoogle, loading } = useAuth();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<View style={tw`flex-1`}>
			<ImageBackground source={{ uri: "https://tinder.com/static/tinder.png" }} resizeMode="cover" style={tw`flex-1`}>
				{!loading && (
					<TouchableOpacity onPress={signInWithGoogle} style={[tw`absolute bottom-40 w-52 bg-white p-4 rounded-2xl`, { marginHorizontal: "25%" }]}>
						<Text style={tw`text-center font-bold`}>Sign in and get swiping</Text>
					</TouchableOpacity>
				)}
			</ImageBackground>
		</View>
	);
};
export default LoginScreen;
