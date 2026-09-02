# Catálogo de Containers Profissionais

Este catálogo contém exemplos prontos para os cinco temas visuais do CV2 Studio 2.1 e para os Containers de resposta abertos por dropdowns e botões.

Todos os exemplos são compatíveis com `/painel`. Eles não contêm token, ID de servidor ou outra informação confidencial.

## Como executar qualquer exemplo

1. No Discord, digite `/painel` e selecione o comando do CV2 Studio.
2. Cole somente o conteúdo do bloco `pedido` no campo **pedido**.
3. Opcionalmente, selecione um canal de destino.
4. Opcionalmente, envie um arquivo nos campos **banner** e **miniatura**.
5. Deixe **privado** como `Não` para publicar no canal.
6. Envie o comando e guarde o ID administrativo recebido privadamente.

> Para testar sem publicar, marque **privado** como `Sim`. Painéis privados não devem ser usados como a versão definitiva do servidor.

## Visão geral

| Tema | Melhor uso | Animação recomendada | Cor do exemplo |
| --- | --- | --- | --- |
| `minimal` | Avisos, status e informações objetivas | `off` | `#5865F2` |
| `elegant` | Portal principal e navegação | `rainbow` | `#8B5CF6` |
| `cute` | Boas-vindas, social e benefícios | `pulse` | `#FF9ECD` |
| `gaming` | Perfil, níveis e inventário | `pulse` | `#00A8FC` |
| `rules` | Regras, segurança e moderação | `off` | `#23A55A` |

---

## 1. Container `minimal` — Central de avisos

Visual limpo para informações que precisam ser lidas rapidamente.

### Pedido pronto

```text
tema: minimal; autor: Comunicação oficial; titulo: Central de Avisos; descricao: Acompanhe atualizações importantes, manutenções e mudanças da comunidade.; cor: #5865F2; secoes: Status atual|Todos os serviços estão operando normalmente.|✅|sim >> Próxima manutenção|Domingo às 03:00\nDuração estimada: 30 minutos|🛠️|sim >> Como receber alertas|Ative as notificações do canal oficial e acompanhe as atualizações deste painel.|🔔|sim; opcoes: Ver status|status|Todos os sistemas estão operacionais.|Situação dos serviços|✅, Ver manutenção|manutencao|A próxima manutenção ocorrerá no domingo às 03:00.|Cronograma técnico|🛠️, Falar com suporte|suporte|Procure a equipe no canal oficial de suporte.|Obter atendimento|🎫; botoes: Confirmar leitura|success|Leitura confirmada com sucesso.|✅ >> Central Discord|link|https://discord.com|🔗; placeholder: Selecione uma informação; animacao: off; rodape: Comunicação oficial • Atualizado pela equipe
```

### Mídia recomendada

- Banner: imagem horizontal com identidade visual e o texto “Status da comunidade”.
- Miniatura: logotipo quadrado do servidor.
- Animação: desativada para preservar o caráter informativo.

---

## 2. Container `elegant` — Portal da comunidade

Modelo principal para concentrar navegação, eventos, suporte e informações do servidor.

### Pedido pronto

```text
tema: elegant; autor: Portal oficial; titulo: Central da Comunidade; descricao: Bem-vindo ao ponto de partida do servidor. Escolha uma área para acessar informações e serviços.; cor: #8B5CF6; secoes: Comece por aqui|Leia as regras, escolha seus interesses e conheça os canais principais.|✨|sim >> Destaques da semana|Eventos, novidades e projetos selecionados pela equipe.|📣|sim >> Benefícios|Participação saudável libera cargos, cores e experiências exclusivas.|🎁|sim >> Atendimento|A equipe está disponível para dúvidas, denúncias e problemas técnicos.|🎫|sim; opcoes: Regras|regras|Consulte as normas oficiais da comunidade.|Leitura obrigatória|⚖️, Eventos|eventos|Confira a programação atualizada.|Agenda da comunidade|📅, Cargos|cargos|Conheça a progressão e seus benefícios.|Sistema de níveis|🏆, Suporte|suporte|Inicie o atendimento com a equipe.|Ajuda e denúncias|🎫; botoes: Confirmar entrada|success|Entrada confirmada. Aproveite a comunidade!|✅ >> Novidades|primary|Acompanhe o canal oficial de novidades.|📣 >> Site oficial|link|https://discord.com|🔗; placeholder: Para onde deseja ir?; animacao: rainbow; intervalo: 5s; rodape: Portal oficial • Discord Components V2
```

### Mídia recomendada

