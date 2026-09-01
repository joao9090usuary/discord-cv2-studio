# Guia Completo do CV2 Studio 2.0

Manual para instalação, configuração e utilização do bot Discord CV2 Studio.

Este guia foi escrito para pessoas que nunca criaram ou utilizaram um bot. Não é necessário saber programar para seguir os exemplos.

---

## 1. O que é o CV2 Studio?

O CV2 Studio é um bot para criar painéis visuais e interativos dentro do Discord.

Esses painéis podem conter:

- Títulos e descrições.
- Faixa lateral colorida.
- Temas e ornamentos decorativos.
- Seções separadas automaticamente.
- Textos em Markdown.
- Banner largo.
- Miniatura ao lado do título.
- Galeria com várias imagens ou GIFs.
- Menu dropdown com até 25 opções.
- Botões que exibem respostas privadas.
- Botões que abrem links.
- Animação da cor e do marcador do título.
- Rodapé personalizado.

O bot utiliza **Discord Components V2**, o sistema moderno de componentes do Discord.

### O que significa “painel”?

Um painel é uma mensagem organizada dentro de um Container. Ele pode ser usado para:

- Regras do servidor.
- Central de atendimento.
- Seleção de cargos.
- Lista de punições.
- Informações de eventos.
- Perfil de jogador.
- Sistema de níveis.
- Divulgação de benefícios.
- Comunidades aesthetic.
- Portais de navegação.

---

## 2. Limitações visuais importantes

O Discord controla algumas partes do visual. O bot não consegue aplicar CSS ou modificar o aplicativo Discord.

O bot pode controlar:

- A faixa vertical colorida.
- Textos, títulos e Markdown.
- Emojis e ornamentos Unicode.
- Separadores.
- Imagens, GIFs e miniaturas.
- Botões e dropdowns.

O bot não pode controlar:

- A cor do fundo completo do Container.
- A fonte utilizada pelo Discord.
- Sombras e gradientes aplicados por CSS.
- O formato externo da mensagem.
- A reprodução automática de GIFs nas configurações de cada usuário.

Para reproduzir tipografia, logotipos, sombras ou gradientes específicos, coloque esses elementos dentro de uma imagem e envie essa imagem como banner.

---

## 3. Requisitos

Antes de começar, você precisa ter:

1. Uma conta no Discord.
2. Um servidor em que você possua a permissão **Gerenciar servidor**.
3. Node.js 20 ou mais recente instalado.
4. Os arquivos do CV2 Studio 2.0.
5. Uma aplicação criada no Discord Developer Portal.
6. Um terminal PowerShell.

Para verificar o Node.js:

```powershell
node --version
npm --version
```

---

## 4. Criando a aplicação no Discord

### 4.1 Criar a aplicação

1. Acesse `https://discord.com/developers/applications`.
2. Clique em **Novo aplicativo**.
3. Escolha um nome, por exemplo `CV2 Studio`.
4. Aceite os termos.
5. Clique em **Criar**.

### 4.2 Copiar o Application ID

1. Abra **Informações gerais**.
2. Localize **ID do aplicativo**.
3. Clique em **Copiar**.

Esse valor será usado em `DISCORD_CLIENT_ID`.

### 4.3 Gerar o token

1. Abra a seção **Bot**.
2. Localize **Token**.
3. Clique em **Redefinir token**.
4. Confirme sua identidade, se solicitado.
5. Copie o token imediatamente.

O token é a senha do bot. Nunca envie esse valor para outras pessoas e nunca publique o arquivo `.env`.

### 4.4 Configurar a instalação

Na seção **Instalação**, mantenha:

- `applications.commands`
- `bot`

Permissões recomendadas:

- Ver canais.
- Enviar mensagens.
- Ver histórico de mensagens.
- Usar comandos de aplicativo.

Não é necessário conceder a permissão Administrador.

### 4.5 Instalar no servidor

