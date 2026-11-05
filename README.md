# Projetos de Programação Web — Ensino Médio Integrado (IF Goiano) 🚀

Repositório central das atividades e projetos desenvolvidos para a disciplina de **Programação Web** do **Instituto Federal Goiano (IF Goiano)**.

---

## 📁 Visão Geral dos Projetos

O repositório é composto por dois projetos complementares que cobrem o desenvolvimento web front-end e a arquitetura de servidores com Java:

| Projeto | Descrição | Principais Tecnologias |
| :--- | :--- | :--- |
| **[`projeto-primeiro-trimestre/`](./projeto-primeiro-trimestre/)** | Aplicação web moderna em formato Landing Page institucional com exibição de multimídias e formulário interativo. | HTML5, CSS3 (Variables, Dark/Light Mode), JavaScript ES6+ e Bootstrap 5.3 |
| **[`conteudos-implementados-3/`](./conteudos-implementados-3/)** | Aplicação dinâmica com backend em Java Servlets, validação de regras de negócio com exceções customizadas e páginas de erro mapeadas via descritor de implantação. | Java 17+, Jakarta EE Servlet API 6.0, Apache Maven e Bootstrap 5.3 |

---

## 🌟 O Que Foi Atualizado e Completado (Versão 2.0)

### 1. `projeto-primeiro-trimestre`
- **Alternador de Tema (Dark / Light):** Alternância dinâmica entre tema escuro e claro com persistência em `localStorage` e detecção da preferência do sistema operacional.
- **Multimídia Completa e Interativa:**
  - Imagem com miniatura, efeito hover e **Lightbox Modal** integrado para visualização em tela cheia.
  - Música MP3 com banner estético e player nativo HTML5.
  - Vídeo MP4 incorporado com container responsivo 16:9.
  - Documento PDF da tarefa com opções de leitura online ou download direto.
- **Formulário com Validação em Tempo Real:** Validações de campos obrigatórios (`nome`, `email`, `senha`, `data`, `peso`), atalho para preencher a data de hoje, mensagens de erro inline e **Modal de Confirmação** com resumo estilizado dos dados.
- **Correção da Versão Clássica:** Correção do link ausente de vídeo na pasta legada `conteudos-implementados`, adição do arquivo de mídia e modernização visual com Bootstrap 5.3.
- **Estrutura NPM:** Adicionado `package.json` com scripts para execução local via `npm run dev` / `npx serve`.

### 2. `conteudos-implementados-3`
- **Atualização para Jakarta EE 6.0:** Atualização do descritor `web.xml` da especificação legada Java EE para o padrão moderno `https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd`.
- **Correção de Dependência e Mapeamento do Servlet:** Removido mapeamento de servlet inexistente (`ConteudosImplementadosServlet`) e configurado o `ContatoServlet` para as rotas `/ligacao/cadastro` e `/cadastro`.
- **Validações e Tratamento de Exceções:**
  - `ConversaoDePesoException`: validação robusta de peso corporal, suportando vírgula e ponto decimal, com limites lógicos (maior que zero e realista).
  - Redirecionamento automático configurado no `web.xml` para as páginas de erro modernas:
    - `/erro/dataErro.html` (para falhas de conversão de data `DateTimeParseException`)
    - `/erro/erroNoPeso.html` (para falhas de peso `ConversaoDePesoException`)
- **Resposta do Servlet Modernizada:** O backend agora retorna uma página de confirmação responsiva e acessível em HTML5 com Bootstrap 5.3, escapando caracteres para prevenção de XSS e com `charset=UTF-8`.
- **Gerenciador de Dependências Maven:** Adicionado arquivo `pom.xml` padronizado para compilação e empacotamento WAR no Maven.

---

## 🏃‍♂️ Como Executar

### Para visualizar o Front-end (`projeto-primeiro-trimestre`):
Abra o arquivo [`projeto-primeiro-trimestre/index.html`](./projeto-primeiro-trimestre/index.html) diretamente no navegador, ou execute com Node.js:
```bash
cd projeto-primeiro-trimestre
npx serve -l 3000 .
```

### Para executar o Back-end Java (`conteudos-implementados-3`):
Compile o projeto com Maven:
```bash
cd conteudos-implementados-3
mvn clean package
```
Publique o arquivo WAR gerado em `target/conteudosimplementados3.war` em um servidor **Tomcat 10.1+**, ou execute diretamente através da sua IDE favorita (Eclipse, IntelliJ IDEA ou VS Code).

---

## 👤 Autor

**Henrique Gabriel Barbosa**  
Instituto Federal Goiano — Ensino Médio Integrado  
Disciplina: Programação Web

