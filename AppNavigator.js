import React from 'react';
// Importa o container de navegação do React Navigation
import { NavigationContainer } from '@react-navigation/native'; 
// Importa o componente de navegação por stack do React Navigation
import { createStackNavigator } from '@react-navigation/stack'; 

// Importa as screens
import HomeScreen from './screens/homeScreen'; // Tela inicial que lista os pontos de Wi-Fi
import MapScreen from './screens/mapScreen'; // Tela que exibe o mapa com os pontos de Wi-Fi e a localização do usuário

const Stack = createStackNavigator(); 

// Componente que define as rotas da aplicação
const AppNavigator = () => {
  return (
    <NavigationContainer> {/* Container de navegação que engloba toda a navegação */}
      <Stack.Navigator initialRouteName="Home"> {/* Navigator de stack com a tela inicial definida como 'Home' */}
        <Stack.Screen name="Home" component={HomeScreen} /> {/* Tela inicial da aplicação que renderiza HomeScreen */}
        <Stack.Screen name="Map" component={MapScreen} /> {/* Tela que renderiza MapScreen, acessada via navegação */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 
