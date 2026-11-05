# Projeto do 1º Trimestre — Programação Web 🚀

Aplicação web moderna desenvolvida para a disciplina de **Programação Web** do **IF Goiano** (Ensino Médio Integrado).

Esta versão repaginada (Versão 2.0) traz uma experiência de ponta para a demonstração dos conteúdos multimídia requeridos no 1º Trimestre (PDF, Música, Vídeo e Imagem) e processamento interativo de formulários.

---

## ✨ Novidades e Melhorias da Versão 2.0

1. **Alternador de Tema Claro e Escuro (Dark / Light Theme):**
   - Transição suave entre paletas modernas utilizando CSS Variables.
   - Detecção automática da preferência do sistema operacional (`prefers-color-scheme`).
   - Persistência da escolha do usuário no `localStorage`.

2. **Multimídia Integrada e Aprimorada:**
   - **Imagem:** Miniatura responsiva com efeito hover, botão de download direto e **Lightbox Modal** em tela cheia ao clicar.
   - **Música:** Banner customizado com informações da faixa e player nativo HTML5.
   - **Vídeo:** Container responsivo com proporção 16:9 e player nativo HTML5.
   - **Documento PDF:** Banner estilizado com metadados, visualização online em nova aba e download direto do arquivo de tarefas.

3. **Formulário com Validação Interativa em Tempo Real:**
   - Validações de campos obrigatórios (`nome`, `email`, `senha`, `data`, `peso`).
   - Botão de atalho **"Preencher hoje"** que insere a data corrente instantaneamente.
   - Prevenção de envio incorreto com mensagens de erro inline e toasts contextuais.
   - **Modal de Confirmação:** Ao enviar com sucesso, um modal elegante exibe os dados processados e confirmados.

4. **Integração e Histórico:**
   - Link direto na barra de navegação para a **Versão Clássica** dos conteúdos (`conteudos-implementados/WebContent/index.html`), mantendo compatibilidade e rastreabilidade pedagógica.
   - Correção do link quebrado de vídeo na versão legada.

---

## 📂 Estrutura de Diretórios

```
projeto-primeiro-trimestre/
├── index.html                    # Página principal moderna (Dark/Light Mode)
├── package.json                  # Scripts de execução local (npm/npx)
├── css/
│   └── style.css                 # Folha de estilos completa com variáveis CSS
├── js/
│   └── main.js                   # Lógica interativa, modais, tema e validações
├── assets/                       # Mídias principais
│   ├── imagens/imagem.jpg
│   ├── musica/around.mp3
│   ├── video/engracado.mp4
│   ├── docs/tarefa.pdf
│   └── css/estilos.css
└── conteudos-implementados/      # Versão clássica com Bootstrap 5.3
    └── WebContent/
        ├── index.html
        ├── style.css
        ├── Imagem/
        ├── Musica/
        ├── Pdf/
        └── Video/
```

---

## 🚀 Como Executar Localmente

### Opção 1: Abrir diretamente no Navegador
Basta dar um duplo clique no arquivo `index.html` ou abri-lo pelo seu navegador favorito (Google Chrome, Firefox, Edge).

### Opção 2: Via Node.js / NPM
Se tiver o Node instalado:
```bash
npm run dev
```
ou:
```bash
npx serve -l 3000 .
```
Acesse `http://localhost:3000` no navegador.

### Opção 3: Extensão Live Server (VS Code)
Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

