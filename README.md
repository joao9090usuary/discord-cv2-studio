# Discord CV2 Studio

<p align="center">
  <strong>Crie painéis interativos e profissionais no Discord com Components V2.</strong>
</p>

<p align="center">
  <img alt="Node.js 20+" src="https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white">
  <img alt="discord.js" src="https://img.shields.io/badge/discord.js-14-5865F2?logo=discord&logoColor=white">
  <img alt="Testes automatizados" src="https://img.shields.io/badge/testes-automatizados-2EA44F">
</p>

O **Discord CV2 Studio** é um bot em TypeScript para montar e publicar painéis usando os componentes nativos mais recentes do Discord. Ele combina Containers, seções, texto, separadores, galerias, miniaturas, menus dropdown e botões em uma experiência guiada por comandos.

> [!IMPORTANT]
> O projeto usa **Discord Components V2**, não o campo tradicional `embeds`. A cor configurável aparece na faixa lateral do Container; o fundo continua seguindo o tema do aplicativo Discord.

## Destaques

- Editor guiado no próprio Discord com `/studio`.
- Cinco temas: `minimal`, `elegant`, `cute`, `gaming` e `rules`.
- Cinco templates prontos para regras, comunidade, cargos, perfil gamer e estética social.
- Até oito seções, 25 opções de dropdown, cinco botões e dez imagens por painel.
- Banners e miniaturas enviados como anexo ou informados por URL.
- Animações de Container `pulse` e `rainbow` com intervalo controlado.
- Respostas privadas para dropdowns e botões.
- Respostas CV2 completas com tema, seções, mídia, miniatura, rodapé e novas ações.
- Editor administrativo `/resposta` com configuração, prévia e remoção.
- Persistência local em JSON para restaurar painéis e animações após reinicializações.
- Neutralização de menções inseridas pelo usuário e validação com Zod.
- Testes automatizados para parser e renderização.

## Sumário