1. Abra o link de instalação fornecido pelo Discord.
2. Escolha **Adicionar ao servidor**.
3. Selecione seu servidor.
4. Confira as permissões.
5. Clique em **Autorizar**.
6. Conclua o CAPTCHA manualmente, caso apareça.

---

## 5. Obtendo o ID do servidor

1. Abra o Discord.
2. Entre em **Configurações do usuário**.
3. Abra **Avançado**.
4. Ative **Modo desenvolvedor**.
5. Clique com o botão direito no ícone do servidor.
6. Clique em **Copiar ID do servidor**.

Esse valor será usado em `DISCORD_GUILD_ID`.

---

## 6. Instalando o projeto

Extraia o ZIP em uma pasta normal, como Downloads ou Documentos. Não execute o projeto dentro de `C:\Windows\System32`.

Exemplo:

```powershell
cd "$env:USERPROFILE\Downloads\discord-cv2-studio-v2"
npm install
```

Crie o arquivo de configuração:

```powershell
Copy-Item .env.example .env
notepad .env
```

---

## 7. Configurando o `.env`

O arquivo deve possuir:

```env
DISCORD_TOKEN=
DISCORD_CLIENT_ID=id_da_aplicacao
DISCORD_GUILD_ID=id_do_servidor
DATA_FILE=./data/panels.json
```

Não use aspas, espaços ou símbolos `< >`.

Exemplo de formato:

```env
DISCORD_TOKEN=
DISCORD_CLIENT_ID=123456789012345678
DISCORD_GUILD_ID=987654321098765432
DATA_FILE=./data/panels.json
```

Não mostre o valor de `DISCORD_TOKEN` em capturas de tela.

---

## 8. Registrando os comandos

Execute:

```powershell
npm run commands
```

O bot registra seis comandos:

- `/studio`
- `/template`
- `/painel`
- `/exemplo`
- `/ajuda`
- `/animacao`

Sempre execute `npm run commands` depois de atualizar para uma versão que adicionou ou modificou comandos.

---

## 9. Iniciando o bot

Execute:

```powershell
npm run dev
```

O terminal deve exibir algo semelhante a:

```text
Conectado como CV2 Studio#0000
0 painel(is) restaurado(s).
```

Mantenha o terminal aberto. Se ele for fechado, o bot ficará offline.

Para encerrar o bot, pressione `Ctrl + C`.

---

## 10. Primeiro teste

No Discord, abra um canal onde o bot possa enviar mensagens e execute:

```text
/exemplo
```

Verifique:

1. O painel apareceu.
2. Existe uma faixa colorida à esquerda.
3. O dropdown pode ser aberto.
4. As opções geram respostas privadas.
5. O marcador e a faixa mudam após alguns segundos.

---

## 11. Comando `/studio`

O `/studio` é recomendado para iniciantes.

Ele abre um formulário com cinco campos.

### Título

Exemplo:

```text
Central da Comunidade
```

### Descrição

Exemplo:

```text
Bem-vindo! Utilize as opções abaixo para navegar pelo servidor.
```

### Visual

Exemplo:

```text
tema: elegant; cor: #5865F2; animacao: rainbow; intervalo: 5s
```

### Seções e ações

Exemplo:

```text
secoes: Regras|Respeite todos os membros.|📜|sim >> Eventos|Confira nossa programação.|📅
```

### Dropdown

Exemplo:

```text
Regras|regras|Consulte o canal oficial.|Normas, Suporte|suporte|Seu atendimento foi iniciado.|Ajuda
```

Após enviar o formulário, o bot publica o painel no canal atual.

---

## 12. Comando `/template`

O `/template` cria painéis prontos.

Modelos disponíveis:

### Regras e moderação

Ideal para:

- Regras.
- Lista de punições.
- Avisos.
- Confirmação de leitura.

### Central da comunidade

Ideal para:

- Página inicial.
- Navegação.
- Eventos.
- Suporte.

### Cargos e progressão

Ideal para:

- Níveis.
- Experiência.
- Benefícios.
- Recompensas.

### Perfil gamer

Ideal para:

