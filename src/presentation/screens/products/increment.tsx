import { Pressable, StyleSheet, Text, View } from "react-native"
import { CustomIcon } from "../../components"
import { useState } from "react"
import { Layout } from "@ui-kitten/components"


export const Increment = ({aditional}: any) => {
    const [item, setItem] = useState(0)

    const handleIncrement = () => {
        setItem(item + 1)
    }

    const handleDecrement = () => {
        setItem(item - 1)
    }

    return (
        <View style={styles.counterContainer}>
            <Layout style={{ width: '50%' }}>
                <Text style={{ fontSize: 16 }}>{aditional}</Text>
            </Layout>
            <Layout style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Pressable
                    disabled={item <= 0}
                    style={[styles.button, item > 0 ? styles.buttonActive : styles.buttonInactive]}
                    onPress={handleDecrement}>
                    {/* <CustomIcon
                        name='remove'
                        width={25}
                        white={true}
                    /> */}
                    <Text style={{ color: 'white' }}>-</Text>
                </Pressable>
                <Text
                    style={styles.textCount}
                >
                    {item}
                </Text>
                <Pressable
                    style={styles.button}
                    onPress={handleIncrement}>
                    {/* <CustomIcon
                        name='add'
                        width={25}
                        white={true}
                    /> */}
                    <Text style={{ color: 'white' }}>+</Text>
                </Pressable>
            </Layout>
        </View>
    )
}

const styles = StyleSheet.create({

	counterContainer: {
		flexDirection: 'row',
		gap: 15,
		alignItems: 'center',
		justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        padding: 20
	},
	button: {
		backgroundColor: '#3fc1f2',
		width: 30,
		height: 30,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonActive: {
		backgroundColor: '#3fc1f2',
	},
	buttonInactive: {
		backgroundColor: '#3fc1f255',
	},
	textCount: {
		fontSize: 20,
	},
})