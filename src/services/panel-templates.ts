import type { CreatePanelInput } from "../domain/panel.js";
import { parsePanelRequest } from "./request-parser.js";

export const templateChoices = [
  { name: "Regras e moderação", value: "regras" },
  { name: "Central da comunidade", value: "comunidade" },
  { name: "Cargos e progressão", value: "cargos" },
  { name: "Perfil gamer", value: "gaming" },
  { name: "Comunidade aesthetic", value: "cute" },
] as const;

const templateRequests: Record<string, string> = {
  regras: [
    "tema: regras",
    "titulo: Lista de regras",
    "autor: Central de Moderação",
    "descricao: Leia atentamente. O desconhecimento das regras não isenta nenhum membro das consequências.",
    "cor: #23A55A",
    "secoes: Conduta|Respeite todos os membros e evite provocações, discriminação ou assédio.|🛡️|sim >> Conteúdo|Não publique spam, golpes, conteúdo ilegal ou material impróprio.|📜|sim >> Penalidades|As medidas podem incluir aviso, silenciamento, expulsão temporária ou banimento.|⚠️|sim",
    "opcoes: Li e concordo|aceite|Obrigado por confirmar a leitura das regras.|Confirmar leitura, Preciso de ajuda|ajuda|A equipe de moderação foi informada da sua dúvida.|Falar com a moderação",
    "botoes: Confirmar leitura|success|As regras foram confirmadas.|✅ >> Reportar problema|danger|Use o canal de suporte para enviar seu relato.|🚨",
    "animacao: off",
    "rodape: Regras oficiais • Última revisão automática",
  ].join("; "),
  comunidade: [
    "tema: elegante",
    "titulo: Central da Comunidade",
    "autor: Painel oficial",
    "descricao: Tudo o que você precisa para aproveitar melhor o servidor em um só lugar.",
    "cor: #5865F2",
    "secoes: Comece aqui|Leia as regras, escolha seus interesses e conheça os canais principais.|✨ >> Destaques|Eventos, novidades e projetos da comunidade são publicados semanalmente.|📣",
    "opcoes: Regras|regras|Consulte o canal oficial de regras.|Normas da comunidade, Eventos|eventos|Confira a agenda de eventos.|Programação, Suporte|suporte|Abra uma solicitação com a equipe.|Preciso de ajuda",
    "botoes: Estou pronto|primary|Bem-vindo à comunidade!|🚀",
    "animacao: rainbow",
    "intervalo: 5s",
    "rodape: Feito com Discord Components V2",
  ].join("; "),
  cargos: [
    "tema: gaming",
    "titulo: Cargos e Progressão",
    "autor: Sistema de níveis",
    "descricao: Participe da comunidade para ganhar experiência, desbloquear cores e receber novos benefícios.",
    "cor: #ED4245",
    "secoes: Progressão|Aprendiz ➜ 1.000 XP\\nExplorador ➜ 2.500 XP\\nVeterano ➜ 5.000 XP\\nMestre ➜ 10.000 XP|🏆|sim >> Benefícios|Cores exclusivas, prioridade em eventos e acesso a canais especiais.|🎁|sim",
    "opcoes: Ver progresso|progresso|Seu progresso estará disponível no sistema de níveis.|Consultar XP, Ver benefícios|beneficios|Confira os benefícios na seção acima.|Recompensas",
    "botoes: Como ganhar XP?|primary|Converse, participe de eventos e contribua com a comunidade.|⭐",
    "animacao: pulse",
    "intervalo: 4s",
    "rodape: Progrida de forma saudável • Spam não concede XP",
  ].join("; "),
  gaming: [
    "tema: gaming",
    "titulo: Perfil do Jogador",
    "autor: Player Card",
    "descricao: Sua central pessoal de estatísticas, equipamentos e conquistas.",
    "cor: #00A8FC",
    "secoes: Carteira|8.170 créditos\\n5 pontos de prestígio|💎|sim >> Equipamentos|Picareta da 3ª Era\\nEspada Lendária\\nAmuleto de Proteção|⚒️|sim >> Multiplicador|3.45× de experiência ativa|🎟️|sim",
    "opcoes: Estatísticas|stats|Suas estatísticas foram carregadas.|Ver números, Inventário|inventario|Seu inventário foi carregado.|Ver itens, Conquistas|conquistas|Suas conquistas foram carregadas.|Ver troféus",
    "botoes: Atualizar perfil|primary|Perfil atualizado com sucesso.|🔄",
    "animacao: pulse",
    "intervalo: 4s",
    "rodape: Perfil atualizado automaticamente",
  ].join("; "),
  cute: [
    "tema: cute",
    "titulo: Cupid's Community",
    "autor: Icons + Social",
    "descricao: Um espaço acolhedor para conversar, criar amizades e compartilhar seus interesses. ♡",
    "cor: #FFB6D9",
    "secoes: Informações|Use o bom senso, respeite todos e siga os Termos do Discord.|💗 >> Booster perks|Cargo personalizado, destaque no perfil e acesso a benefícios especiais.|🎀",
    "opcoes: Apresentações|apresentacoes|Vá ao canal de apresentações e conte um pouco sobre você.|Conheça a comunidade, Booster perks|boosters|Confira todos os benefícios de booster.|Benefícios",
    "botoes: Entrar na comunidade|success|Que bom ter você aqui! ♡|💞",
    "animacao: pulse",
    "intervalo: 5s",
    "rodape: safe • social • friendly",
  ].join("; "),
};

export function getPanelTemplate(name: string): CreatePanelInput | undefined {
  const request = templateRequests[name];
  return request ? parsePanelRequest(request) : undefined;
}