- [Demonstração rápida](#demonstração-rápida)
- [Comandos](#comandos)
- [Instalação](#instalação)
- [Configuração segura](#configuração-segura)
- [Primeiro painel](#primeiro-painel)
- [Sintaxe avançada](#sintaxe-avançada)
- [Respostas CV2 completas](#respostas-cv2-completas)
- [Imagens e animações](#imagens-e-animações)
- [Desenvolvimento](#desenvolvimento)
- [Estrutura](#estrutura)
- [Documentação](#documentação)
- [Segurança](#segurança)

## Demonstração rápida

Depois de iniciar o bot, execute `/exemplo` em um canal no qual ele possa enviar mensagens. O comando publica uma composição completa com:

- Container temático;
- título, descrição e múltiplas seções;
- separadores automáticos;
- dropdown com respostas CV2 completas;
- botões interativos;
- animação de cor do Container.

Para experimentar um layout pronto, execute `/template` e escolha um dos modelos apresentados pelo Discord.

## Comandos

| Comando | O que faz |
| --- | --- |
| `/studio` | Abre um formulário guiado para criar um painel sem memorizar sintaxe. |
| `/template` | Publica um modelo pronto: regras, comunidade, cargos, gaming ou cute. |
| `/painel` | Cria um painel avançado a partir de um pedido estruturado. |
| `/exemplo` | Publica uma demonstração que reúne os principais recursos. |
| `/ajuda` | Exibe formatos, campos e exemplos dentro do Discord. |
| `/animacao` | Inicia ou pausa a animação usando o ID administrativo do painel. |
| `/resposta configurar` | Abre o editor completo da resposta de uma opção ou botão. |
| `/resposta visualizar` | Exibe uma prévia privada da resposta configurada. |
| `/resposta remover` | Remove o layout avançado e restaura a resposta simples. |

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou mais recente;
- uma aplicação criada no [Discord Developer Portal](https://discord.com/developers/applications);
- permissão para adicionar o bot a um servidor de testes.

### 1. Baixe e instale

```powershell
git clone https://github.com/joao9090usuary/discord-cv2-studio.git
cd discord-cv2-studio
npm ci
```

### 2. Crie o arquivo local de configuração

No PowerShell:

```powershell
Copy-Item .env.example .env
notepad .env
```

No Bash:

```bash
cp .env.example .env
```

### 3. Registre os comandos e inicie

```powershell
npm run commands
npm run dev
```

O bot deverá aparecer online. Para produção, gere o JavaScript e execute a versão compilada:

```powershell
npm run build
npm start
```

## Configuração segura

Preencha o `.env` criado localmente:

```dotenv
DISCORD_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_GUILD_ID=
DATA_FILE=./data/panels.json
```

| Variável | Obrigatória | Origem |
| --- | --- | --- |
| `DISCORD_TOKEN` | Sim | Developer Portal → sua aplicação → **Bot** → Reset/Copy Token. |
| `DISCORD_CLIENT_ID` | Sim | Developer Portal → **General Information** → Application ID. |
| `DISCORD_GUILD_ID` | Não | ID do servidor de testes; acelera o registro dos comandos. |
| `DATA_FILE` | Não | Caminho do arquivo de persistência. O padrão é `./data/panels.json`. |

> [!CAUTION]
> Nunca publique o `.env`, o token do bot ou o conteúdo de `data/`. O `.gitignore` deste repositório bloqueia esses arquivos. Se um token for exposto, redefina-o imediatamente no Discord Developer Portal.

## Primeiro painel

A forma mais simples é executar `/studio` e preencher os cinco campos:

1. **Título** — nome principal do painel.
2. **Descrição** — texto introdutório.
3. **Visual** — tema, cor e animação.
4. **Seções e ações** — blocos de conteúdo e botões.
5. **Dropdown** — opções e respostas privadas.

Exemplo de campo visual:

```text
tema: elegant; cor: #5865F2; animacao: rainbow; intervalo: 5s
```

## Sintaxe avançada

O comando `/painel` aceita um pedido estruturado como este:

```text
tema: elegant;
autor: Central oficial;
titulo: Central da Comunidade;
descricao: Escolha uma área abaixo.;
cor: #5865F2;
secoes: Informações|Texto da seção.|✨|sim >> Benefícios|Outro texto.|🎁;
opcoes: Suporte|suporte|Atendimento iniciado.|Ajuda técnica, Regras|regras|Consulte as regras.|Normas;
botoes: Confirmar|success|Confirmado com sucesso.|✅ >> Site|link|https://example.com|🔗;
imagem: https://example.com/banner.png|Descrição alternativa;
miniatura: https://example.com/icon.png;
animacao: rainbow;
intervalo: 4s;
rodape: Feito com Components V2
```

### Seções

Formato: `Título|Texto|Emoji|Usar citação`. Separe seções com `>>` e use `\n` para uma nova linha dentro da mesma seção.

```text
secoes: Cargos|Aprendiz ➜ 1.000 XP\nMestre ➜ 10.000 XP|🏆|sim >> Benefícios|Cores e canais exclusivos.|🎁
```

### Dropdown

Formato: `Rótulo|valor_interno|resposta|descrição_curta|emoji`. Separe as opções com vírgulas.

### Botões

Estilos disponíveis: `primary`, `secondary`, `success`, `danger` e `link`.

```text
botoes: Confirmar|success|Escolha confirmada.|✅ >> Documentação|link|https://example.com|🔗
```

## Respostas CV2 completas

Cada opção do dropdown e cada botão que não seja um link pode abrir outro painel completo. A configuração fica armazenada junto do painel original e sobrevive às reinicializações do bot.

### 1. Obtenha o ID do painel

Depois de criar um painel, o bot envia uma confirmação privada como:

```text
Painel criado. ID administrativo: a1b2c3d4
```

### 2. Abra o editor

Para configurar uma opção do dropdown:

```text
/resposta configurar painel_id:a1b2c3d4 origem:Opção do dropdown alvo:cargos publica:Não
```

`alvo` aceita o valor interno (`cargos`) ou o nome visível da opção (`Consultar cargos`). Para botões, use o número começando em 1 ou o nome exibido:

```text
/resposta configurar painel_id:a1b2c3d4 origem:Botão alvo:1
```

O comando também aceita um banner e uma miniatura, incluindo GIF ou WebP animado.

### 3. Preencha o formulário

O editor possui cinco áreas:

1. **Título da resposta** — título principal da nova tela.
2. **Descrição** — introdução com Markdown e emojis.
3. **Visual e identificação** — tema, cor, autor, rodapé e miniatura por URL.
4. **Seções** — até seis blocos no formato `Título|Texto|Emoji|sim`.
5. **Galeria e botões** — até dez imagens e cinco ações.

Exemplo do campo visual:

```text
tema: elegant; cor: #9B59FF; autor: Central de cargos; rodape: Progressão oficial
```

Exemplo das seções:

```text
Como evoluir|Participe das conversas e eventos.|⭐|sim >> Benefícios|Cores e canais exclusivos.|🎁
```

Exemplo de galeria e ações:

```text
imagem: https://example.com/banner.gif|Banner animado; botoes: Confirmar|success|Escolha confirmada.|✅ >> Site|link|https://example.com|🔗
```

Use `publica:Não` para mostrar a resposta somente a quem interagiu. Se selecionar `publica:Sim`, cada uso publicará a resposta no canal.

### Prévia e restauração

```text
/resposta visualizar painel_id:a1b2c3d4 origem:Opção do dropdown alvo:cargos
/resposta remover painel_id:a1b2c3d4 origem:Opção do dropdown alvo:cargos
```

A remoção não apaga a opção ou o botão: somente elimina o layout avançado e reativa o texto simples original.

## Imagens e animações

- `banner` e `miniatura` aceitam anexos enviados no comando `/painel`.
- `imagem:` aceita até dez URLs separadas por `>>`.
- GIF e WebP animados podem funcionar em banners, galerias e miniaturas, dependendo da reprodução do cliente Discord.
- Cada URL pode receber texto alternativo: `URL|Descrição da imagem`.
- Várias mídias devem ser colocadas na galeria; cada item é declarado individualmente.
- Separadores entre seções são inseridos automaticamente pelo renderizador.

As animações `pulse` e `rainbow` não são CSS nem vídeo: o bot edita periodicamente a cor e o marcador da mensagem. Por isso, ele precisa permanecer online e ter permissão para editar a mensagem.

## Desenvolvimento

| Script | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o bot em modo de desenvolvimento com recarga. |
| `npm run commands` | Registra os comandos de aplicação no Discord. |
| `npm run typecheck` | Valida os tipos sem gerar arquivos. |
| `npm test` | Compila e executa os testes automatizados. |
| `npm run build` | Compila TypeScript para `dist/`. |
| `npm start` | Executa a versão compilada. |

Antes de enviar uma contribuição:

```powershell
npm run typecheck
npm test
npm run build
```

## Estrutura

```text
discord-cv2-studio/
├── .github/                 # CI e formulários de issues
├── docs/                    # Guia completo para iniciantes
├── examples/                # Pedidos prontos para copiar
├── src/
│   ├── domain/              # Modelo e limites do painel
│   ├── lib/                 # Utilitários de texto
│   ├── services/            # Parser, temas, templates, renderização e animação
│   ├── bot.ts               # Eventos e interações do Discord
│   ├── commands.ts          # Definições dos slash commands
│   ├── config.ts            # Leitura e validação do ambiente
│   ├── deploy-commands.ts   # Registro dos comandos
│   └── index.ts             # Entrada da aplicação
└── tests/                   # Testes com Node Test Runner
```

## Documentação

O [guia completo](docs/GUIA-COMPLETO-CV2-STUDIO.md) explica, passo a passo, desde a criação da aplicação no Discord até hospedagem, segurança, animações e solução de problemas.

Também estão disponíveis:

- [Catálogo de Containers profissionais](examples/CATALOGO-CONTAINERS-PROFISSIONAIS.md)
- [Como contribuir](CONTRIBUTING.md)
- [Política de segurança](SECURITY.md)
- [Histórico de mudanças](CHANGELOG.md)
- [Migração da versão anterior](MIGRACAO.md)

## Segurança

- O repositório publica somente `.env.example`, sem credenciais.
- `.env`, arquivos de dados, logs, dependências, builds e cobertura ficam ignorados.
- Menções fornecidas por usuários são neutralizadas antes da renderização.
- Valores de entrada são limitados para respeitar o máximo de componentes do Discord.
- Vulnerabilidades não devem ser divulgadas em issues públicas; siga [SECURITY.md](SECURITY.md).

## Hospedagem

O processo precisa permanecer ativo para o bot ficar online e manter as animações. Um serviço compatível com Node.js, uma VPS ou um container Docker pode executar `npm run build` seguido de `npm start`.

Para múltiplas instâncias, substitua a persistência JSON por PostgreSQL ou Redis e implemente um lock distribuído para evitar edições concorrentes das animações.

## Status de licença

Nenhuma licença de código aberto foi definida. O código está público para consulta, mas os direitos permanecem reservados ao titular até que uma licença seja adicionada.
