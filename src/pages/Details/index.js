import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
  const message =
    'Olá APAD, estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atropelada" com o valor de R$120,00';

  function handleNavigateBack() {
    goBack('Incidents');
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: 'Herói do caso: Cadelinha atropelada',
      recipients: ['bluis1707@gmail.com'],
      body: message,
    });
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=351932293391&text=${message}`);
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
        <IncidentValue>APAD</IncidentValue>

        <IncidentProperty>CASO:</IncidentProperty>
        <IncidentValue>Cadelinha atropelada</IncidentValue>

        <IncidentProperty>VALOR:</IncidentProperty>
        <IncidentValue>R$120,00</IncidentValue>
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
