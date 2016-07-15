# Desafio HE:Labs #


## Premissas e Disclaimers ##

EC: Minha intenção era desenvolver o sistema todo em EC6, porém, estive em período de deploy em cliente e muito menos tempo do que eu estava planejando me sobrou.

Testes Unitários: Igualmente, pela falta de tempo atipica que tive durante essa semana, não pude efetuar uma analise completissima de tudo e então desenvolver à
partir dos testes unitários, conforme reza a cartilha. Porém, presei a regra de negócio da camada de Requests ao REST, para que esse mesmo mantivesse a integridade

O sistema foi desenvolvido em AngularJS com um breve estudo de UX à partir do Angular Material, sem muita frescura, uma vez que trata-se de um sistema simples.
Ao tentar decidir qual seria a melhor abordagem, decidí optar por desenvolver um sistema o mais clean possivel, para que pudesse ficar evidente o quanto se consegue atingir com um framework como o AngularJS. A simplicidade não passou por cima da boa modelagem do sistema.

Mesmo sendo pratica comum entre os desenvolvedores AngularJS executarem os Models de forma sintetizada nos próprios controllers, eu procurei manter uma abordagem
mais clássica, criando a minha camada de models para que o sistema pudesse ser o mais MVC possível. 

Quaisquer dúvidas sobre a minha abordagem ao desenvolver o sistema pokedex, aguardarei ansiosamente por uma conversa direta, para que possamos fazer as considerações sobre o mesmo.



### Sequenciamento e definições ###


* Instalar bower na maquina: ``` $ sudo npm install -g bower ```
* Instalar GruntJS na maquina: ``` $ sudo npm install -g grunt ```
* Clonar versão mais atual do sistema
* ir até a pasta do projeto
* rodar os seguintes commandos:

```
$ sudo npm install
$ sudo bower install
```

Para rodar angular.js sabe-se que não pode ser diretamente pelo arquivo:


``` file:///path-to-solution/path-to-index.html ```

Deve-se abrir o mesmo à partir de um servidor, seja ele nginx, apache ou da própria escolha do desenvolvedor.
Porém, para desenvolvimento em Angular.JS existem inúmeras soluções à partir do repo npm ou grunt, existe um muito bom e desacoplado 
do projeto que é o npm http-server, para instalar ele globalmente na máquina basta utilizar o seguinte comando:

```  $ npm install -g http-server ```

Depois ir até a pasta onde está a solução em angular e então, rodar o servidorzinho:

```  $ http-server .  ```

Alternativamente, pode-se inserir o projeto na pasta www do Apache ou NGinx


O sistema está baseado em Testes Unitários.

Para rodar os testes basta ir até a pasta do projeto e rodar o seguinte comando:

``` karma start  ```

O mesmo está configurado para executar o seu runner de forma contínua, para que a integridade do projeto se mantivesse durante as iterações

### Deploy e runtime do sistema ###

O sistema conta com um arquivo Gruntfile.js como compilador dos arquivos de saida. Como disse anteriormente, eu gostaria de ter tido o tempo para
desenvolver o projeto todo em EC6, contendo os seus typedefs e minificação completa do angular. 

O Grunt está sendo usado para concatenar as libs do sistema em um unico arquivo, bem como o codigo desenvolvido em outro arquivo em separado. Assim, temos 
apenas 2 arquivos .js para baixar na aplicação em runtime. O mesmo é necessário para que a aplicação seja executada em maquina local, caso não esteja sendo 
desenvolvido nada, basta uma primeira executada do grunt para que os arquivos .JS sejam concatenados em suas respectivas pastas scripts e vendor.



A estrutura básica do sistema é a seguinte:

```
   |-assets
   |---img			//todo os assets/imagens necessarias
   |---styles
   |-----/main.css
   |-----/angular-material.min.css
   |-solution
   |----/app.js                  // Bootstrapeador da solução, obviamente
   |---base
   |-----controllers
   |--------/pokeDexCtrl.js	//Aqui estão as regras para a tela geral de busca e apresentação do pokedex
   |--------/commentCtrl.js      // Aqui estão as regras para a parte de inserir e visualizar os comentarios inseridos na aplicação
   |-----services
   |--------/appStateService.js
   |--------/httpServices.js
   |--------/databaseService.js
   |---models					
   |-----comment.js			
   |-----pokemon.js
   |-tests
   |----/httpServices.test.js     //Unit Tests dos serviços de requests
   |-vendor                        // Aqui vão todas as libs externas, como JQUery, angular. etc, concatenadas em um unico arquivo
   |-views                         // Todas as views 
   |--/home.tpl.html
   |--/dialog.tpl.html


```


