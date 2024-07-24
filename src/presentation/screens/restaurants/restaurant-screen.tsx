import { StackScreenProps } from "@react-navigation/stack"
import { Layout } from "@ui-kitten/components"
import { RootStackParams } from "../../../interfaces"
import { useEffect, useState } from "react"
import axios from "axios"
import { Pressable, StyleSheet, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { CustomIcon } from "../../components"
import { globalColors } from "../../theme/styles"
import { Image } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"

interface Props extends StackScreenProps<RootStackParams, 'RestaurantScreen'> {}


export const Restaurant = ({route}: any) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const {idRestaurant} = route.params
    const [data, setData] = useState<any>({})
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://orbeapi.devzeros.com/api_v1/restaurant/getById?idRestaurant=${idRestaurant}`);
                setData(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [idRestaurant]);
    
    return (
        <Layout style={styles.container}>
            <Layout style={styles.imageContainer}>
                <Pressable onPress={() => navigation.goBack()} style={styles.arrowBackButton}>
                    <CustomIcon fill={globalColors.primary} name='arrow-back' />
                </Pressable>
                <Image style={{ width: '60%', height: '80%' }} source={require('../../../assets/restaurant.png')} />
            </Layout>
            <ScrollView>
                <Text style={{ fontSize: 36, padding: 10, color: 'black' }}>
                    {data.name}
                </Text>
                <Text style={{ fontSize: 12, paddingHorizontal: 10, color: 'black' }}>
                    {data.description}
                </Text>
                <Text style={{ fontSize: 12, paddingHorizontal: 10, color: 'black' }}>
                    {data.phone}
                </Text>
                <Text style={{ fontSize: 12, paddingHorizontal: 10, color: 'gray' }}>
                    {data.address}
                </Text>
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    arrowBackButton: {
        position: 'absolute',
        borderRadius: 50,
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: globalColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        left: 20,
        top: 20,
        backgroundColor: 'white'
    },
    imageContainer: {
        height: '35%',
        width: '100%',
        backgroundColor: '#3fc1f2',
        justifyContent: 'center',
        alignItems: 'center'
    }
})