- Carteira.
- Equipamentos.
- Estatísticas.
- Conquistas.

### Comunidade aesthetic

Ideal para:

- Comunidades sociais.
- Servidores aesthetic.
- Benefícios de booster.
- Apresentações.

O comando `/template` possui um parâmetro opcional `banner`. Envie uma imagem ou GIF para personalizar o modelo.

---

## 13. Comando `/painel`

O `/painel` oferece controle avançado.

Parâmetros:

- `pedido`: texto que descreve o painel.
- `canal`: canal em que será publicado.
- `privado`: torna o resultado visível apenas para você.
- `banner`: imagem larga enviada do computador.
- `miniatura`: imagem pequena ao lado do título.

### Exemplo básico

```text
titulo: Atendimento; descricao: Escolha uma opção.; cor: #5865F2; opcoes: Suporte|suporte|Atendimento iniciado.|Ajuda; animacao: pulse; intervalo: 4s
```

### Exemplo completo

```text
tema: gaming; autor: Central Oficial; titulo: Portal da Comunidade; descricao: Tudo o que você precisa em um só lugar.; cor: #7C3AED; secoes: Informações|Use as opções abaixo para navegar.|✨|sim >> Benefícios|Cores exclusivas e acesso a eventos.|🎁|sim >> Regras|Respeite todos os membros.|⚖️|sim; opcoes: Regras|regras|Consulte o canal oficial.|Normas, Eventos|eventos|Confira a programação.|Agenda, Suporte|suporte|Seu atendimento foi iniciado.|Ajuda; botoes: Confirmar|success|Sua leitura foi confirmada.|✅ >> Site|link|https://discord.com|🔗; animacao: rainbow; intervalo: 4s; rodape: Portal oficial • Components V2
```

---

## 14. Todos os campos aceitos

### `tema`

Controla as decorações.

Valores:

- `minimal`
- `elegant`
- `cute`
- `gaming`
- `rules`

Exemplo:

```text
tema: elegant
```

### `autor`

Texto pequeno exibido acima do título.

```text
autor: Central Oficial
```

### `titulo`

Título principal.

```text
titulo: Lista de Regras
```

### `descricao`

Texto introdutório.

```text
descricao: Leia atentamente as informações abaixo.
```

### `cor`

Cor hexadecimal da faixa vertical.

```text
cor: #23A55A
```

### `placeholder`

Texto mostrado no dropdown antes da seleção.

```text
placeholder: Escolha uma opção
```

### `rodape`

Texto pequeno no final.

```text
rodape: Atualizado pela equipe de moderação
```

### `animacao`

Valores:

- `pulse`
- `rainbow`
- `off`

```text
animacao: rainbow
```

### `intervalo`

Intervalo entre frames. O bot limita o valor entre 2,5 e 60 segundos.

```text
intervalo: 4s
```

---

## 15. Criando seções

Formato:

```text
Título|Texto|Emoji|Citação
```

Exemplo:

```text
Regras|Respeite todos os membros.|📜|sim
```

Separe várias seções com `>>`:

```text
secoes: Regras|Respeite todos.|📜|sim >> Benefícios|Cores e eventos.|🎁|sim >> Suporte|Procure a equipe.|🎫|sim
```

Para criar linhas dentro de uma seção, use `\n`:

```text
secoes: Progressão|Novato ➜ 1.000 XP\nVeterano ➜ 5.000 XP\nMestre ➜ 10.000 XP|🏆|sim
```

O bot adiciona automaticamente os separadores entre seções.

---

## 16. Criando opções do dropdown

Formato:

```text
Rótulo|valor|resposta privada|descrição curta
```

Exemplo:

```text
Suporte|suporte|Seu atendimento foi iniciado.|Ajuda técnica
```

Separe opções com vírgula:

```text
opcoes: Regras|regras|Consulte as regras.|Normas, Eventos|eventos|Confira a agenda.|Programação, Suporte|suporte|Atendimento iniciado.|Ajuda
```

A resposta é privada. Somente a pessoa que selecionou poderá vê-la.

