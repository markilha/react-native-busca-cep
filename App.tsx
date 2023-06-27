import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
} from 'react-native'
import api from './src/services/api'

export default function App() {
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')
  const [localidade, setLocalidade] = useState('')
  const [uf, setUf] = useState('')
  const [ibge, setIbge] = useState('')

  async function handleBuscaCep() {
    if (cep == '') {
      Alert.alert('Cep inválido!!!')
      setCep('')
    } else {
      try {
        const response = await api.get(`${cep}/json`)
        console.log(response.data)
        setLogradouro(response.data.logradouro)
        setBairro(response.data.bairro)
        setLocalidade(response.data.localidade)
        setUf(response.data.uf)
        setIbge(response.data.ibge)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
  
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de Cep</Text>
      </View>
      <View style={styles.container_cep}>
        <TextInput
          style={{
            borderColor: '#000000',
            borderWidth: 2,
            width: 200,
            fontSize: 19,
            marginTop: 20,
            marginEnd: 20,
            borderRadius: 10,
            padding: 10,
          }}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="Digite o Cep"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.botao} onPress={() => handleBuscaCep()}>
          <Text style={styles.textBotao}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.CaixaTexto}
        value={logradouro}
        onChangeText={(texto) => setCep(texto)}
        placeholder="Logradouro"
      />
      <TextInput
        style={styles.CaixaTexto}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder="Bairro"
      />
      <TextInput
        style={styles.CaixaTexto}
        value={localidade}
        onChangeText={(texto) => setLocalidade(texto)}
        placeholder="Cidade"
      />
      <TextInput
        style={[styles.CaixaTexto, { width: 80 }]}
        value={uf}
        onChangeText={(texto) => setUf(texto)}
        placeholder="UF"
      />
      <TextInput
        style={[styles.CaixaTexto, { width: 150 }]}
        value={ibge}
        onChangeText={(texto) => setIbge(texto)}
        placeholder="Código IBGE"
      />
   
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#018786',
  },
  title: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
  },
  container_cep: {
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 20,
    marginTop: 20,
  },
  botao: {
    backgroundColor: '#018786',
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20,
  },
  textBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  CaixaTexto: {
    borderColor: '#000',
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
})
