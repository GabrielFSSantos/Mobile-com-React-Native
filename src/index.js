/**
 * Não possuem valor semântico (significado)
 * Não possuel estilização própria
 * Todos os componentes possuem por padrão "display flex"
 * 
 * View: div, footer, header, main, aside, section
 * Text: p, span, strong, h1, h2, h3
 */

import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Teste Post Project ${Date.now()}`,
      owner: "Gabriel F. S. Santos"
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159C1" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.projects}>
              {project.title}
            </Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}> Adicionar Projeto </Text>
        </TouchableOpacity>

      </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159C1',
  },

  projects: {
    color: 'white',
    fontSize: 20,
  },

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});