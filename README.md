# Sistema de Estudo - Flashcards e Testes

Sistema web para auxiliar estudantes a se prepararem para provas escolares, permitindo a geração de flashcards e testes personalizados com correção automática e explicações, utilizando IA (Gemini 2.5 Pro).

## Funcionalidades

- **Geração de Flashcards**: Cria 10-20 flashcards personalizados por tema e tópico
- **Geração de Testes**: Cria 10 questões de múltipla escolha com correção automática
- **Suporte a Múltiplos Idiomas**: Português e Inglês
- **Interface Responsiva**: Funciona em desktop e mobile
- **Correção Automática**: Mostra acertos, erros e explicações detalhadas

## Tecnologias Utilizadas

- **Frontend**: Next.js 14 com TypeScript
- **Estilização**: Tailwind CSS
- **IA**: Google Gemini 2.0 Flash
- **Ícones**: Lucide React

## Configuração

### 1. Instalação das Dependências

```bash
npm install
```

### 2. Configuração da API Gemini

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova API key
3. Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_GEMINI_API_KEY=sua_chave_api_aqui
```

### 3. Executando o Projeto

```bash
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

## Como Usar

1. **Tela Inicial**: Selecione um tema (Matemática, Física, Química, etc.)
2. **Digite o Tópico**: Especifique o assunto específico que deseja estudar
3. **Escolha o Tipo**: Gere flashcards ou um teste
4. **Navegue**: Use os controles para navegar entre flashcards ou questões
5. **Veja os Resultados**: Para testes, veja sua pontuação e explicações detalhadas

## Estrutura do Projeto

```
src/
├── app/                 # Páginas Next.js
├── components/          # Componentes React
├── contexts/           # Contextos (Language)
├── services/           # Serviços (Gemini API)
└── types/              # Tipos TypeScript
```

## Funcionalidades Principais

### Flashcards
- Navegação entre flashcards
- Mostrar/ocultar respostas
- Link para gerar teste do mesmo tema

### Testes
- 10 questões de múltipla escolha
- Revisão antes do envio
- Correção automática
- Explicações detalhadas para cada resposta

### Internacionalização
- Suporte completo a Português e Inglês
- Seletor de idioma no cabeçalho
- Interface adaptada ao idioma selecionado

## Requisitos do Sistema

- Node.js 18+ 
- NPM ou Yarn
- Chave de API do Google Gemini

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
