const protocolo = 'http://';
const baseURL = 'localhost:3003';

function formatarDataDDMMYYYY(data) {
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML

    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)

    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('d-none');
    }, timeout);
}

async function cadastrarEvento() {
    //constrói a URL completa
    const eventosEndpoint = '/cadastrar'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`

    //pega os inputs que contém os valores que o usuário digitou
    let nomeInput = document.querySelector('#nomeEventoInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let precoInput = document.querySelector('#precoInput');
    let descricaoInput = document.querySelector('#descricaoInput')
    let urlLogoInput = document.querySelector('#urlLogoInput')
    let urlSiteInput = document.querySelector('#urlSiteInput')
    let enderecoInput = document.querySelector('#enderecoInput')
    let cepInput = document.querySelector('#cepInput')
    let cidadeInput = document.querySelector('#cidadeInput')
    let estadoInput = document.querySelector('#estadoInput')
    let numeroInput = document.querySelector('#numeroInput')
    let categoriasInput = document.querySelector('#categoriaInput')

    //pega os valores digitados pelo usuário
    let nome = nomeInput.value
    let dataInicio = formatarDataDDMMYYYY(dataInicioInput.value);
    let preco = parseFloat(precoInput.value)
    let descricao = descricaoInput.value
    let urlLogo = urlLogoInput.value
    let urlSite = urlSiteInput.value
    let endereco = enderecoInput.value
    let cep = cepInput.value
    let cidade = cidadeInput.value
    let estado = estadoInput.value
    let numero = numeroInput.value
    let categorias = categoriasInput.value


    if (nome && dataInicio && preco >= 0 && descricao && urlLogo && urlSite && cep && endereco && cidade && estado && numero && categorias) {

        //limpa os campos que o usuário digitou
        nomeEventoInput.value = "";
        dataInicioInput.value = "";
        precoInput.value = "";
        descricaoInput.value = "";
        urlLogoInput.value = "";
        urlSiteInput.value = "";
        enderecoInput.value = "";
        cepInput.value = "";
        cidadeInput.value = "";
        estadoInput.value = "";
        numeroInput.value = "";
        categoriasInput.value = "";

        //envia os dados ao servidor (back end)
        try {
        const response = (await axios.post(URLCompleta, {
            nome,
            dataInicio,
            preco, 
            descricao,
            urlLogo,
            urlSite, 
            endereco,
            cep,
            cidade, 
            estado, 
            numero,
            categorias
        })).data

             // Obtém a lista atualizada de eventos após o cadastro
             const eventos = response.data;       

        exibirAlerta('.alert-evento', 'Evento cadastrado com sucesso', ['show',
            'alert-success'], ['d-none'], 2000)
                 
        } catch(error) {
             // Caso ocorra um erro ao cadastrar
             console.error(error);
             exibirAlerta('.alert-evento', 'Erro ao cadastrar evento', ['show', 'alert-danger'], ['d-none'], 2000);
        }
    }
    //senão, exibe o alerta por até 2 segundos
    else {
        exibirAlerta('.alert-evento', 'Preencha todos os campos', ['show','alert-danger'], ['d-none'], 2000)
    }
}

const GEMINI_KEY = "AIzaSyD1awN-5c-tyrkM-TqXJkPYdcX5DuVJkDQ";
  
async function gerarNome(categoria) {
    try {
        const response = await axios.post(
           ` https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                          text: `Apresente um unico nome criativo e chamativo com base na categoria: "${categoria}" do evento. Não precisa utilizar caracteres especiais no texto, como #, **, etc.`
                            }
                        ]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );
  
        console.log("API Response:", response.data);
  
        const nome = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
  
        return nome || "Nome não gerado";
    } catch (error) {
        console.error("Erro ao gerar o nome do evento:", error.response?.data || error.message);
        return "";
    }
}

async function gerarDescricao(categoria) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `Apresente uma descrição criativa e chamativa com base na categoria: "${categoria}" do evento. Não precisa utilizar caracteres especiais no texto, como #, **, etc.`
                            }
                        ]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );
  
        console.log("API Response:", response.data);
  
        const descricao = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  
        return descricao || "Descrição não gerada";
    } catch (error) {
        console.error("Erro ao gerar a descrição do evento:", error.response?.data || error.message);
        return "";
    }
}

async function gerarValor(categoria) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `Apresente um preço consideravel para a entrada com base na categoria: "${categoria}" do evento. Não precisa utilizar caracteres e caracteres especiais no texto, como #, **, etc. Utilize numeros`
                            }
                        ]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );
  
        console.log("API Response:", response.data);
  
        const descricao = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  
        return descricao || "Descrição não gerada";
    } catch (error) {
        console.error("Erro ao gerar a descrição do evento:", error.response?.data || error.message);
        return "";
    }
}

  
async function gerarNomeDescricaoValor() {
    const categoria = document.getElementById("categoriaInput").value;
    const descricao = document.getElementById("descricaoInput");
    const nome = document.getElementById("nomeEventoInput")
    const valor = document.getElementById("precoInput")
  
    if (!categoria) {
        alert("Preencha a categoria do evento antes de gerar seu nome, descrição ou valor.");
        return;
    }
  
    alert("Gerando informações do evento");
    const novoNome = await gerarNome(categoria);
    const novaDescricao = await gerarDescricao(categoria);
    const novoValor = await gerarValor(categoria);


    if (novaDescricao && novoNome && novoValor) {
        descricao.value = novaDescricao; 
        nome.value = novoNome; 
        valor.value = novoValor;

    } else {
        alert("Erro ao gerar informações.");
    }
}

document.getElementById("btn-gerar-info").addEventListener("click", gerarNomeDescricaoValor);
 