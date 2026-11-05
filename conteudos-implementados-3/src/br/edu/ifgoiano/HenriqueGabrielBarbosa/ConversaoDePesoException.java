package br.edu.ifgoiano.HenriqueGabrielBarbosa;

public class ConversaoDePesoException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ConversaoDePesoException() {
        super("Erro na conversão de peso.");
    }

    public ConversaoDePesoException(String msg) {
        super(msg);
    }

    public ConversaoDePesoException(String msg, Throwable cause) {
        super(msg, cause);
    }
}