// Buscando perguntas no JSON:
async function loadQuestions() {
    try {
        const response = await fetch('./questions.json'); // Busca o arquivo JSON
        if (!response.ok) throw new Error('Erro ao carregar as perguntas');
        
        const questions = await response.json(); // Converte para objeto JS
        console.log(questions); // Exibe as perguntas no console para conferir
        createQuestions(questions);

    } catch (error) {
        console.error('Erro:', error);
    }
}

// Criando as perguntas no DOM:
function createQuestions(questionsLoaded) {
    let totalquestions = questionsLoaded.length;
    // console.log(totalquestions);

    for (let c = 0; c < totalquestions; c++) {
        let section = createSection();
        let h3 = createH3(questionsLoaded[c].name);
        let divQuestion = createDivQuestion(questionsLoaded[c].body);
        let divResponse = createDivResponse(questionsLoaded[c].alternatives, c);

        section.appendChild(h3);
        section.appendChild(divQuestion);
        section.appendChild(divResponse)
        console.log(section);

        createQuestionsDOM(section);
    }
}

loadQuestions();

function createSection() {
    let section = document.createElement("section");
    section.setAttribute("class", "questions");
    // console.log(section);
    return section;
}

function createH3(name) {
    let h3 = document.createElement("h3");
    h3.innerHTML = name;
    // console.log(h3);
    return h3;
}

function createDivQuestion(body) {
    let divQuestion = document.createElement("div");
    divQuestion.setAttribute("class", "question");
    // console.log(divQuestion);

    let p = document.createElement("p");
    p.innerHTML = body;
    // console.log(p);

    divQuestion.appendChild(p);
    // console.log(divQuestion);
    return divQuestion;
}

function createDivResponse(alternatives, i) {
    let divResponse = document.createElement("div");
    divResponse.setAttribute("class", "response");
    // console.log(divResponse);

    let form = document.createElement("form");
    // console.log(form);

    for (let c = 0; c < alternatives.length; c++) {
        let divFormGroup = document.createElement("div");
        divFormGroup.setAttribute("class", "form-group");
        // console.log(divFormGroup);

        let input = createInput(i, c);
        let label = createLabels(alternatives, c, i);

        divFormGroup.appendChild(input);
        divFormGroup.appendChild(label);
        form.appendChild(divFormGroup);
    }

    divResponse.appendChild(form);
    // console.log(divResponse);
    return divResponse;
}

function createInput(index, count) {
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "question" + index);
    input.setAttribute("id", "question" + count + "alt" + index);
    // console.log(input);
    return input;
}

function createLabels(alternatives, count, index) {
    let label = document.createElement("label");
    label.setAttribute("for", "question" + count + "alt" + index);
    label.innerHTML = alternatives[count];
    // console.log(label);
    return label;
}

function createQuestionsDOM(question) {
    const main = document.querySelector('main');
    main.appendChild(question);
}
