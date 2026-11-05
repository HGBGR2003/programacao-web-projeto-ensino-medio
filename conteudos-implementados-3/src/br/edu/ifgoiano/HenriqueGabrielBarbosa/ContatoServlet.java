package br.edu.ifgoiano.HenriqueGabrielBarbosa;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "ContatoServlet", urlPatterns = {"/ligacao/cadastro", "/cadastro"})
public class ContatoServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Redireciona requisicoes GET diretamente para o formulario
        resp.sendRedirect(req.getContextPath() + "/ligacao/forma.html");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");

        String nome = req.getParameter("nome");
        String senha = req.getParameter("senha");
        String datatexto = req.getParameter("data");
        String peso = req.getParameter("peso");

        // Validacao do peso (dispara ConversaoDePesoException em caso de erro)
        double pesoValido = validarPeso(peso);

        // Validacao e formatacao da data (dispara DateTimeParseException em caso de erro)
        DateTimeFormatter formatadorEntrada = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter formatadorSaida = DateTimeFormatter.ofPattern("dd 'de' MMMM 'de' yyyy", Locale.forLanguageTag("pt-BR"));
        LocalDate data = LocalDate.parse(datatexto != null ? datatexto.trim() : "", formatadorEntrada);

        // Log no console do servidor
        System.out.println("[ContatoServlet] Cadastro processado:");
        System.out.println("  > Nome: " + nome);
        System.out.println("  > Data: " + data);
        System.out.println("  > Peso: " + pesoValido + " kg");

        // Renderizacao da resposta HTML estilizada com Bootstrap 5.3
        PrintWriter out = resp.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html lang=\"pt-BR\">");
        out.println("<head>");
        out.println("    <meta charset=\"UTF-8\">");
        out.println("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
        out.println("    <title>Sucesso no Cadastro - Programação Web</title>");
        out.println("    <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\">");
        out.println("    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css\">");
        out.println("    <link rel=\"stylesheet\" href=\"" + req.getContextPath() + "/style.css\">");
        out.println("</head>");
        out.println("<body>");
        out.println("    <header class=\"custom-navbar\">");
        out.println("        <div class=\"container d-flex justify-content-between align-items-center\">");
        out.println("            <a href=\"" + req.getContextPath() + "/index.html\" class=\"navbar-brand text-decoration-none\">");
        out.println("                <i class=\"bi bi-code-slash text-primary\"></i> Programação Web");
        out.println("            </a>");
        out.println("            <span class=\"brand-badge\"><i class=\"bi bi-mortarboard-fill me-1\"></i> IF Goiano</span>");
        out.println("        </div>");
        out.println("    </header>");
        out.println("    <main class=\"container my-5\">");
        out.println("        <div class=\"form-card text-center\">");
        out.println("            <div class=\"d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle p-4 mb-3\">");
        out.println("                <i class=\"bi bi-check-circle-fill display-4\"></i>");
        out.println("            </div>");
        out.println("            <h2 class=\"fw-bold text-success mb-2\">Cadastro Realizado com Sucesso!</h2>");
        out.println("            <p class=\"text-muted mb-4\">Os dados foram processados e validados pelo Servlet Jakarta no servidor.</p>");
        out.println("            <div class=\"bg-light p-4 rounded-3 text-start mb-4 border\">");
        out.println("                <div class=\"mb-2\"><strong><i class=\"bi bi-person text-primary me-2\"></i>Nome:</strong> " + escapeHtml(nome) + "</div>");
        out.println("                <div class=\"mb-2\"><strong><i class=\"bi bi-calendar-check text-primary me-2\"></i>Data:</strong> " + data.format(formatadorSaida) + "</div>");
        out.println("                <div class=\"mb-0\"><strong><i class=\"bi bi-speedometer2 text-primary me-2\"></i>Peso:</strong> " + String.format(Locale.US, "%.1f", pesoValido) + " kg</div>");
        out.println("            </div>");
        out.println("            <div class=\"d-flex justify-content-center gap-3\">");
        out.println("                <a href=\"" + req.getContextPath() + "/ligacao/forma.html\" class=\"btn-modern-primary\">");
        out.println("                    <i class=\"bi bi-arrow-repeat\"></i> Novo Cadastro");
        out.println("                </a>");
        out.println("                <a href=\"" + req.getContextPath() + "/index.html\" class=\"btn-modern-secondary\">");
        out.println("                    <i class=\"bi bi-house\"></i> Início");
        out.println("                </a>");
        out.println("            </div>");
        out.println("        </div>");
        out.println("    </main>");
        out.println("    <footer>");
        out.println("        <div class=\"container\"><p class=\"mb-0\">Projeto de Programação Web &bull; Ensino Médio Integrado &bull; IF Goiano</p></div>");
        out.println("    </footer>");
        out.println("</body>");
        out.println("</html>");
    }

    public double validarPeso(String pesoStr) throws ConversaoDePesoException {
        if (pesoStr == null || pesoStr.trim().isEmpty()) {
            throw new ConversaoDePesoException("O campo de peso não foi preenchido!");
        }
        try {
            double pesoFormatado = Double.parseDouble(pesoStr.trim().replace(',', '.'));
            if (pesoFormatado <= 0 || pesoFormatado > 500) {
                throw new ConversaoDePesoException("Peso inválido (" + pesoFormatado + " kg). O valor deve ser positivo e realista.");
            }
            return pesoFormatado;
        } catch (NumberFormatException e) {
            throw new ConversaoDePesoException("Erro na conversão do peso: formato numérico inválido.");
        }
    }

    // Escape HTML para proteção contra injeção de script
    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'", "&#x27;");
    }

    // Método mantido para compatibilidade com versões legadas
    public void PegarPeso(String Peso1) throws ConversaoDePesoException {
        validarPeso(Peso1);
    }
}