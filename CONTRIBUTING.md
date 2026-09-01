# Contribuindo

Obrigado por considerar uma contribuição para o Discord CV2 Studio.

## Antes de começar

1. Pesquise as issues abertas para evitar duplicidade.
2. Para mudanças grandes, abra primeiro uma discussão ou solicitação de recurso.
3. Nunca inclua tokens, arquivos `.env`, dados reais de servidores ou informações pessoais.

## Ambiente local

```powershell
npm ci
Copy-Item .env.example .env
npm run typecheck
npm test
```

Use uma aplicação e um servidor Discord exclusivos para desenvolvimento. Não reutilize credenciais de produção.

## Fluxo recomendado

1. Crie um fork e uma branch com nome claro.
2. Faça alterações pequenas e focadas.
3. Adicione ou atualize testes quando o comportamento mudar.
4. Execute `npm run typecheck`, `npm test` e `npm run build`.
5. Abra um pull request explicando o problema, a solução e como ela foi validada.

## Padrões do projeto

- TypeScript com módulos ES.
- Validação das entradas antes de criar componentes do Discord.
- Mensagens ao usuário em português claro.
- Funções pequenas e responsabilidades separadas por serviço.
- Nenhum segredo, cache, build ou arquivo de dados no controle de versão.

## Relatos de segurança

Não publique vulnerabilidades em issues. Siga as instruções de [SECURITY.md](SECURITY.md).
