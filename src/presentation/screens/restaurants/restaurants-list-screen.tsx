import { Layout } from "@ui-kitten/components"
import axios from "axios"
import { useEffect, useState } from "react"
import { Image, Pressable, ScrollView, StyleSheet, Text } from "react-native"
import { RootStackParams } from "../../../interfaces"
import { StackScreenProps } from "@react-navigation/stack"
import { orbeApi } from "../../../config/api"

interface Props extends StackScreenProps<RootStackParams, 'RestaurantList'> { }

export const RestaurantList = ({ navigation }: Props) => {
    const [restaurants, setRestaurants] = useState([])
    const [restaurantId, setRestaurantId] = useState<number>()

    useEffect(() => {
        const fetchRestaurants = async () => {
            const res = await axios.get('http://154.38.180.23:3001/api_v1/restaurant?skip=1&take=100')
            setRestaurants(res.data.data)
        }
        fetchRestaurants()
    }, [])

    const redirect = (id: any) => {
        navigation.navigate('RestaurantScreen', { idRestaurant: id })
    }


    return (
        <ScrollView style={styles.container}>
            <Layout style={styles.container_restaurant_list}>
                {
                    restaurants.map((restaurant: any) => {
                        const attachment = restaurant.attachments[0];
                        // const image = attachment.image_url;
                        const image = ''
                        console.log(attachment)
                        return (
                            <Layout key={restaurant.id} style={styles.restaurant}>
                                <Pressable onPress={() => redirect(restaurant.id)} style={styles.restaurant_touch}>
                                    {image.length > 0 ? image : (<Image style={styles.restaurant_image} source={require('../../../assets/restaurant.png')} />)}
                                    <Text style={styles.restaurant_name}>{restaurant.name}</Text>
                                </Pressable>
                            </Layout>
                        )
                    })
                }
            </Layout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    container_restaurant_list: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 20
    },
    restaurant: {
        width: 350,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    restaurant_touch: {
        width: 350,
        paddingVertical: 25,
        borderRadius: 25,
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    restaurant_image: {
        width: 60,
        height: 60,
    },
    restaurant_name: {
        fontSize: 18,
        textAlign: 'center'
    }
})