- Banner: paisagem, arte da comunidade ou identidade do servidor.
- Miniatura: ícone do servidor.
- Animação: `rainbow` em 5 segundos para destacar o painel principal sem excesso de atualizações.

---

## 3. Container `cute` — Boas-vindas aesthetic

Painel social com visual delicado para recepção, apresentações e benefícios.

### Pedido pronto

```text
tema: cute; autor: Welcome team; titulo: Jardim da Comunidade; descricao: Um espaço acolhedor para conversar, criar amizades e compartilhar seus interesses. ♡; cor: #FF9ECD; secoes: Boas-vindas|Apresente-se, escolha seus interesses e participe no seu ritmo.|🌸|sim >> Convivência|Respeite limites, identidades e opiniões. Gentileza vem sempre primeiro.|💗|sim >> Booster perks|Apoiadores recebem destaque, cargo personalizado e benefícios especiais.|🎀|sim >> Espaço seguro|Se algo incomodar você, procure a equipe de forma privada.|🫶|sim; opcoes: Como começar|comecar|Visite o canal de apresentações e conte um pouco sobre você.|Primeiros passos|🌷, Escolher interesses|interesses|Use o canal de cargos para selecionar seus interesses.|Personalize seu perfil|🎨, Booster perks|boosters|Confira no canal oficial todos os benefícios disponíveis.|Benefícios especiais|🎀, Pedir ajuda|ajuda|Procure a equipe no canal de acolhimento.|Atendimento seguro|💌; botoes: Estou pronto|success|Que bom ter você aqui. Seja muito bem-vindo! ♡|💞 >> Guia da comunidade|primary|Consulte os canais fixados para conhecer todos os espaços.|📖; placeholder: Escolha seu próximo passo; animacao: pulse; intervalo: 5s; rodape: safe • social • friendly
```

### Mídia recomendada

- Banner: arte em tons pastel ou GIF suave.
- Miniatura: coração, mascote ou logotipo.
- Animação: `pulse` em 5 segundos.

---

## 4. Container `gaming` — Central do jogador

Painel de perfil, progressão, inventário e atividades competitivas.

### Pedido pronto

```text
tema: gaming; autor: Player Network; titulo: Central do Jogador; descricao: Consulte sua jornada, equipamentos, progressão e atividades da comunidade.; cor: #00A8FC; secoes: Perfil|Classe: Explorador\nNível: 27\nPrestígio: 5|👤|sim >> Carteira|8.170 créditos\n320 cristais\n5 passes especiais|💎|sim >> Equipamentos|Picareta da 3ª Era\nEspada Lendária\nAmuleto de Proteção|⚒️|sim >> Temporada atual|Complete desafios semanais para subir no ranking e liberar recompensas.|🏅|sim; opcoes: Estatísticas|stats|Suas estatísticas foram carregadas.|Desempenho e histórico|📊, Inventário|inventario|Seu inventário foi carregado.|Itens e equipamentos|🎒, Conquistas|conquistas|Suas conquistas foram carregadas.|Troféus desbloqueados|🏆, Ranking|ranking|O ranking da temporada está disponível no canal competitivo.|Classificação atual|🥇; botoes: Atualizar perfil|primary|Perfil atualizado com sucesso.|🔄 >> Resgatar recompensa|success|Solicitação de resgate registrada.|🎁 >> Reportar erro|danger|Envie os detalhes no canal de suporte técnico.|🐞; placeholder: Acessar módulo do jogador; animacao: pulse; intervalo: 4s; rodape: Player Network • Dados demonstrativos
```

### Mídia recomendada

- Banner: arte do jogo, temporada ou evento atual.
- Miniatura: avatar ou emblema da comunidade.
- Animação: `pulse` em 4 segundos.

> O exemplo mostra dados demonstrativos. Para buscar estatísticas reais de um jogo, o projeto precisaria ser integrado à API oficial desse jogo.

---

## 5. Container `rules` — Regras e moderação

Painel formal para normas, escala de medidas e confirmação de leitura.

### Pedido pronto

