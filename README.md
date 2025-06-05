# 🚀 Case - OZmap Integration ISP

Serviço backend em Node.js 20 com TypeScript, ESLint, Prettier e Commits Semânticos.

---

## 📦 Tecnologias

- Node.js 20
- TypeScript
- ESLint + Prettier
- Husky + Commitlint
- Commitizen + Conventional Commits

---

## ✅ Scripts

| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm install`     | Instala as dependências                  |
| `npm run build`   | Compila o código TypeScript para `dist/` |
| `npm run lint`    | Executa o ESLint                         |
| `npm run format`  | Formata os arquivos com Prettier         |
| `npm run prepare` | Instala os hooks do Husky                |
| `npm run commit`  | Inicia o commit semântico (Commitizen)   |

---

## 🧪 Commits Semânticos

Tipos suportados

- feat: nova funcionalidade
- fix: correção de bug
- docs: apenas documentação
- style: formatação, espaços, ponto e vírgula, etc.
- refactor: refatoração de código (sem mudança de comportamento)
- test: testes adicionados ou corrigidos
- chore: tarefas de build ou configuração
- perf: melhoria de performance
- ci: configurações de CI/CD

### Exemplos

```bash
# Válido
feat(api): adicionar endpoint de login

# Com breaking change
feat(auth): adicionar novo fluxo de token

BREAKING CHANGE: estrutura de autenticação anterior foi removida
```

### Uso

Para criar um commit:

```bash
npm run commit
```

---

## ⚙️ Build

Usa tsconfig.build.json para gerar build limpo e isolado:

```bash
npm run build
```

Arquivos de testes, mocks, etc. são excluídos da build final.
