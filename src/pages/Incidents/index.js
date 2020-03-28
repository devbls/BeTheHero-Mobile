import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, FlatList } from 'react-native';

import api from '../../services/api';

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
  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  function navigateToDetails(incident) {
    navigate('Details', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (totalIncidents > 0 && incidents.length === totalIncidents) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page },
    });

    setIncidents([...incidents, ...response.data]);
    setTotalIncidents(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  });

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <TotalCases>
          Total de <TotalCasesBold>{totalIncidents} casos</TotalCasesBold>
        </TotalCases>
      </Header>

      <Title>Bem-vindo!</Title>
      <Description>Escolha um caso e salve o dia</Description>

      <FlatList
        style={{ marginTop: 32 }}
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <IncidentItem>
            <IncidentProperty>ONG:</IncidentProperty>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentProperty>CASO:</IncidentProperty>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentProperty>VALOR:</IncidentProperty>
            <IncidentValue>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </IncidentValue>

            <IncidentDetails onPress={() => navigateToDetails(incident)}>
              <IncidentDetailsText>Ver mais detalhes</IncidentDetailsText>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </IncidentDetails>
          </IncidentItem>
        )}
      />
    </Container>
  );
}
