O intuito do novo projeto. é: Com base na IA do GEMINI, na hora de cadastrar um evento, ele ira gerar sugestões de descrição, nome e valor com base na categoria do evento. 

Quando realizar a clonagem do repositorio, devera adicionar o Gemini Key, na linha 110, no campo "const GEMINI_KEY = "" que se encontra no arquivo "cadastroEvento.js" localizado na pasta web/js. 
Segue a chave: AIzaSyD1awN-5c-tyrkM-TqXJkPYdcX5DuVJkDQ

Você pode gerar a sua chave também, se preciso: https://aistudio.google.com/apikey. Clicando no link, clique na opção para gerar chave API.

Pode seguir o caminho normal, clique no botão Cadastro de Eventos localizado na nav-bar, faça o cadastro de usuario e efetue o login. Vá novamente ao cadastro de eventos e por fim, ira localizar um botão "gerar dados" no final do formulario. Se preferir, poder usar a url para ir direto: "localhost:8003/cadastroEventos.html"

Caso nao tenha preenchido nada no formulario, ele irá exibir uma mensagem de erro indicando que deve escolher uma categoria. Por fim, selecione a categoria e clique novamente no botão. Aguarde uns instantes e sera retornado uma descrição, um nome e um valor para o seu evento. 

Infelizmente, quando voce utiliza a IA, os botoes da navbar acabam nao funcionando mais, entao seria adequado navegar pela URL das paginas: caso queira visualizar o evento cadastrado, colocar "localhost:8003/index-03.html"
