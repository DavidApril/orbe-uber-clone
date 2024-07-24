import {Text, Image, StyleSheet, Pressable, ImageBackground, Modal} from "react-native"
import {useEffect, useState} from "react";
import { Input, Layout } from "@ui-kitten/components";
import { CustomIcon } from "../../components";
import { RootStackParams } from "../../../interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { Increment } from "./increment";
import { globalColors } from "../../theme/styles";

interface ProductI {
    id: number;
    name: string;
    image_url: string;
    price: number;
    deliveryTime: string;
    rating: number;
    description: string;
}

interface Props extends StackScreenProps<RootStackParams, 'ProductItem'> {}

export const ProductItemScreen = ({navigation}: Props) => {
    const [product, setProduct] = useState<ProductI>()
    const [countProduct, setCountProduct] = useState(0)
    const [priceFinal, setPriceFinal] = useState<any>(0)
    const [photoOpen, setPhotoOpen] = useState<boolean>(false)
    const [preModal, setPreModal] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [additionalInfo, setAdditionalInfo] = useState('');

    
    const productData = [
        {
            id: '1',
            name: 'Pizza Margherita',
            image_url: 'https://i.pinimg.com/564x/0a/34/c1/0a34c17ac88f93878b0d3253ffd39e1f.jpg',
            price: (Math.random() * 10).toFixed(2),
            deliveryTime: (Math.random() * 60).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            description: 'Una clásica pizza italiana cubierta con salsa de tomate, queso mozzarella fresco y hojas de albahaca. ¡Simple pero deliciosa!'
        },
        {
            id: '2',
            name: 'Sushi Platter',
            image_url: 'https://i.pinimg.com/564x/1c/78/f4/1c78f4ffacffbb0e4858cffa67fc7009.jpg',
            price: (Math.random() * 10).toFixed(2),
            deliveryTime: (Math.random() * 60).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            description: 'Una variedad de rollos de sushi frescos que incluyen nigiri de salmón, sashimi de atún y rollos California con aguacate.'
        },
        {
            id: '3',
            name: 'Hamburguesa con Papas Fritas',
            image_url: 'https://i.pinimg.com/564x/12/a8/db/12a8dba6ad2279644dfc48cabd3a9ca3.jpg',
            price: (Math.random() * 10).toFixed(2),
            deliveryTime: (Math.random() * 60).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            description: 'Una jugosa hamburguesa de carne con queso derretido, lechuga, tomate y pepinillos, acompañada de papas fritas doradas y crujientes.'
        },
        {
            id: '4',
            name: 'Espagueti Carbonara',
            image_url: 'https://i.pinimg.com/564x/79/b0/4d/79b04dc4c8f3c438c63a8c25bb2ba3c8.jpg',
            price: (Math.random() * 10).toFixed(2),
            deliveryTime: (Math.random() * 60).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            description: 'Plato de pasta italiana hecho con espagueti, salsa cremosa de huevo, panceta y queso Parmesano rallado.'
        },
        {
            id: '5',
            name: 'Ensalada César',
            image_url: 'https://i.pinimg.com/564x/07/b3/fa/07b3fa5f80454a92f323140a4504ad23.jpg',
            price: (Math.random() * 10).toFixed(2),
            deliveryTime: (Math.random() * 60).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            description: 'Lechuga romana fresca mezclada con aderezo César, crutones y virutas de queso Parmesano.'
        },
        {
            id: '6',
            name: 'Tacos',
            image_url: 'https://i.pinimg.com/564x/55/4d/c5/554dc5442570bb50344b45145d63db8b.jpg',
            price: (Math.random() * 10).toFixed(2),
            deliveryTime: (Math.random() * 60).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            description: 'Tacos mexicanos rellenos de carne asada sazonada, salsa, cilantro y un toque de limón.'
        },
        {
            id: '7',
            name: 'Panqueques',
            image_url: 'https://i.pinimg.com/564x/98/6e/80/986e8020d901fe1c313e9460495ec5c3.jpg',
            price: (Math.random() * 10).toFixed(2),
            deliveryTime: (Math.random() * 60).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            description: 'Panqueques esponjosos servidos con jarabe de arce, mantequilla y una selección de toppings como bayas o chispas de chocolate.'
        },
        {
            id: '8',
            name: 'Sundae de Helado',
            image_url: 'https://i.pinimg.com/564x/9e/df/63/9edf63395b618f8a8e9fe70b6355caaa.jpg',
            price: (Math.random() * 10).toFixed(2),
            deliveryTime: (Math.random() * 60).toFixed(1),
            rating: (Math.random() * 5).toFixed(1),
            description: 'Un delicioso postre con bolas de helado de vainilla, sirope de chocolate, crema batida, nueces y una cereza en la cima.'
        }
    ];

    useEffect(() => {
        const productRandom = Math.floor(Math.random() * productData.length);
        setProduct(productData[productRandom] as any)
    }, []);

    const handleAddToCart = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // addToCart(product);
            setPreModal(true);
        }, 2000);
    };

    const handlePhotoOpen = () => {
        setPhotoOpen(true)
    }

    const handlePhotoClose = () => {
        setPhotoOpen(false)
    }

    useEffect(() => {
        const handlePriceFinal = () => {
            if(product?.price){
                const priceResumed = (product.price * countProduct).toFixed(2);
                setPriceFinal(priceResumed)
            }
        }
        handlePriceFinal()
    }, [countProduct]);



    return (
        <Layout style={styles.container}>
            <Pressable
                onPress={()=>{navigation.goBack()}}
                style={styles.arrow_back_button}
            >
                <CustomIcon width={80} fill='#3fc1f2' name="arrow-back-outline" />
            </Pressable>

            <Pressable
                // onPress={()=>{navigation.navigate('Cart')}}
                style={styles.cart_button}
            >
                {/* <CustomIcon fill='#3fc1f2' name="cart" /> */}
            </Pressable>


            <Layout style={styles.container_product}>
                <ImageBackground style={{ height: '40%' }}>
                    <Pressable style={{
                        width: '100%',
                        height: '100%'
                    }} 
                    onPress={handlePhotoOpen}>
                        <Image source={{ uri: product?.image_url }} style={{ width: '100%', height: '100%' }} />
                    </Pressable>
                </ImageBackground>
                <Modal animationType="fade" visible={photoOpen} transparent={true} onRequestClose={handlePhotoClose}>
                    <Layout style={styles.modal_container}>
                        <Pressable style={styles.close_button} onPress={handlePhotoClose}>
                            <Image source={{ uri: product?.image_url }} style={styles.full_screen} />
                        </Pressable>
                    </Layout>
                </Modal>
                <ScrollView style={{ padding: 20, height: '30%' }}>
                    <Layout style={{ marginBottom: 10 }}>
                        <Text style={styles.product_rating}>Rating: {product?.rating}</Text>
                        <Text style={styles.product_name}>{product?.name}</Text>
                    </Layout>
                    <Text style={styles.product_description}>{product?.description}</Text>
                    <Text style={styles.product_price}>${product?.price}</Text>
                    <Layout style={{ paddingVertical: 20 }}>
                        <Increment aditional='Capas adicionales de helado' />
                        <Increment aditional='Chips de sabores' />
                        <Increment aditional='Chips de sabores' />
                        <Increment aditional='Chips de sabores' />
                        <Increment aditional='Chips de sabores' />
                    </Layout>
                </ScrollView>
                <Layout style={styles.buy_product_container}>
                    <Layout
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 20,
                            padding: 10
                        }}
                    >
                        <Pressable
                            onPress={handleAddToCart}
                            style={[styles.buy_product_button, loading ? { backgroundColor: '#3fc1f266' } : { backgroundColor: '#3fc1f2' }]}
                        >
                            <Text style={styles.buy_product_text}>{loading ? 'CARGANDO...' : 'AÑADIR AL CARRITO'}</Text>
                        </Pressable>
                    </Layout>
                </Layout>
            </Layout>

            <Modal visible={preModal} transparent={true} animationType="fade" onRequestClose={() => setPreModal(false)}>
                <Pressable onPress={() => setPreModal(false)} style={{ width: '100%', height: '100%', backgroundColor: '#0007', justifyContent: 'center', alignItems: 'center' }}>
                    <Layout style={{ width: '90%', height: 400, borderRadius: 25, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: globalColors.primary }}>Algo mas?</Text>
                        <Input
                            placeholder="Añadir informacion adicional aqui..."
                            multiline={true}
                            textStyle={{ minHeight: 200 }}
                            value={additionalInfo}
                            onChangeText={setAdditionalInfo}
                            style={{ padding: 20, borderRadius: 25 }}
                        />
                        <Pressable
                        onPress={() => console.log('enviado!')}
                        style={[styles.buy_product_button, {width: '90%'}]}
                        >
                            <Text style={styles.buy_product_text}>ENVIAR</Text>
                        </Pressable>
                    </Layout>
                </Pressable>
            </Modal>
            
            <Modal style={styles.modal} visible={modal} transparent={true} animationType="fade" onRequestClose={()=>setModal(false)}>
                <Layout style={styles.modal_content}>
                    <Layout style={styles.modal_mask}>
                        <Text style={styles.modal_title}>{product?.name} añadido al carrito</Text>
                        <Layout style={{ alignItems: 'center' }}>
                            <CustomIcon name="checkmark-circle-2-outline" color={'#3fc1f2'} />
                        </Layout>
                        <Layout style={styles.modal_buttons}>
                            <Pressable style={styles.modal_button} onPress={()=>{setModal(false)}}>
                                <Text style={styles.modal_button_text}>Ir al carrito</Text>
                            </Pressable>
                            <Pressable style={[styles.modal_button, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#3fc1f2' }]} onPress={()=>setModal(false)}>
                                <Text style={[styles.modal_button_text, {color: '#3fc1f2'}]}>Ok</Text>
                            </Pressable>
                        </Layout>
                    </Layout>
                </Layout>
            </Modal>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25
    },
    container_product: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
    },
    product_name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    product_description: {
        fontSize: 16,
        color: 'black'
    },
    product_price: {
        fontSize: 20,
        color: 'gray'
    },
    product_rating: {
        fontSize: 20,
        color: 'black',
    },
    buy_product_container: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        width: '100%',
        paddingVertical: 20,
        gap: 30
    },
    buy_product_button: {
        width: '95%',
        borderRadius: 25,
        backgroundColor: '#3fc1f2',
        padding: 20,
        alignSelf: 'center'
    },
    buy_product_text: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    modal_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    close_button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    full_screen: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    arrow_back_button: {
        zIndex: 99,
        position: 'absolute',
        top: '5%',
        left: '3%',
        width: 50,
        height: 50,
        borderColor: '#3fc1f2',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
    },
    cart_button: {
        zIndex: 99,
        position: 'absolute',
        top: '5%',
        right: '3%',
        width: 50,
        height: 50,
        borderColor: '#3fc1f2',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
    },
    modal: {  
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        height: '100%', 
    },
    modal_content: { 
        backgroundColor: '#0006', 
        height: '100%', 
        justifyContent: 'center', 
        margin: 'auto', 
        marginHorizontal: 0, 
        borderRadius: 10, 
        alignItems: 'center' 
    },
    modal_mask: { 
        backgroundColor: 'white', 
        width: '100%', 
        height: '100%',
        justifyContent: 'center',
        paddingVertical: 50, 
        paddingHorizontal: 20, 
        gap: 30 
    },
    modal_title: { 
        fontSize: 30, 
        textAlign: 'center', 
        fontWeight: '600',
        color: '#3fc1f2'
    },
    modal_buttons: { 
        gap: 10, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    modal_button: { 
        backgroundColor: '#3fc1f2', 
        width: '100%', 
        padding: 20, 
        borderRadius: 25 
    },
    modal_button_text: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 18, 
        textAlign: 'center' 
    }
})