Para criar um painel sem dropdown:

```text
opcoes: nenhuma
```

---

## 17. Criando botões

Botões interativos:

```text
Rótulo|estilo|resposta|emoji
```

Estilos:

- `primary`: azul.
- `secondary`: cinza.
- `success`: verde.
- `danger`: vermelho.
- `link`: abre uma URL.

Exemplo:

```text
botoes: Confirmar|success|Sua leitura foi confirmada.|✅ >> Suporte|primary|Procure nossa equipe.|🎫 >> Site|link|https://discord.com|🔗
```

O bot aceita até cinco botões por painel.

---

## 18. Banner, miniatura e galeria

### Banner enviado pelo comando

No `/painel` ou `/template`, selecione a opção `banner` e envie:

- PNG.
- JPG.
- GIF.
- WEBP.

### Miniatura

No `/painel`, use `miniatura`. Imagens quadradas funcionam melhor.

### Galeria por URL

Use:

```text
imagem: https://site.com/banner1.gif|Primeiro banner >> https://site.com/banner2.png|Segundo banner
```

As URLs precisam apontar diretamente para arquivos acessíveis publicamente.

O bot aceita até dez itens na galeria.

### Animação de mídia

GIFs e WEBPs animados podem ser reproduzidos. Se o usuário desativou reprodução automática nas configurações do Discord, ele poderá visualizar apenas uma prévia estática.

É possível combinar:

- Banner GIF.
- Miniatura GIF.
- Vários GIFs na galeria.
- Animação `rainbow` ou `pulse` no Container.

---

## 19. Animações do Container

### `pulse`

Alterna entre a cor original, clara e escura.

```text
animacao: pulse; intervalo: 4s
```

### `rainbow`

Alterna entre vermelho, amarelo, verde, azul e roxo.

```text
animacao: rainbow; intervalo: 5s
```

### Desativar

```text
animacao: off
```

A animação edita a mensagem periodicamente. Intervalos muito baixos aumentariam o uso dos limites da API, por isso o bot impõe um mínimo seguro.

---

## 20. Comando `/animacao`

Quando um painel é criado, o bot envia privadamente um ID administrativo semelhante a:

```text
a1b2c3d4
```

Para pausar:

```text
/animacao painel_id:a1b2c3d4 acao:Pausar
```

Para iniciar:

```text
/animacao painel_id:a1b2c3d4 acao:Iniciar
```

O comando exige que o usuário tenha permissão para gerenciar mensagens.

---

## 21. Persistência

Os painéis são salvos por padrão em:

```text
./data/panels.json
```

Quando o bot reinicia:

- Painéis são carregados novamente.
- Dropdowns continuam respondendo.
- Botões continuam respondendo.
- Animações ativas são restauradas.

Faça backup da pasta `data` antes de trocar de computador ou servidor.

Nunca edite `panels.json` enquanto o bot estiver escrevendo no arquivo.

---

## 22. Hospedagem

Para testes, seu computador funciona como hospedagem enquanto `npm run dev` estiver aberto.

O bot ficará offline quando:

- O terminal for fechado.
- O computador for desligado.
- A internet cair.
- O processo apresentar um erro.

Para produção:

```powershell
npm run build
npm start
```

Para permanecer online 24 horas, execute o projeto em um computador ou servidor que permaneça ligado.

---

## 23. Segurança

- Nunca compartilhe `DISCORD_TOKEN`.
- Nunca envie o `.env` em chats ou repositórios públicos.
- Não conceda Administrador sem necessidade.
- Utilize somente URLs de imagens confiáveis.
- Não remova `.env` do `.gitignore`.
- Se o token for exposto, redefina-o imediatamente no Developer Portal.
- O bot neutraliza menções digitadas nos painéis para evitar notificações em massa acidentais.

---

## 24. Solução de problemas

### Bot aparece inativo

Execute:

```powershell
cd "$env:USERPROFILE\Downloads\discord-cv2-studio-v2"
npm run dev
```

