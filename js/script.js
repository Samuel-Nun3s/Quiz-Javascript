// ------------------------ Buscando perguntas no JSON ------------------------
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

// ------------------------ Cria as perguntas no DOM ------------------------
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
    form.setAttribute("class", "forms");
    // console.log("Form de resposta: ", form);

    for (let c = 0; c < alternatives.length; c++) {
        let divFormGroup = document.createElement("div");
        divFormGroup.setAttribute("class", "form-group");
        // console.log("Div form-group: ", divFormGroup);

        let input = createInput(i, c);
        let label = createLabels(c, i);

        let span = document.createElement("span");

        label.appendChild(input);
        label.appendChild(span);
        label.innerHTML += alternatives[c];
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
    input.setAttribute("value", count);
    // console.log("Input da resposta: ", input);
    return input;
}

// Cria as labels das respostas:
function createLabels(count, index) {
    let label = document.createElement("label");
    label.setAttribute("for", "question" + count + "alt" + index);
    label.setAttribute("class", "custom-radio");
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

// ------------------------ Logica do QUIZ ------------------------
// Coleta as respostas certas:
var questions = [];
var responses = [];

function setResponses(id, rightAlt) {
    let question = {
        id: id,
        right_alternative: rightAlt
    };

    // console.log("Objeto da questao com a resposta certa: ", question);

    questions.push(question);
    // console.log("Array das respostas certas", questions);
}

// Botao de Finalizar:
document.getElementById('finalizarQuiz').addEventListener('click', () => {
    const responsesQuestions = document.querySelectorAll('.forms');
    // console.log("Perguntas: ", perguntas);
    let allAnswered = true;

    responsesQuestions.forEach((question, index) => {
        const name = question.querySelector('input[type="radio"]').name;
        // console.log("Name: ", name);
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        // console.log("Selecionado: ", selected);

        if (selected) {
            let selectedAnswers= {
                question: selected.id,
                selected_alternative: selected.value
            }
            responses.push(selectedAnswers);
            // console.log("Array de respostas: ",responses);
            // console.log("ResponsesQuestions: ", responsesQuestions);
        } else {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        alert("Por favor, responda todas as perguntas antes de finalizar.");
        return allAnswered = true;
    }

    calculateAccuracies();
});

// Calculando os acertos: 
function calculateAccuracies() {
    console.log("Array de questoes para o calculo: ", questions);
    console.log("Array de respostas para o calculo: ", responses);

    let totalHits = 0;
    let percentageOfHits = 0;

    for (let c = 0; c < questions.length; c++) {
        // console.log("Alternativa certa: ", questions[c].right_alternative);
        // console.log("Alternativa selecionada: ", responses[c].selected_alternative);

        if (questions[c].right_alternative == responses[c].selected_alternative) {
            totalHits += 1;
            console.log("Conteudo da variavel questions: ", questions[c].id);

            const section = document.querySelector(`#section${c}`);
            section.style.border = "2px solid green";
        } else {
            const section = document.querySelector(`#section${c}`);
            section.style.border = "2px solid red";
        }


    }

    percentageOfHits = ((totalHits / questions.length) * 100).toFixed(2);
    console.log("Total de acertos: ", totalHits);
    console.log("Porcentagem de acertos: ", percentageOfHits + "%");
    markCorrectAnswers(); // Adiciona os emojis ✅
    showResult(totalHits, questions.length, percentageOfHits);
}

// Mostrar o resultado:
function showResult(totalHits, totalquestions, percent) {
    let score = document.querySelector('#score');
    score.classList.toggle('hidden');

    let spanTotal = document.querySelector('#totalResults');
    spanTotal.innerHTML = `${totalHits}/${totalquestions}`;

    let spanPercent = document.querySelector('#percentResults');
    spanPercent.innerHTML = percent;
}

document.querySelector('#replyAgain').addEventListener('click', () => {
    location.reload();
});

// Adicionar emoji nas alternativas certas:
function markCorrectAnswers() {
    questions.forEach((question, index) => {
        const correctAnswerId = `question${question.right_alternative}alt${index}`;
        const correctLabel = document.querySelector(`label[for="${correctAnswerId}"]`);

        if (correctLabel) {
            correctLabel.innerHTML += " ✅";
        }
    });
}
