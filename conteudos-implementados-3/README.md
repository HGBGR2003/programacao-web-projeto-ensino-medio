# conteudos-implementados-3 🚀

Projeto web desenvolvido para a disciplina de **Programação Web** do **IF Goiano** (Ensino Médio Integrado).

Este projeto demonstra a construção de uma aplicação Java Web dinâmica utilizando a especificação moderna **Jakarta EE (Servlets)**, validação de regras de negócio com exceções customizadas, páginas de erro automatizadas via `web.xml` e uma interface responsiva construída com **Bootstrap 5.3**.

---

## 🛠️ Tecnologias e Recursos

- **Backend:** Java 17+ / Java 25 com Jakarta Servlet API 6.0 (`jakarta.servlet.*`)
- **Frontend:** HTML5 semântico, CSS3 moderno, JavaScript ES6+ e Bootstrap 5.3 + Bootstrap Icons
- **Servidor Web / Container de Servlet:** Compatível com Apache Tomcat 10.1+, Eclipse Jetty 12+ ou GlassFish 7+
- **Gerenciador de Dependências:** Apache Maven (`pom.xml`)

---

## 📂 Estrutura do Projeto

```
conteudos-implementados-3/
├── pom.xml                               # Configuração Maven para build e empacotamento WAR
├── src/                                  # Código-fonte Java
│   └── br/edu/ifgoiano/HenriqueGabrielBarbosa/
│       ├── ContatoServlet.java          # Servlet Jakarta para processamento do formulário
│       └── ConversaoDePesoException.java # Exceção customizada de validação de peso
├── build/classes/                        # Binários compilados (.class)
└── WebContent/                           # Raiz da aplicação Web (WAR)
    ├── index.html                        # Hub de mídias e navegação principal
    ├── style.css                         # Folha de estilos modernos
    ├── assets/                           # Arquivos estáticos
    │   ├── imagem/imagem.jpg             # Imagem de demonstração
    │   ├── musica/around.mp3             # Áudio MP3
    │   ├── video/engracado.mp4           # Vídeo MP4
    │   └── pdf/tarefa.pdf                # Documento PDF da tarefa
    ├── ligacao/
    │   └── forma.html                    # Formulário de cadastro com máscaras e validações
    ├── erro/
    │   ├── dataErro.html                 # Página disparada em caso de DateTimeParseException
    │   └── erroNoPeso.html               # Página disparada em caso de ConversaoDePesoException
    └── WEB-INF/
        ├── web.xml                       # Descritor de implantação Jakarta EE 6.0 com mapeamentos e erros
        └── classes/                      # Classes prontas para implantação direta
```

---

## ⚙️ Regras de Negócio e Tratamento de Exceções

1. **Processamento do Formulário (`ContatoServlet`):**
   - Mapeado em `/ligacao/cadastro` e `/cadastro`.
   - Processa os campos `nome`, `senha`, `data` e `peso`.
   - Define encoding explicitamente como `UTF-8`.
   - Retorna uma página de confirmação moderna renderizada com Bootstrap 5.3.

2. **Validação de Data (`DateTimeParseException`):**
   - O campo data deve estar estritamente no padrão `dd/MM/yyyy`.
   - Caso um valor inválido seja informado, o Servlet dispara `java.time.format.DateTimeParseException`, sendo capturado pelo `web.xml` e direcionando automaticamente para `erro/dataErro.html`.

3. **Validação de Peso (`ConversaoDePesoException`):**
   - Aceita ponto ou vírgula decimal (ex: `75.5` ou `75,5`).
   - Se o valor for não-numérico, menor/igual a zero ou fora dos limites aceitáveis, dispara a exceção de tempo de execução customizada `ConversaoDePesoException`, sendo interceptada pelo `web.xml` e direcionando para `erro/erroNoPeso.html`.

---

## 🚀 Como Executar

### Opção 1: Via Maven
Para compilar e gerar o arquivo WAR:
```bash
mvn clean package
```
O arquivo `conteudosimplementados3.war` será gerado no diretório `target/` e pode ser publicado em qualquer container Tomcat 10.1+.

### Opção 2: Pelo Eclipse IDE / IntelliJ IDEA / VS Code
1. Abra a pasta `conteudos-implementados-3` na IDE.
2. Configure um servidor de aplicação local (**Apache Tomcat 10.1** ou superior).
3. Adicione o projeto ao servidor e clique em **Run / Debug**.
4. Acesse: `http://localhost:8080/conteudosimplementados3/`