Mantenha o terminal aberto.

### Comandos não aparecem

```powershell
npm run commands
```

Depois atualize o Discord com `Ctrl + R`.

Confirme se `DISCORD_GUILD_ID` pertence ao servidor correto.

### Erro EPERM em System32

Você está na pasta errada. Entre na pasta do projeto antes de usar npm:

```powershell
cd "$env:USERPROFILE\Downloads\discord-cv2-studio-v2"
npm install
```

### Erro de certificado npm

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm install
```

### Cor não ocupa o fundo inteiro

Isso é uma limitação do Discord. A cor aparece na faixa vertical do Container.

### GIF não se movimenta

Verifique:

- Se o arquivo realmente é animado.
- Se não é uma imagem estática renomeada para `.gif`.
- Se a reprodução automática de GIFs está habilitada no Discord.

### Animação do Container não funciona

Confira o terminal. Deve aparecer:

```text
[animation:...] ativa (... frames, 4000ms)
```

Confirme que o bot continua online e possui acesso ao canal.

### Dropdown responde, mas outras pessoas não veem

Esse é o comportamento correto. As respostas do dropdown são privadas.

### Banner não aparece

Confira se:

- O arquivo é uma imagem válida.
- O bot possui permissão para enviar mensagens.
- A URL usada em `imagem:` é pública e direta.

---

## 25. Teste completo recomendado

Execute `/painel` com:

```text
tema: gaming; autor: Central Oficial; titulo: Portal Supremo da Comunidade; descricao: Bem-vindo ao centro de controle do servidor.; cor: #7C3AED; secoes: Informações|Use o painel para navegar.|✨|sim >> Progressão|Novato ➜ 1.000 XP\nVeterano ➜ 5.000 XP\nLendário ➜ 10.000 XP|🏆|sim >> Benefícios|Cores exclusivas\nEventos especiais\nCanais privados|🎁|sim >> Regras|Respeite todos\nNão publique spam\nUse os canais corretamente|⚖️|sim; opcoes: Regras|regras|Consulte o canal oficial.|Normas, Cargos|cargos|Confira sua progressão.|Recompensas, Eventos|eventos|Confira a programação.|Agenda, Suporte|suporte|Seu atendimento foi iniciado.|Ajuda; botoes: Confirmar|success|Sua leitura foi confirmada.|✅ >> Suporte|primary|Procure a equipe no canal de suporte.|🎫 >> Discord|link|https://discord.com|🔗; placeholder: Escolha uma área; animacao: rainbow; intervalo: 4s; rodape: Portal oficial • Components V2
```

Adicione também:

- Um banner.
- Uma miniatura.
- Um canal de destino.
- `privado` como Não.

Teste cada opção e botão.

---

## 26. Referência rápida

```text
tema: minimal | elegant | cute | gaming | rules
autor: texto
titulo: texto
descricao: texto
cor: #RRGGBB
secoes: Título|Texto|Emoji|sim >> Outra|Texto|Emoji
opcoes: Rótulo|valor|resposta|descrição, Outra|valor|resposta|descrição
botoes: Rótulo|primary|resposta|emoji >> Site|link|https://...
imagem: URL|descrição >> URL|descrição
miniatura: URL
placeholder: texto
animacao: pulse | rainbow | off
intervalo: 2.5s até 60s
rodape: texto
```

---

## 27. Checklist final

- [ ] Aplicação criada no Developer Portal.
- [ ] Token copiado com segurança.
- [ ] Bot instalado no servidor.
- [ ] `.env` preenchido.
- [ ] `npm install` executado.
- [ ] `npm run commands` executado.
- [ ] `npm run dev` permanece aberto.
- [ ] `/exemplo` funciona.
- [ ] Dropdown responde privadamente.
- [ ] Botões respondem.
- [ ] Banner e miniatura aparecem.
- [ ] Animação funciona.
- [ ] Pasta `data` possui backup.

Com esses passos, o CV2 Studio estará pronto para criar e manter painéis profissionais no servidor.
