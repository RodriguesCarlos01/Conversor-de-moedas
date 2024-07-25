// A classe PacoteBuscador é como um “pacote” que nos ajuda a buscar informações de uma API
class PacoteBuscador{
    // constructor(baseURL): Define o endereço base da API.
    constructor(baseURL){
        this.baseURL = baseURL;
    }
    // get(endpoint): Faz uma requisição à API e retorna os dados obtidos.
    async get(endpoint){
        const response = await fetch(this.baseURL + endpoint);
        return await response.json();
        
    }
}
let botao = document.querySelector(".converter")
botao.addEventListener("click", async () => {
    //O async é uma palavra-chave que usamos para declarar que uma função é assíncrona. Isso significa que ela pode conter operações assíncronas.
    const API = new PacoteBuscador("https://cdn.moeda.info");
    try{
        //O await é usado dentro de funções assíncronas para esperar que uma Promise seja resolvida. Ele “pausa” a execução da função até que a Promise seja resolvida ou rejeitada
        
        const dados = await API.get("/api/latest.json");
        const resultado = converterMoeda(dados);
        const resultadoApi = document.querySelector(".resultadoApi")
        
        resultadoApi.textContent = `Dólares convertidos pra reais: ${resultado}`;
        
             
    }catch (error) {
        console.lpg("Erro na requisição:", error)
    }    
    });
    // Essa função recebe os dados da API e faz o cálculo da conversão de dólares para reais.
    const converterMoeda = (dados) => {
        let respostaApi = dados.rates.BRL
        
        const valorParaConverter = parseFloat(document.querySelector(".valorParaConverter").value);
        const soma = respostaApi * valorParaConverter;
        
        const resultadoFormatado = soma.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        
        return resultadoFormatado
        // O resultado é arredondado para duas casas decimais e retornado.
        //return soma.toFixed(2)
    }  
    
    

 




