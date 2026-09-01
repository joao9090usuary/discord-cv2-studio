# Política de Segurança

## Versões suportadas

Correções de segurança são aplicadas à versão mais recente disponível na branch `main`.

## Como relatar uma vulnerabilidade

Não abra uma issue pública com detalhes que permitam explorar a falha. Use o recurso **Report a vulnerability** na aba **Security** do repositório, quando disponível, ou entre em contato privadamente com o mantenedor pelo perfil do GitHub.

Inclua:

- versão ou commit afetado;
- impacto observado;
- passos mínimos para reprodução;
- evidências sem tokens, dados pessoais ou informações de servidores reais;
- possível correção, se houver.

## Resposta a credenciais expostas

Se um token do Discord for exposto:

1. redefina o token imediatamente no Discord Developer Portal;
2. atualize o segredo no ambiente de hospedagem;
3. reinicie o bot;
4. remova a credencial do histórico antes de voltar a publicar;
5. verifique logs e atividades suspeitas.

O arquivo `.env` nunca deve ser enviado ao GitHub. Use somente `.env.example`, com valores vazios.
