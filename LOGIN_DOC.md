# HoraMed - Documentação de Execução e Login

## Como executar o sistema

1. **Pré-requisitos:**
   - Node.js 18+
   - npm (ou yarn/pnpm)

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   O sistema estará disponível em [http://localhost:3000](http://localhost:3000)

4. **Para rodar em produção:**
   ```bash
   npm run build
   npm start
   ```

---

## Como acessar o sistema (Login)

1. Acesse [http://localhost:3000/login](http://localhost:3000/login)
2. Preencha os campos:
   - **Email:** `teste@horamed.com`
   - **Senha:** `123456`
3. Clique em **Entrar**.
4. Se os dados estiverem corretos, você será redirecionado para a página principal.

> **Observação:**
> Este login é apenas para demonstração/MVP. Os dados são validados apenas no front-end e não há autenticação real.

---

## Dúvidas ou problemas?
- Verifique se todas as dependências estão instaladas.
- Certifique-se de estar usando Node.js compatível.
- Para suporte, consulte o README ou entre em contato com o desenvolvedor.
