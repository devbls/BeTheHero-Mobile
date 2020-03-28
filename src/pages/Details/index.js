import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import {
  Container,
  Header,
  IncidentDetail,
  IncidentProperty,
  IncidentValue,
  Contacts,
  ContactsTitle,
  ContactsDescription,
  ContactsButtons,
  ContactButton,
  ContactButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

export default function Details() {
  const { goBack } = useNavigation();
  const route = useRoute();

  const { incident } = route.params;

  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}`;

  function handleNavigateBack() {
    goBack('Incidents');
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </Header>
      <IncidentDetail>
        <IncidentProperty>ONG:</IncidentProperty>
        <IncidentValue>
          {incident.name} de {incident.city}/{incident.uf}
        </IncidentValue>

        <IncidentProperty>CASO:</IncidentProperty>
        <IncidentValue>{incident.title}</IncidentValue>

        <IncidentProperty>VALOR:</IncidentProperty>
        <IncidentValue>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </IncidentValue>
      </IncidentDetail>

      <Contacts>
        <ContactsTitle>Salve o dia!</ContactsTitle>
        <ContactsTitle>Seja o herói desse caso!</ContactsTitle>
        <ContactsDescription>Entre em contato:</ContactsDescription>
        <ContactsButtons>
          <ContactButton onPress={sendWhatsApp}>
            <ContactButtonText>WhatsApp</ContactButtonText>
          </ContactButton>
          <ContactButton onPress={sendEmail}>
            <ContactButtonText>E-mail</ContactButtonText>
          </ContactButton>
        </ContactsButtons>
      </Contacts>
    </Container>
  );
}
