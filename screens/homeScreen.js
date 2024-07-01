import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// Importa o componente WifiPointItem para exibir cada item da lista
import WifiPointItem from '../components/WifiPointItem';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [wifiPoints, setWifiPoints] = useState([]);

    // carregar os pontos de Wi-Fi ao montar o componente
    useEffect(() => {
        const fetchWifiPoints = async () => {
            try {
                // Faz uma requisição para obter os pontos de Wi-Fi da API de dados. tô usando a api de dados do conecta recife.
                const response = await fetch('http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=1329a80b-c4a6-4ecd-b8e5-09ef75ffa576');
                // Converte a resposta para JSON
                const json = await response.json();
                setWifiPoints(json.result.records);
            } catch (error) {
                // Exibe um erro se a requisição falhar
                console.error('Erro ao buscar pontos de Wi-Fi:', error);
            }
        };
        // Chama a função para buscar os pontos de Wi-Fi ao montar o componente;
        fetchWifiPoints();
    }, []);

    // Função para lidar com o pressionar de um item da lista.
    const handleItemPress = (item) => {
        // Navega para a tela 'Map' passando o ponto de Wi-Fi selecionado como parâmetro;
        navigation.navigate('Map', { wifiPoint: item });
    };

    // Componente para renderizar cada item da lista
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>
            <WifiPointItem
                nome={item.NOME} // Passa o nome do ponto de Wi-Fi como prop para o componente WifiPointItem.
                endereco={item.ENDEREÇO} // Passa o endereço do ponto de Wi-Fi como prop para o componente WifiPointItem.
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pontos de Acesso Wi-Fi</Text>
            {/* FlatList para exibir a lista de pontos de Wi-Fi */}
            <FlatList
                data={wifiPoints} // Dados para a lista são os pontos de Wi-Fi obtidos da API
                keyExtractor={(item) => item._id.toString()} // Função para extrair chaves únicas para cada item da lista
                renderItem={renderItem} // Função para renderizar cada item da lista usando o componente WifiPointItem
                ItemSeparatorComponent={() => <View style={styles.separator} />} // Componente separador entre os itens da lista
            />
        </View>
    );
};

// Estilos para o componente HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
    },
});

export default HomeScreen;
