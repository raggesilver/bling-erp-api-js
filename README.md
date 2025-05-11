# Bling ERP SDK (não oficial)

SDK sem dependências, exclusivamente ESM, e compatível com Node.js, Bun, Deno (não testado), e Cloudflare Workers.

> Este é um fork mantido por Paulo Queiroz. O [repositório original de Alexandre Bellas](https://github.com/AlexandreBellas/bling-erp-api-js) parece estar abandonado.

Pacote de integração com a [API v3 do ERP Bling](https://developer.bling.com.br)
para JavaScript/TypeScript.

Atualizado com a versão `v310` da API ([veja o registro de alterações](https://developer.bling.com.br/changelogs#2024-10-02)).

## Instalação

Para instalar, execute o comando:

```bash
npm i bling-erp-sdk
# ou
pnpm add bling-erp-sdk
# ou
bun add bling-erp-sdk
```

## Criação de uma nova conexão

Para criar uma conexão ao serviço do Bling, basta instanciar o objeto com a [API key](https://developer.bling.com.br/autenticacao) em seu construtor.

```js
import Bling from 'bling-erp-sdk'

const apiKey = 'sua_api_key'
const blingConnection = new Bling(apiKey)
```

Vale destacar que o fluxo de criação e autorização do aplicativo **não é feito
pela biblioteca**. Ou seja, a biblioteca somente recebe o `access_token` gerado
a partir do _endpoint_ `/token`. [Veja a referência](https://developer.bling.com.br/aplicativos#tokens-de-acesso).

Para entender na prática como a autenticação citada acima funciona, [veja o
projeto de demonstração](https://github.com/raggesilver/bling-erp-sdk/tree/main/demo).

## Entidades disponíveis

Todas as entidades do Bling atualmente são permitidas para interação. São elas:

- [x] Borderos (`.borderos`)
- [x] Campos customizados (`.camposCustomizados`)
- [x] Canais de Venda (`.canaisDeVenda`)
- [x] Categorias - Lojas (`.categoriasLojas`)
- [x] Categorias - Produtos (`.categoriasProdutos`)
- [x] Categorias - Receitas e Despesas (`.categoriasReceitasDespesas`)
- [x] Contas a Pagar (`.contasPagar`)
- [x] Contas a Receber (`.contasReceber`)
- [x] Contas Contábeis (`.contasContabeis`)
- [x] Contatos (`.contatos`)
- [x] Contatos - Tipos (`.contatosTipos`)
- [x] Contratos (`.contratos`)
- [x] Depósitos (`.depositos`)
- [x] Empresas (`.empresas`)
- [x] Estoques (`.estoques`)
- [x] Formas de Pagamento (`.formasDePagamento`)
- [x] Grupos de Produtos (`.gruposDeProdutos`)
- [x] Homologação (`.homologacao`)
- [x] Logísticas (`.logisticas`)
- [x] Logísticas - Etiquetas (`.logisticasEtiquetas`)
- [x] Logísticas - Objetos (`.logisticasObjetos`)
- [x] Logísticas - Remessas (`.logisticasRemessas`)
- [x] Logísticas - Serviços (`.logisticasServicos`)
- [x] Naturezas de Operações (`.naturezasDeOperacoes`)
- [x] Notas Fiscais de Consumidor Eletrônicas (`.nfces`)
- [x] Notas Fiscais de Serviço Eletrônicas (`.nfses`)
- [x] Notas Fiscais Eletrônicas (`.nfes`)
- [x] Notificações (`.notificacoes`)
- [x] Ordens de Produção (`.ordensDeProducao`)
- [x] Pedidos - Compras (`.pedidosCompras`)
- [x] Pedidos - Vendas (`.pedidosVendas`)
- [x] Produtos (`.produtos`)
- [x] Produtos - Estruturas (`.produtosEstruturas`)
- [x] Produtos - Fornecedores (`.produtosFornecedores`)
- [x] Produtos - Lojas (`.produtosLojas`)
- [x] Produtos - Variações (`.produtosVariacoes`)
- [x] Propostas Comerciais (`.propostasComerciais`)
- [x] Situações (`.situacoes`)
- [x] Situações - Módulos (`.situacoesModulos`)
- [x] Situações - Transições (`.situacoesTransicoes`)
- [x] Usuários (`.usuarios`)
- [x] Vendedores (`.vendedores`)

## Exemplo de uso

Para listar seus produtos, basta executar:

```js
import Bling from 'bling-erp-sdk'

const apiKey = 'sua_api_key'
const blingConnection = new Bling(apiKey)

const products = await blingConnection.produtos.get()

console.log(products)
```

## Executando os testes do projeto

Faça o clone do projeto, instale as dependências e execute:

```bash
npm run test
```

## Contribuindo ao projeto

- [Guia de contribuição](CONTRIBUTING.md)
- Para relatar problemas ou sugerir melhorias, por favor abra uma issue no repositório.

## Agradecimentos

Este projeto é um fork do trabalho original de [Alexandre Bellas](https://github.com/AlexandreBellas/bling-erp-api-js).
