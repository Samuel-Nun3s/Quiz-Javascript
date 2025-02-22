# 📝 Quiz Interativo em JavaScript

Um quiz dinâmico criado com HTML, CSS e JavaScript, onde as perguntas são carregadas a partir de um arquivo JSON. No final, o usuário recebe um feedback com a porcentagem de acertos e as respostas corretas. 

# 📌 Funcionalidades

- ✔ Carregamento dinâmico de perguntas do questions.json
- ✔ Validação para garantir que todas as perguntas sejam respondidas
- ✔ Cálculo automático da pontuação e exibição da porcentagem de acertos
- ✔ Destaque visual nas respostas corretas e erradas
- ✔ Marcação das respostas corretas com ✅ no final do quiz

# 🚀 Tecnologias Utilizadas

- HTML5

- CSS3

- JavaScript (ES6)

# 📝 Como Usar

- Clone este repositório:

- git clone https://github.com/seu-usuario/nome-do-repositorio.git

- Abra a pasta do projeto:

- cd nome-do-repositorio

- Inicie um servidor local (requerido para carregar o JSON corretamente):

- VS Code: Use a extensão Live Server

- Python: Rode o comando:

- python -m http.server

- Acesse http://localhost:8000 no navegador.

# 🛠 Personalização

As perguntas podem ser editadas no arquivo questions.json, seguindo a estrutura:

```bash
[
  {
    "id": 1,
    "name": "Qual é a capital da França?",
    "body": "Escolha a alternativa correta:",
    "alternatives": ["Londres", "Paris", "Berlim"],
    "right_alternative": 1
  }
]
```

# 🏆 Contribuição

## Sinta-se à vontade para contribuir! Basta seguir estes passos:

- Faça um fork do repositório.

- Crie uma branch:

- git checkout -b minha-feature

- Faça suas alterações e commite:

- git commit -m "Adicionando nova funcionalidade"

- Envie para o GitHub:

- git push origin minha-feature

- Abra um Pull Request 🚀

# 📄 Licença

- Este projeto está sob a licença MIT.

