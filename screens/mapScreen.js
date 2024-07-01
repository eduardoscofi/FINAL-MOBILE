import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';

const MapScreen = () => {
    const route = useRoute();
    // Obtendo o ponto Wi-Fi selecionado dos parâmetros da rota
    const { wifiPoint } = route.params;
    const [region, setRegion] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    // para obter a localização atual do usuário quando carregar o componente
    useEffect(() => {
        const getLocation = async () => {
            // Solicita permissões de localização
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            try {
                // Obtém a localização atual do usuário
                let location = await Location.getCurrentPositionAsync({});
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };
        // Chama a função para obter a localização atual do usuário
        getLocation();
    }, []);

    //para calcular e definir a região do mapa que mostra os dois pinzinhos
    useEffect(() => {
        if (userLocation && wifiPoint) {
            const coordinates = [
                // Coordenadas da posição atual do usuário
                { latitude: userLocation.latitude, longitude: userLocation.longitude },
                // Coordenadas do ponto Wi-Fi selecionado
                { latitude: parseFloat(wifiPoint.LATITUDE), longitude: parseFloat(wifiPoint.LONGITUDE) },
            ];
            // Calcula a nova região baseada nas coordenadas
            const newRegion = getRegionForCoordinates(coordinates);
            // Define a nova região do mapa
            setRegion(newRegion);
        }
    }, [userLocation, wifiPoint]);

    // calcular a região que mostra dodas as coordenadas.
    const getRegionForCoordinates = (coordinates) => {
        let minX, maxX, minY, maxY;

        //determina os valores mínimos e máximos de latitude e longitude.
        (coordinates || []).forEach((coordinate) => {
            minX = minX ? Math.min(minX, coordinate.latitude) : coordinate.latitude;
            maxX = maxX ? Math.max(maxX, coordinate.latitude) : coordinate.latitude;
            minY = minY ? Math.min(minY, coordinate.longitude) : coordinate.longitude;
            maxY = maxY ? Math.max(maxY, coordinate.longitude) : coordinate.longitude;
        });

        // Calcula o centro da nova região da latitude e longitude pra mostrar os pins.
        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const deltaX = (maxX - minX) + 0.01;
        const deltaY = (maxY - minY) + 0.01;

        return {
            latitude: midX,
            longitude: midY,
            latitudeDelta: deltaX,
            longitudeDelta: deltaY,
        };
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region}>
                {/* pin para a posição atual do usuário */}
                {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        title="Minha posição" //titulo do pin
                        pinColor="blue" // Cor do pin
                    />
                )}
                {/* pin para o ponto Wi-Fi selecionado */}
                <Marker
                    coordinate={{
                        latitude: parseFloat(wifiPoint.LATITUDE),
                        longitude: parseFloat(wifiPoint.LONGITUDE),
                    }}
                    title={wifiPoint.NOME} //titulo do pin
                    description={wifiPoint.ENDEREÇO} // Cor do pin
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MapScreen;