```text
tema: rules; autor: Central de Moderação; titulo: Código de Conduta; descricao: Leia todas as normas antes de participar. O desconhecimento das regras não elimina a responsabilidade do membro.; cor: #23A55A; secoes: 1 • Respeito|Trate todos com educação. Assédio, discriminação, perseguição e ataques pessoais não serão tolerados.|🛡️|sim >> 2 • Segurança|Não publique golpes, arquivos maliciosos, dados pessoais ou conteúdo ilegal.|🔒|sim >> 3 • Organização|Use cada canal para sua finalidade e evite spam, flood ou divulgação sem autorização.|📚|sim >> 4 • Conteúdo|Siga os Termos do Discord e respeite as classificações indicadas pela equipe.|📜|sim >> 5 • Medidas disciplinares|A equipe considera contexto, gravidade, reincidência e evidências antes de aplicar qualquer medida.|⚠️|sim; opcoes: Li e concordo|aceite|Obrigado por confirmar a leitura das regras.|Registrar confirmação|✅, Consultar medidas|medidas|As medidas podem incluir orientação ou restrição ou expulsão ou banimento conforme o caso.|Política de moderação|⚖️, Tirar uma dúvida|duvida|Procure a equipe no canal oficial de suporte.|Falar com moderadores|💬, Fazer denúncia|denuncia|Envie evidências de forma privada no canal de atendimento.|Relato confidencial|🚨; botoes: Confirmar leitura|success|Sua confirmação de leitura foi registrada.|✅ >> Solicitar ajuda|primary|Procure a equipe no canal oficial de suporte.|🎫 >> Situação urgente|danger|Contate um moderador responsável sem marcar toda a comunidade.|🚨; placeholder: Consultar regras e suporte; animacao: off; rodape: Regras oficiais • Revise este painel sempre que houver alterações
```

### Mídia recomendada

- Banner: identidade da moderação ou ilustração discreta.
- Miniatura: escudo ou logotipo do servidor.
- Animação: desativada para não distrair durante a leitura.

> Ajuste regras e medidas à realidade do seu servidor. O bot apresenta o texto, mas não aplica punições automaticamente.

---

## 6. Containers de resposta — telas abertas pelas interações

Use esta etapa depois de publicar o Container `elegant`. Troque `SEU_ID` pelo ID administrativo informado pelo bot.

### 6.1 Resposta profissional da opção `regras`

Execute:

```text
/resposta configurar painel_id:SEU_ID origem:Opção do dropdown alvo:regras publica:Não
```

Preencha o formulário:

**Título da resposta**

```text
Central de regras
```

**Descrição**

```text
Consulte os princípios essenciais antes de participar da comunidade.
```

**Visual e identificação**

```text
tema: rules; cor: #23A55A; autor: Equipe de moderação; rodape: Normas oficiais • Resposta privada
```

**Seções**

```text
Respeito|Trate todos com educação e não pratique discriminação, assédio ou perseguição.|🛡️|sim >> Segurança|Não compartilhe golpes, spam, arquivos maliciosos ou informações pessoais.|🔒|sim >> Organização|Use os canais corretos e siga as orientações da equipe.|📚|sim
```

**Galeria e botões**

```text
botoes: Confirmar leitura|success|Leitura das regras confirmada.|✅ >> Preciso de ajuda|primary|Procure a equipe no canal oficial de suporte.|🎫
```

### 6.2 Resposta profissional da opção `eventos`

Execute:

```text
/resposta configurar painel_id:SEU_ID origem:Opção do dropdown alvo:eventos publica:Não
```

Campos do formulário:

```text
Título: Agenda da comunidade

Descrição: Acompanhe as próximas atividades e prepare-se para participar.

Visual: tema: elegant; cor: #F1C40F; autor: Equipe de eventos; rodape: Programação sujeita a atualizações

Seções: Evento semanal|Encontro da comunidade • Sexta-feira às 20h.|📅|sim >> Atividade mensal|Competição temática • Último sábado do mês.|🏆|sim >> Recompensas|Participantes podem receber cargos, brindes e destaques especiais.|🎁|sim

Galeria e botões: botoes: Tenho interesse|primary|Interesse registrado. Acompanhe o canal de eventos!|🔔 >> Consultar organização|secondary|As instruções serão publicadas antes de cada evento.|📋
```

### 6.3 Resposta profissional da opção `suporte`

Execute:

```text
/resposta configurar painel_id:SEU_ID origem:Opção do dropdown alvo:suporte publica:Não
```

Campos do formulário:

```text
Título: Atendimento e suporte

Descrição: Escolha a ação necessária e forneça informações objetivas para agilizar o atendimento.

Visual: tema: minimal; cor: #EB459E; autor: Central de atendimento; rodape: Nunca envie senhas, tokens ou dados bancários

Seções: Antes de começar|Explique o problema, quando aconteceu e qual resultado você esperava.|📝|sim >> Evidências|Envie capturas apenas quando não mostrarem dados confidenciais.|📎|sim >> Prazo|A equipe responderá conforme disponibilidade e prioridade.|⏱️|sim

Galeria e botões: botoes: Iniciar solicitação|primary|Solicitação iniciada. Procure a equipe no canal de suporte.|🎫 >> Problema urgente|danger|Avise um moderador responsável sem marcar toda a equipe.|🚨
```

