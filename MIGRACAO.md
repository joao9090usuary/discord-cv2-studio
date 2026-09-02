# Migração

## Da versão 1.x para a 2.0

1. Encerre a versão antiga com `Ctrl + C`.
2. Extraia o ZIP 2.0 em uma pasta nova, por exemplo `discord-cv2-studio-v2`.
3. Copie apenas o `.env` da instalação anterior:

```powershell
Copy-Item `
  ".\discord-cv2-studio-v1.1\.env" `
  ".\discord-cv2-studio-v2\.env"
```

4. Opcional: para preservar os painéis antigos, copie a pasta `data`:

```powershell
Copy-Item `
  ".\discord-cv2-studio-v1.1\data" `
  ".\discord-cv2-studio-v2\data" `
  -Recurse
```

5. Instale e registre os novos comandos:

```powershell
cd ".\discord-cv2-studio-v2"
npm install
npm run commands
npm run dev
```

6. No Discord, teste `/template` com o modelo `Regras e moderação`.

Não copie `node_modules` nem `dist`. Nunca compartilhe o `.env`, pois ele contém o token do bot.

## Respostas completas da versão 2.1

Nenhuma alteração manual no arquivo JSON é necessária. Opções e botões antigos continuam usando `response`; o novo campo `responsePanel` só é criado quando `/resposta configurar` é utilizado.
