import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente funcional que renderiza um item da lista de pontos de Wi-Fi
const WifiPointItem = ({ nome, endereco }) => (
  <View style={styles.item}>
    {/* Renderiza o nome do ponto de Wi-Fi, ou 'Nome não disponível' se não houver */}
    <Text style={styles.text}>{nome || 'Nome não disponível'}</Text>
    {/* Renderiza o endereço do ponto de Wi-Fi, ou 'Endereço não disponível' se não houver */}
    <Text style={styles.text}>{endereco || 'Endereço não disponível'}</Text>
  </View>
);

// Estilos para o componente WifiPointItem
const styles = StyleSheet.create({
  item: {
    paddingVertical: 14, // Espaçamento vertical do item
  },
  text: {
    fontSize: 16, // Tamanho da fonte para o texto
  },
});

export default WifiPointItem; 