### 6.4 Resposta profissional do primeiro botão

O primeiro botão do exemplo `elegant` é **Confirmar entrada**.

Execute:

```text
/resposta configurar painel_id:SEU_ID origem:Botão alvo:1 publica:Não
```

Campos do formulário:

```text
Título: Entrada confirmada

Descrição: Sua confirmação foi registrada. Agora você já pode explorar os canais e participar das atividades.

Visual: tema: elegant; cor: #57F287; autor: Portal oficial; rodape: Seja bem-vindo à comunidade

Seções: Próximo passo|Leia as regras e escolha seus interesses antes de conversar.|✨|sim >> Boas práticas|Participe com respeito, evite spam e procure a equipe sempre que precisar.|🤝|sim

Galeria e botões: botoes: Entendi|success|Tudo certo. Aproveite a comunidade!|✅
```

### Prévia antes de liberar

```text
/resposta visualizar painel_id:SEU_ID origem:Opção do dropdown alvo:regras
```

Repita a prévia trocando o alvo por `eventos`, `suporte` ou pela posição do botão.

---

## 7. Container mestre — demonstração de quase todos os recursos

Este exemplo combina tema, autor, descrição, quatro seções, dropdown, quatro estilos de botão, link, animação, placeholder e rodapé. Banner e miniatura são enviados nos parâmetros próprios do comando.

```text
tema: elegant; autor: Experience Center; titulo: Nexus da Comunidade; descricao: Uma central completa para navegação, progressão, eventos, segurança e atendimento.; cor: #7C3AED; secoes: Informações|Use o painel para encontrar rapidamente os serviços oficiais.|✨|sim >> Progressão|Novato ➜ 1.000 XP\nVeterano ➜ 5.000 XP\nLendário ➜ 10.000 XP|🏆|sim >> Benefícios|Cores exclusivas\nEventos especiais\nCanais privados|🎁|sim >> Segurança|Proteja seus dados e procure apenas membros identificados da equipe.|🔒|sim; opcoes: Regras|regras|Consulte as normas oficiais.|Normas e segurança|⚖️, Cargos|cargos|Confira sua progressão e benefícios.|Sistema de níveis|🏆, Eventos|eventos|Confira a programação da comunidade.|Agenda oficial|📅, Suporte|suporte|Inicie um atendimento privado.|Ajuda e denúncias|🎫, Parcerias|parcerias|Consulte os requisitos para parcerias.|Projetos externos|🤝; botoes: Confirmar|success|Sua leitura foi confirmada.|✅ >> Explorar|primary|Escolha uma área no menu para continuar.|🧭 >> Reportar|danger|Envie seu relato no canal oficial de suporte.|🚨 >> Discord|link|https://discord.com|🔗; placeholder: Acessar uma área do Nexus; animacao: rainbow; intervalo: 5s; rodape: Experience Center • Components V2
```

## 8. Checklist de qualidade

Antes de considerar um painel pronto:

- [ ] O título explica imediatamente a finalidade.
- [ ] A descrição possui no máximo duas frases diretas.
- [ ] As seções estão agrupadas por assunto.
- [ ] Os separadores automáticos aparecem corretamente.
- [ ] Cada opção do dropdown possui rótulo, valor, resposta, descrição e emoji.
- [ ] Botões perigosos usam `danger` somente quando a ação exige atenção.
- [ ] Links usam `https://` e abrem o destino correto.
- [ ] Banner e miniatura têm boa resolução e não contêm dados privados.
- [ ] GIFs foram testados no aplicativo e no navegador.
- [ ] A animação do Container não está rápida demais.
- [ ] Respostas administrativas permanecem privadas quando apropriado.
- [ ] Todas as opções e botões foram testados.
- [ ] O ID administrativo foi guardado em local seguro para futuras edições.

## 9. Limites que os exemplos respeitam

- Até 8 seções no Container principal.
- Até 6 seções em cada Container de resposta.
- Até 25 opções no dropdown.
- Até 5 botões por Container.
- Até 10 mídias na galeria.
- Intervalo de animação entre 2,5 e 60 segundos.
- Botões de link abrem URLs; eles não enviam respostas.
- As respostas completas não animam a cor. Use GIF ou WebP para movimento nessas telas.
- O fundo, a fonte e o formato externo continuam sendo controlados pelo Discord.
