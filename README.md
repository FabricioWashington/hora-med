# 🏥 HoraMed - Sistema de Gerenciamento de Receitas Médicas

Sistema web para gerenciamento de receitas médicas e controle de medicamentos com notificações automáticas.

## 👥 Equipe de Desenvolvimento

- **Juan Cezar Bethonico de Carvalho** - RA: 72500134
- **Fabricio Washington Da Silva Lima** - RA: 72500712
- **Gabriel Araújo GuimarãesTrois** - RA: 72500606

## 📋 Sobre o Projeto

O HoraMed é uma aplicação Progressive Web App (PWA) desenvolvida com Next.js que permite aos usuários gerenciar suas receitas médicas, acompanhar medicamentos e receber notificações nos horários programados para tomar os remédios.

### Principais Funcionalidades

- 📊 Dashboard com estatísticas de receitas e medicamentos
- 💊 Cadastro e gerenciamento de medicamentos
- 🔔 Sistema de notificações automáticas para lembrete de medicamentos
- 📱 Funciona como PWA (Progressive Web App) - pode ser instalado no dispositivo
- 📈 Gráficos de análise de uso de medicamentos
- ⏰ Gerenciamento de horários de medicação

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 20 ou superior)
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd hora-med
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

5. Abra [http://localhost:3001](http://localhost:3001) no seu navegador para ver a aplicação.

### Build para Produção

Para criar uma build de produção:

```bash
npm run build
npm start
```

## 🔧 Tecnologias Utilizadas

### Frontend
- **Next.js 16** - Framework React com renderização híbrida
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes UI acessíveis e personalizáveis
- **Recharts** - Biblioteca de gráficos para React
- **Lucide React** - Ícones modernos

### Funcionalidades Especiais
- **next-pwa** - Transformação da aplicação em PWA
- **Service Workers** - Para notificações e cache offline
- **Axios** - Cliente HTTP para comunicação com API
- **React Hook Form** - Gerenciamento de formulários
- **Sonner** - Sistema de notificações toast

## 📡 Documentação da API

A aplicação consome uma API REST para gerenciar receitas médicas. Todas as rotas são baseadas na URL configurada em `NEXT_PUBLIC_API_URL`.

### Base URL
```
http://localhost:3001/api/receitas
```

### Endpoints

#### 1. Listar todas as receitas
```http
GET /api/receitas
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": 1,
    "nome": "Receita Hipertensão",
    "medico": "Dr. João Silva",
    "medicamentos": "[{\"nome\":\"Losartana\",\"quantidade_comprimidos\":30,\"quantidade_dia\":1,\"quantidade_mes\":30,\"intervalo_horas\":24,\"horario_inicio\":\"08:00\",\"data_inicial\":\"2024-01-01\",\"data_final\":\"2024-12-31\",\"horarios\":[\"08:00\"],\"status\":\"ativo\"}]",
    "statusReceita": "ativa",
    "dataCriacaoMedico": "2024-01-15",
    "created": "2024-01-15T10:00:00Z",
    "updated": "2024-01-15T10:00:00Z"
  }
]
```

#### 2. Buscar receita por ID
```http
GET /api/receitas/:id
```

**Parâmetros:**
- `id` (number): ID da receita

**Resposta de Sucesso (200):**
```json
{
  "id": 1,
  "nome": "Receita Hipertensão",
  "medico": "Dr. João Silva",
  "medicamentos": "[...]",
  "statusReceita": "ativa",
  "dataCriacaoMedico": "2024-01-15",
  "created": "2024-01-15T10:00:00Z",
  "updated": "2024-01-15T10:00:00Z"
}
```

#### 3. Criar nova receita
```http
POST /api/receitas
```

**Body:**
```json
{
  "nome": "Receita Diabetes",
  "medico": "Dra. Maria Santos",
  "medicamentos": "[{\"nome\":\"Metformina\",\"quantidade_comprimidos\":60,\"quantidade_dia\":2,\"quantidade_mes\":60,\"intervalo_horas\":12,\"horario_inicio\":\"08:00\",\"data_inicial\":\"2024-01-01\",\"data_final\":\"2024-12-31\",\"horarios\":[\"08:00\",\"20:00\"],\"status\":\"ativo\"}]",
  "statusReceita": "ativa",
  "dataCriacaoMedico": "2024-01-20"
}
```

**Resposta de Sucesso (201):**
```json
{
  "id": 2,
  "nome": "Receita Diabetes",
  "medico": "Dra. Maria Santos",
  "medicamentos": "[...]",
  "statusReceita": "ativa",
  "dataCriacaoMedico": "2024-01-20",
  "created": "2024-01-20T14:30:00Z",
  "updated": "2024-01-20T14:30:00Z"
}
```

#### 4. Atualizar receita
```http
PUT /api/receitas/:id
```

**Parâmetros:**
- `id` (number): ID da receita

**Body (campos opcionais):**
```json
{
  "nome": "Receita Diabetes Atualizada",
  "statusReceita": "inativa"
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": 2,
  "nome": "Receita Diabetes Atualizada",
  "medico": "Dra. Maria Santos",
  "medicamentos": "[...]",
  "statusReceita": "inativa",
  "dataCriacaoMedico": "2024-01-20",
  "created": "2024-01-20T14:30:00Z",
  "updated": "2024-01-21T09:15:00Z"
}
```

#### 5. Deletar receita
```http
DELETE /api/receitas/:id
```

**Parâmetros:**
- `id` (number): ID da receita

**Resposta de Sucesso (204):**
```
No Content
```

### Estrutura de Dados

#### Receita
```typescript
interface Receita {
  id: number;
  nome: string;
  medico: string;
  medicamentos: string; // JSON string com array de medicamentos
  statusReceita: string;
  dataCriacaoMedico: string;
  created: string;
  updated: string;
}
```

#### Medicamento
```typescript
interface MedicamentoReceita {
  nome: string;
  quantidade_comprimidos: number;
  quantidade_dia: number;
  quantidade_mes: number;
  intervalo_horas: number;
  horario_inicio: string;
  data_inicial: string;
  data_final: string;
  horarios: string[];
  status: string; // "ativo" | "inativo"
}
```

### Códigos de Status HTTP

- `200` - OK: Requisição bem-sucedida
- `201` - Created: Recurso criado com sucesso
- `204` - No Content: Recurso deletado com sucesso
- `400` - Bad Request: Dados inválidos
- `404` - Not Found: Recurso não encontrado
- `500` - Internal Server Error: Erro no servidor

### Exemplo de Uso com Axios

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/receitas';

// Listar receitas
const receitas = await axios.get(API_URL);

// Criar receita
const novaReceita = await axios.post(API_URL, {
  nome: "Receita Exemplo",
  medico: "Dr. Exemplo",
  medicamentos: JSON.stringify([...]),
  statusReceita: "ativa",
  dataCriacaoMedico: "2024-01-01"
});

// Atualizar receita
const receitaAtualizada = await axios.put(`${API_URL}/1`, {
  statusReceita: "inativa"
});

// Deletar receita
await axios.delete(`${API_URL}/1`);
```

## 📂 Estrutura do Projeto

```
hora-med/
├── app/                    # Páginas e rotas da aplicação
│   ├── content.tsx        # Dashboard principal
│   ├── horarios/          # Página de gerenciamento de horários
│   ├── login/             # Página de login
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizáveis
│   └── ui/               # Componentes de interface
├── services/             # Serviços de API
│   └── receita.service.ts # Service para comunicação com API de receitas
├── types/                # Definições de tipos TypeScript
│   └── receita.ts        # Tipos relacionados a receitas
├── public/               # Arquivos estáticos
│   └── medication-sw.js  # Service Worker para notificações
└── package.json          # Dependências do projeto
```

## 🔔 Sistema de Notificações

O aplicativo utiliza Service Workers para agendar e enviar notificações push nos horários programados para cada medicamento. As notificações funcionam mesmo quando o aplicativo está fechado (se instalado como PWA).

### Como Funciona

1. Ao carregar as receitas, o sistema identifica todos os medicamentos ativos
2. Para cada medicamento, os horários são registrados no Service Worker
3. Nos horários programados, uma notificação é enviada ao usuário
4. O usuário precisa conceder permissão para notificações no primeiro acesso

## 🎨 Temas e Customização

O projeto utiliza variáveis CSS customizadas para cores, que podem ser ajustadas em `app/globals.css`:

```css
--primary: #0A6CF1;
--secondary: #6B7280;
--tertiary: #1F2937;
```

## 📱 Progressive Web App (PWA)

O HoraMed é configurado como PWA, permitindo:

- Instalação no dispositivo (mobile e desktop)
- Funcionamento offline (cache de recursos)
- Notificações push
- Ícone na tela inicial
- Experiência similar a aplicativo nativo

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

## 📧 Contato

- Juan Cezar Bethonico de Carvalho - RA: 72500134
- Fabricio Washington Da Silva Lima - RA: 72500712

