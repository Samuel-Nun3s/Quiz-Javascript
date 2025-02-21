//   Buscando perguntas no JSON:
async function loadQuestions() {
    try {
        const response = await fetch('./questions.json'); // Busca o arquivo JSON
        if (!response.ok) throw new Error('Erro ao carregar as perguntas');
        
        const questions = await response.json(); // Converte para objeto JS
        //console.log("Questoes retiradas do JSON: ", questions); // Exibe as perguntas no console para conferir
        createQuestions(questions);

    } catch (error) {
        console.error('Erro:', error);
    }
}

//   Cria as perguntas no DOM:
// Funcao principal de criacao:
function createQuestions(questionsLoaded) {
    let totalquestions = questionsLoaded.length;
    // console.log("Total de questoes: ", totalquestions);

    for (let c = 0; c < totalquestions; c++) {
        let section = createSection(questionsLoaded[c].id);
        let h3 = createH3(questionsLoaded[c].name);
        let divQuestion = createDivQuestion(questionsLoaded[c].body);
        let divResponse = createDivResponse(questionsLoaded[c].alternatives, c);
        setResponses(questionsLoaded[c].id, questionsLoaded[c].right_alternative.id)

        section.appendChild(h3);
        section.appendChild(divQuestion);
        section.appendChild(divResponse)
        // console.log("Estrutura da sessao: ", section);

        createQuestionsDOM(section);
    }
}

// Cria as sections:
function createSection(id) {
    let section = document.createElement("section");
    section.setAttribute("class", "questions");
    section.setAttribute("id", "section" + id)
    // console.log("Sessao: ", section);
    return section;
}

// Cria o H3:
function createH3(name) {
    let h3 = document.createElement("h3");
    h3.innerHTML = name;
    // console.log("H3: ", h3);
    return h3;
}

// Cria div do corpo da pergunta:
function createDivQuestion(body) {
    let divQuestion = document.createElement("div");
    divQuestion.setAttribute("class", "question");
    // console.log("Body da pergunta: ", divQuestion);

    let p = document.createElement("p");
    p.innerHTML = body;
    // console.log("Paragrafo da pergunta: ", p);

    divQuestion.appendChild(p);
    // console.log("Div de questao ja montada: ", divQuestion);
    return divQuestion;
}

// Cria div de respostas:
function createDivResponse(alternatives, i) {
    let divResponse = document.createElement("div");
    divResponse.setAttribute("class", "response");
    // console.log("Div de resposta: ", divResponse);

    let form = document.createElement("form");
    // console.log("Form de resposta: ", form);

    for (let c = 0; c < alternatives.length; c++) {
        let divFormGroup = document.createElement("div");
        divFormGroup.setAttribute("class", "form-group");
        // console.log("Div form-group: ", divFormGroup);

        let input = createInput(i, c);
        let label = createLabels(alternatives, c, i);

        divFormGroup.appendChild(input);
        divFormGroup.appendChild(label);
        form.appendChild(divFormGroup);
    }

    divResponse.appendChild(form);
    // console.log("Div de resposta ja montada: ", divResponse);
    return divResponse;
}

// Cria os inputs das respostas: 
function createInput(index, count) {
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "question" + index);
    input.setAttribute("id", "question" + count + "alt" + index);
    // console.log("Input da resposta: ", input);
    return input;
}

// Cria as labels das respostas:
function createLabels(alternatives, count, index) {
    let label = document.createElement("label");
    label.setAttribute("for", "question" + count + "alt" + index);
    label.innerHTML = alternatives[count];
    // console.log("Label da resposta: ", label);
    return label;
}

// Adiciona as taarefas ja criadas no DOM:
function createQuestionsDOM(question) {
    const main = document.querySelector('main');
    main.appendChild(question);
}

// Chama a funcao para carregar as perguntas do JSON:
loadQuestions();

//   Logica do QUIZ:
var questions = [];

function setResponses(id, rightAlt) {
    let question = {
        id: id,
        right_alternative: rightAlt
    };
    console.log("Objeto da questao com a resposta certa: ", question);

    questions.push(question);
    console.log("Array das respostas certas", questions);
}