document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
});
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // To-Do List
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-items');

    if (todoInput && addTodoButton && todoList) {
        addTodoButton.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        function addTodo() {
            const todoText = todoInput.value.trim();
            if (todoText) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${todoText}</span>
                    <button class="delete-todo"><i class="fas fa-trash"></i></button>
                `;
                todoList.appendChild(li);
                todoInput.value = '';

                li.querySelector('.delete-todo').addEventListener('click', () => {
                    li.classList.add('fade-out');
                    setTimeout(() => todoList.removeChild(li), 300);
                });
            }
        }
    }

    // Weather App
    const cityInput = document.getElementById('city-input');
    const getWeatherButton = document.getElementById('get-weather');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');

    if (cityInput && getWeatherButton && weatherInfo && errorMessage) {
        getWeatherButton.addEventListener('click', getWeather);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                getWeather();
            }
        });

        async function getWeather() {
            const city = cityInput.value.trim();
            if (city) {
                try {
                    weatherInfo.textContent = 'Loading...';
                    errorMessage.textContent = '';

                    const apiKey = '6c1a93477690e580e5fba352e1246013';
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    weatherInfo.innerHTML = `
                        <h4>${data.name}, ${data.sys.country}</h4>
                        <p><i class="fas fa-temperature-high"></i> Temperature: ${data.main.temp}°C</p>
                        <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].description}</p>
                        <p><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</p>
                    `;
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    errorMessage.textContent = `Error fetching weather data: ${error.message}`;
                    weatherInfo.textContent = '';
                }
            } else {
                errorMessage.textContent = 'Please enter a city name.';
                weatherInfo.textContent = '';
            }
        }
    }

    // Quiz Game
    const quizData = [
        {
            question: "What is the capital of France?",
            choices: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Jupiter", "Venus", "Saturn"],
            correctAnswer: 0
        },
        {
            question: "What is 2 + 2?",
            choices: ["3", "4", "5", "6"],
            correctAnswer: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const submitButton = document.getElementById('submit-answer');
    const resultElement = document.getElementById('result');

    if (questionElement && choicesElement && submitButton && resultElement) {
        function loadQuestion() {
            const question = quizData[currentQuestion];
            questionElement.textContent = question.question;
            choicesElement.innerHTML = '';
            question.choices.forEach((choice, index) => {
                choicesElement.innerHTML += `
                    <label>
                        <input type="radio" name="quiz" value="${index}">
                        ${choice}
                    </label>
                `;
            });
        }

        submitButton.addEventListener('click', () => {
            const selectedChoice = document.querySelector('input[name="quiz"]:checked');
            if (selectedChoice) {
                const answer = parseInt(selectedChoice.value);
                if (answer === quizData[currentQuestion].correctAnswer) {
                    score++;
                    resultElement.textContent = "Correct!";
                    resultElement.style.color = "green";
                } else {
                    resultElement.textContent = "Wrong. The correct answer was: " + quizData[currentQuestion].choices[quizData[currentQuestion].correctAnswer];
                    resultElement.style.color = "red";
                }
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    setTimeout(() => {
                        loadQuestion();
                        resultElement.textContent = "";
                    }, 1500);
                } else {
                    setTimeout(() => {
                        questionElement.textContent = `Quiz completed! Your score: ${score}/${quizData.length}`;
                        choicesElement.innerHTML = '';
                        submitButton.style.display = 'none';
                        resultElement.textContent = "";
                    }, 1500);
                }
            }
        });

        loadQuestion();
    }

    // Password Generator
    const passwordLength = document.getElementById('password-length');
    const useLetters = document.getElementById('use-letters');
    const useNumbers = document.getElementById('use-numbers');
    const useSymbols = document.getElementById('use-symbols');
    const generatePasswordButton = document.getElementById('generate-password');
    const generatedPassword = document.getElementById('generated-password');
    const passwordError = document.getElementById('password-error');

    if (passwordLength && useLetters && useNumbers && useSymbols && generatePasswordButton && generatedPassword && passwordError) {
        generatePasswordButton.addEventListener('click', generatePassword);

        function generatePassword() {
            const length = parseInt(passwordLength.value);
            const useLet = useLetters.checked;
            const useNum = useNumbers.checked;
            const useSym = useSymbols.checked;

            if (isNaN(length) || length <= 0) {
                passwordError.textContent = "Please enter a valid password length.";
                generatedPassword.textContent = "";
                return;
            }

            if (!useLet && !useNum && !useSym) {
                passwordError.textContent = "Please select at least one character type.";
                generatedPassword.textContent = "";
                return;
            }

            passwordError.textContent = "";

            let chars = "";
            if (useLet) chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (useNum) chars += "0123456789";
            if (useSym) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

            let password = "";
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            generatedPassword.textContent = `Generated Password: ${password}`;
        }
    }

    // Animated skill bars
    const skillItems = document.querySelectorAll('.skill-item');
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkills, {
        root: null,
        threshold: 0.5
    });

    skillItems.forEach(item => skillObserver.observe(item));
});