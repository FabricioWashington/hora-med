# Hora Med – Sistema de Organização e Lembrete de Medicamentos

O Hora Med é um aplicativo focado na organização de medicamentos e nos horários de uso. O objetivo é facilitar a adesão ao tratamento, reduzir esquecimentos e ajudar usuários, familiares e cuidadores a monitorar o uso correto de remédios.

Este projeto contém **Frontend (PWA em Next.js)** e **Backend (Node.js + Express + Prisma + SQLite)**.

## 👥 Equipe de Desenvolvimento

- **Juan Cezar Bethonico de Carvalho** - RA: 72500134
- **Gabriel Araújo Guimarães Trois** - RA: 72500606
- **Fabricio Washington Da Silva Lima** - RA: 72500712

## 1. Problema

Muitas pessoas esquecem de tomar seus medicamentos nos horários corretos, causando falhas no tratamento, reincidências de sintomas, riscos de internações e dificuldade no controle de receitas médicas. Além disso, familiares e cuidadores têm dificuldade em acompanhar o uso correto dos remédios.

## 2. Justificativa

A adesão correta ao tratamento é um dos maiores desafios de saúde pública, especialmente para idosos, pacientes com doenças crônicas e pessoas polimedicadas.

Organizar e lembrar horários de medicamentos contribui diretamente para o **ODS 3 – Saúde e Bem-Estar**, promovendo mais autonomia, segurança e qualidade de vida aos usuários.

## 3. Público-Alvo

O aplicativo é destinado a:

- Idosos que fazem uso recorrente de medicação
- Pessoas com doenças crônicas
- Usuários que precisam organizar horários diários de remédios
- Cuidadores e familiares que acompanham tratamentos
- Qualquer pessoa que deseje melhorar controle e rotina de medicamentos

## 4. Objetivos do Aplicativo

- Permitir cadastro e visualização de medicamentos e horários
- Organizar receitas de forma clara e acessível
- Reduzir esquecimentos por meio de lembretes e monitoramento
- Melhorar a adesão ao tratamento
- Tornar o acompanhamento da rotina médica mais simples e eficiente

## 5. Tipo da Solução

O Hora Med é desenvolvido como uma **PWA – Progressive Web App**, podendo ser executado no navegador e instalado como "atalho" no dispositivo.

A escolha do PWA permite:

- Compatibilidade multiplataforma
- Carregamento rápido
- Instalação leve
- Experiência semelhante a apps nativos
- Zero dependência de lojas (App Store / Play Store)

## 6. Requisitos do Sistema

### Backend (Node.js + Prisma + SQLite)

- Node.js 18 ou superior
- npm ou yarn
- SQLite (configuração padrão)
- Arquivo `.env` configurado
- Porta padrão: 3000 (ou definida no `.env`)

### Frontend (Next.js PWA)

- Node.js 20+
- npm ou yarn
- Variável `NEXT_PUBLIC_API_URL` apontando para o backend
- Navegador moderno compatível com PWA

## 7. Documentação de Execução do Backend

Este projeto é um backend Node.js para gerenciamento de receitas médicas, utilizando Express e Prisma ORM com banco de dados SQLite.

### Pré-requisitos

- Node.js (18+)
- npm
- SQLite
- Prisma instalado pelo projeto

### Instalação e Execução

#### 1. Instalar dependências

No diretório raiz do projeto, execute:

```bash
npm install
```

#### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

Você pode alterar o caminho do banco conforme necessário.

#### 3. Executar as migrações do Prisma

Para criar o banco e aplicar as migrações:

```bash
npm run migrate
```

Ou:

```bash
npx prisma migrate dev
```

#### 4. Gerar o cliente Prisma

```bash
npm run generate
```

#### 5. Iniciar o servidor

Para ambiente de produção:

```bash
npm start
```

Para desenvolvimento (com hot reload):

```bash
npm run dev
```

O servidor estará disponível na porta definida pela variável `PORT` (padrão: 3000).

Acesse: `http://localhost:3000`

## 8. Endpoints da API

A API está disponível sob o prefixo `/api`.

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/receitas` | Lista todas as receitas |
| POST | `/api/receitas` | Cria uma nova receita |
| GET | `/api/receitas/:id` | Busca receita por ID |
| PUT | `/api/receitas/:id` | Atualiza receita por ID |
| DELETE | `/api/receitas/:id` | Remove receita por ID |

O campo `medicamentos` deve ser enviado como array; ele é salvo como JSON string no banco.

## 9. Estrutura de Pastas (Backend)

```
src/
 ├── controllers/      # Lógica dos controllers
 ├── repositories/     # Repositórios de acesso a dados
 ├── routes/           # Rotas da API
 └── services/         # Lógica de negócio
prisma/
 ├── schema.prisma     # Configuração do banco
 └── migrations/       # Migrações
```

## 10. Documentação do Frontend (PWA)

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Execução

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 11. Credenciais de Teste (Login)

- **E-mail:** `teste@horamed.com`
- **Senha:** `123456`

## 12. Scripts Disponíveis

### Backend

- `npm start`: Inicia o servidor
- `npm run dev`: Inicia o servidor em modo desenvolvimento (hot reload)
- `npm run migrate`: Executa as migrações do banco
- `npm run generate`: Gera o cliente Prisma
- `npx prisma studio`: Abre o Prisma Studio para gerenciar dados via interface web

### Frontend

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm start`: Inicia o servidor em modo produção

## 13. Screenshots

![Screenshot 1](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-02-19.png)

![Screenshot 2](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-02-41.png)

![Screenshot 3](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-03-05.png)

![Screenshot 4](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-04-10.png)

![Screenshot 5](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-04-20.png)

![Screenshot 6](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-05-07.png)

![Screenshot 7](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-05-20.png)

![Screenshot 8](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-05-31.png)

![Screenshot 9](screenshots/Captura%20de%20tela%20de%202025-11-21%2020-05-41.png)

## Observações

- O projeto utiliza SQLite por padrão, mas pode ser adaptado para outros bancos editando o arquivo `prisma/schema.prisma` e a variável `DATABASE_URL`.
- Certifique-se de que o banco de dados está acessível e que as migrações foram aplicadas.
- Para dúvidas sobre variáveis de ambiente, consulte `.env.example` (se existir) ou peça orientação ao responsável pelo projeto.

---

Para mais detalhes, consulte os arquivos de código ou entre em contato com o desenvolvedor responsável.
