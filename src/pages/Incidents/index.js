import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, FlatList } from 'react-native';

import {
  Container,
  Header,
  TotalCases,
  TotalCasesBold,
  Title,
  Description,
  IncidentItem,
  IncidentProperty,
  IncidentValue,
  IncidentDetails,
  IncidentDetailsText,
} from './styles';

import logoImg from '../../assets/logo.png';

export default function Incidents() {
  const { navigate } = useNavigation();

  function navigateToDetails() {
    navigate('Details');
  }

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <TotalCases>
          Total de <TotalCasesBold>2 casos</TotalCasesBold>
        </TotalCases>
      </Header>

      <Title>Bem-vindo!</Title>
      <Description>Escolha um caso e salve o dia</Description>

      <FlatList
        style={{ marginTop: 32 }}
        data={[1, 2]}
        keyExtractor={(incident) => String(incident)}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <IncidentItem>
            <IncidentProperty />
            <IncidentValue />

            <IncidentProperty />
            <IncidentValue />

            <IncidentProperty />
            <IncidentValue />

            <IncidentDetails onPress={navigateToDetails}>
              <IncidentDetailsText>Ver mais detalhes</IncidentDetailsText>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </IncidentDetails>
          </IncidentItem>
        )}
      />
    </Container>
  );
}
