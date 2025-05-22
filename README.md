# NodeJS Fundamentals Study

## HTTP (Hypertext Transfer Protocol)

- Protocolo de camada de aplicação utilizado para transmissão de documentos hipermídia, como HTML.
- Define como as requisições e respostas são enviadas.
- Possui as seguintes características
  - Baseado em texto
  - Usa métodos conhecidos como verbos HTTP, alguns dos mais utilizados são:
    - GET => Buscar um recurso do back-end
    - POST => Criar um recurso no back-end
    - PUT => Atualizar um recurso no backend
    - PATCH => Atualizar uma informação específica de um recurso no backend, podemos que é responsável por atualizar parcialmente um recurso existente
    - DELETE => Deletar um recurso do backend
    - HEAD => Semelhante ao GET, mas retorna apenas os headers, sem nenhum corpo da resposta, é útil para verificiar a existência de um recurso
    - OPTIONS => Retorna os métodos que são suportados por um determinado recurso, é amplamente utilizado em CORS

## Rotas HTTP

Uma rota HTTP é um caminho que define uma ação específica em um servidor web/API, de maneira bem simples uma rota HTTP é formada por um caminho + método HTTP.

Exemplos:

- GET /products => Busca todos os produtos
- POST /products => Cria um novo produto
- GET /produtos/:id => Busca o produto com um determinado id
- PUT /produtos/:id => Atualiza o produto com um determinado id
- DELETE /produtos/:id => Deleta um produto com um determinado id

## Cabeçalhos HTTP

Permitem passar informações adicionais, é constituído por nome seguindo de dois pontos (:) seu valor.

Exemplos:

-Content-Type: application/json (É responsável por informar que resposta que esta sendo enviada esta em formato JSON).
-Access-Control-Allow-Origin": \* (É responsável por dizer quais os domínios que podem acessar um determinado recurso, nesse caso está permitindo com que qualquer domínio possa acessar um determinado recurso).

## Streams

Streams ou fluxos de dados é uma maneira que temos de processar dados antes mesmo que todos os dados estejam prontos, ou seja realizamos a escrita ou leitura de dados parcialmente, a medida que precisamos deles, isso é muito utilizado por exemplo em plataforma de streaming, onde o usuário não precisa necessariamente baixar todo o vídeo, ele pode simplesmente ir fazendo o download de chuncks (nome que se dá aos pequenos pacotes que são enviados sob demanda).

Por que isso é importante?

- Evita de travar toda a memória principal.
- Melhora a experiência do usuário, pois ele não precisa esperar muito tempo para acessar um recurso (desde que não precisamos de todo o recurso, como video).

Detalhe: Sua aplicação não se limita a apenas streaming de mídia, também podem ser utilizados para comunicação entre processos dentro do Sistema Operacional, dentre outras aplicações.

Existem dois tipos principais de streams, a Readable Stream e a Writable Stream, a primeira é utilizada quando queremos ler dados de uma fonte e a segunda é quando queremos enviar dados para algum destino

No Node.js uma requisição HTTP é uma Readable Stream, enquanto a resposta HTPP é uma Writable Stream.

### Pipe

O pipe é uma forma de conectar duas streams, normalmente ligando uma Readable Stream ligada a uma Writable Stream.
