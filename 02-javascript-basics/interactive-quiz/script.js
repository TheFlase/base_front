// 题目数据
const quizData = [
    {
        question: "JavaScript 是哪种类型的编程语言？",
        answers: ["编译型", "解释型", "汇编语言", "机器语言"],
        correct: 1
    },
    {
        question: "以下哪个关键字用于声明常量？",
        answers: ["var", "let", "const", "constant"],
        correct: 2
    },
    {
        question: "typeof null 的返回值是什么？",
        answers: ["'null'", "'undefined'", "'object'", "'number'"],
        correct: 2
    },
    {
        question: "== 和 === 的区别是什么？",
        answers: ["没有区别", "=== 不会进行类型转换", "== 更严格", "=== 速度更慢"],
        correct: 1
    },
    {
        question: "数组的 push() 方法做什么？",
        answers: ["删除第一个元素", "添加元素到开头", "添加元素到末尾", "删除最后一个元素"],
        correct: 2
    },
    {
        question: "以下哪个不是 JavaScript 的数据类型？",
        answers: ["String", "Boolean", "Float", "Symbol"],
        correct: 2
    },
    {
        question: "如何声明一个函数？",
        answers: ["function myFunc() {}", "func myFunc() {}", "def myFunc() {}", "function:myFunc() {}"],
        correct: 0
    },
    {
        question: "console.log(1 + '1') 的输出是什么？",
        answers: ["2", "'11'", "11", "undefined"],
        correct: 1
    },
    {
        question: "以下哪个方法用于移除数组的最后一个元素？",
        answers: ["shift()", "pop()", "remove()", "delete()"],
        correct: 1
    },
    {
        question: "NaN 表示什么？",
        answers: ["Null and Null", "Not a Number", "New and Number", "Number and Null"],
        correct: 1
    }
];

// 游戏状态
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let selectedAnswer = null;

// DOM 元素
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const reviewBtn = document.getElementById('reviewBtn');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const questionNumber = document.getElementById('questionNumber');
const currentScoreEl = document.getElementById('currentScore');
const progressFill = document.getElementById('progressFill');

// 初始化
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', () => alert('查看答案功能可以在这里实现！'));

// 开始问答
function startQuiz() {
    showScreen('quiz');
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    loadQuestion();
}

// 加载问题
function loadQuestion() {
    selectedAnswer = null;
    const question = quizData[currentQuestion];
    
    questionEl.textContent = question.question;
    questionNumber.textContent = `问题 ${currentQuestion + 1} / ${quizData.length}`;
    currentScoreEl.textContent = score;
    
    // 更新进度条
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // 渲染答案选项
    answersEl.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersEl.appendChild(button);
    });
    
    nextBtn.style.display = 'none';
}

// 选择答案
function selectAnswer(index) {
    if (selectedAnswer !== null) return; // 已经选择过了
    
    selectedAnswer = index;
    const question = quizData[currentQuestion];
    const buttons = answersEl.querySelectorAll('.answer-btn');
    
    // 禁用所有按钮
    buttons.forEach(btn => btn.disabled = true);
    
    // 标记正确和错误答案
    buttons[question.correct].classList.add('correct');
    
    if (index === question.correct) {
        // 答对了
        correctAnswers++;
        score += 10;
        currentScoreEl.textContent = score;
        buttons[index].classList.add('correct');
        playSound('correct');
    } else {
        // 答错了
        wrongAnswers++;
        buttons[index].classList.add('wrong');
        playSound('wrong');
    }
    
    // 显示下一题按钮
    nextBtn.style.display = 'block';
}

// 下一题
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// 显示结果
function showResult() {
    showScreen('result');
    
    const finalScore = document.getElementById('finalScore');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultIcon = document.getElementById('resultIcon');
    const accuracy = document.getElementById('accuracy');
    
    finalScore.textContent = score;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('wrongAnswers').textContent = wrongAnswers;
    
    const accuracyPercent = Math.round((correctAnswers / quizData.length) * 100);
    accuracy.textContent = `${accuracyPercent}%`;
    
    // 根据分数显示不同的消息
    if (score === 100) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = '完美！';
        resultMessage.textContent = '恭喜你全部答对！你是 JavaScript 高手！';
    } else if (score >= 80) {
        resultIcon.textContent = '🎉';
        resultTitle.textContent = '太棒了！';
        resultMessage.textContent = '你的表现非常出色！继续保持！';
    } else if (score >= 60) {
        resultIcon.textContent = '😊';
        resultTitle.textContent = '不错！';
        resultMessage.textContent = '你已经掌握了基础知识，继续加油！';
    } else if (score >= 40) {
        resultIcon.textContent = '💪';
        resultTitle.textContent = '继续努力！';
        resultMessage.textContent = '还需要多多练习，你一定可以做得更好！';
    } else {
        resultIcon.textContent = '📚';
        resultTitle.textContent = '加油！';
        resultMessage.textContent = '多多学习和练习，下次一定会更好！';
    }
}

// 重新开始
function restartQuiz() {
    showScreen('quiz');
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    loadQuestion();
}

// 切换屏幕
function showScreen(screen) {
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    
    switch(screen) {
        case 'start':
            startScreen.classList.add('active');
            break;
        case 'quiz':
            quizScreen.classList.add('active');
            break;
        case 'result':
            resultScreen.classList.add('active');
            break;
    }
}

// 音效（模拟）
function playSound(type) {
    // 这里可以添加真实的音效
    if (type === 'correct') {
        console.log('✅ 正确！');
    } else {
        console.log('❌ 错误！');
    }
}

// 键盘支持
document.addEventListener('keydown', (e) => {
    if (quizScreen.classList.contains('active')) {
        // 1-4 键选择答案
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            const buttons = answersEl.querySelectorAll('.answer-btn');
            if (buttons[index] && selectedAnswer === null) {
                selectAnswer(index);
            }
        }
        
        // Enter 键下一题
        if (e.key === 'Enter' && nextBtn.style.display === 'block') {
            nextQuestion();
        }
    }
});

console.log('🎯 问答游戏已加载！');
console.log('💡 提示：可以使用数字键 1-4 快速选择答案');

