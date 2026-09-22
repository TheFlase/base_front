// ==================== Calculator 类 ====================
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    // 清除所有数据
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    // 删除最后一位数字
    delete() {
        if (this.shouldResetScreen) {
            this.clear();
            return;
        }
        
        if (this.currentOperand === '0') return;
        
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    // 添加数字
    appendNumber(number) {
        // 如果需要重置屏幕，清除当前操作数
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        // 如果当前是 0，直接替换（除非输入的是小数点）
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
            return;
        }
        
        // 防止多个小数点
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // 限制数字长度
        if (this.currentOperand.length >= 15) return;
        
        this.currentOperand += number.toString();
    }

    // 选择运算符
    chooseOperation(operation) {
        // 如果当前操作数为空，只更新运算符
        if (this.currentOperand === '') {
            if (this.previousOperand !== '') {
                this.operation = operation;
                return;
            }
            return;
        }
        
        // 如果之前有操作数，先计算结果
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // 执行计算
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        // 检查是否为有效数字
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.showError();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // 限制小数位数
        this.currentOperand = this.roundNumber(computation).toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    // 百分比转换
    percentage() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        this.currentOperand = (current / 100).toString();
        this.shouldResetScreen = true;
    }

    // 四舍五入并处理精度问题
    roundNumber(num) {
        return Math.round(num * 100000000) / 100000000;
    }

    // 显示错误
    showError() {
        this.currentOperand = '错误';
        this.previousOperand = '';
        this.operation = undefined;
        
        // 添加错误动画
        const display = document.querySelector('.display');
        display.classList.add('error');
        setTimeout(() => {
            display.classList.remove('error');
            this.clear();
            this.updateDisplay();
        }, 1000);
    }

    // 格式化显示数字
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        
        // 处理错误信息
        if (stringNumber === '错误') return stringNumber;
        
        // 处理空字符串
        if (stringNumber === '') return '';
        
        // 分割整数和小数部分
        const parts = stringNumber.split('.');
        const integerPart = parseFloat(parts[0]);
        
        if (isNaN(integerPart)) return '';
        
        let integerDisplay = integerPart.toLocaleString('zh-CN', {
            maximumFractionDigits: 0
        });
        
        // 如果有小数部分
        if (parts.length > 1) {
            return `${integerDisplay}.${parts[1]}`;
        } else {
            return integerDisplay;
        }
    }

    // 更新显示
    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            const operatorSymbols = {
                '+': '+',
                '-': '−',
                '*': '×',
                '/': '÷'
            };
            
            this.previousOperandElement.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${operatorSymbols[this.operation]}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

// ==================== 初始化计算器 ====================
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// ==================== 按钮事件处理 ====================
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');
const percentButton = document.querySelector('[data-action="percent"]');
const decimalButton = document.querySelector('[data-action="decimal"]');

// 数字按钮
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
        addButtonAnimation(button);
    });
});

// 运算符按钮
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
        addButtonAnimation(button);
        highlightOperator(button);
    });
});

// 等号按钮
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
    addButtonAnimation(equalsButton);
    removeOperatorHighlight();
});

// 删除按钮
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
    addButtonAnimation(deleteButton);
});

// 清除按钮
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
    addButtonAnimation(clearButton);
    removeOperatorHighlight();
});

// 百分比按钮
percentButton.addEventListener('click', () => {
    calculator.percentage();
    calculator.updateDisplay();
    addButtonAnimation(percentButton);
});

// 小数点按钮
decimalButton.addEventListener('click', () => {
    calculator.appendNumber('.');
    calculator.updateDisplay();
    addButtonAnimation(decimalButton);
});

// ==================== 键盘支持 ====================
document.addEventListener('keydown', (e) => {
    // 数字键
    if (e.key >= 0 && e.key <= 9) {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
        const button = document.querySelector(`[data-number="${e.key}"]`);
        if (button) addButtonAnimation(button);
    }
    
    // 运算符
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
        const button = document.querySelector(`[data-operator="${e.key}"]`);
        if (button) {
            addButtonAnimation(button);
            highlightOperator(button);
        }
    }
    
    // 小数点
    if (e.key === '.') {
        calculator.appendNumber('.');
        calculator.updateDisplay();
        addButtonAnimation(decimalButton);
    }
    
    // 等号或 Enter
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
        addButtonAnimation(equalsButton);
        removeOperatorHighlight();
    }
    
    // 删除键
    if (e.key === 'Backspace') {
        e.preventDefault();
        calculator.delete();
        calculator.updateDisplay();
        addButtonAnimation(deleteButton);
    }
    
    // 清除键
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
        addButtonAnimation(clearButton);
        removeOperatorHighlight();
    }
    
    // 百分比
    if (e.key === '%') {
        calculator.percentage();
        calculator.updateDisplay();
        addButtonAnimation(percentButton);
    }
});

// ==================== 辅助函数 ====================
// 添加按钮按下动画
function addButtonAnimation(button) {
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
}

// 高亮运算符
function highlightOperator(button) {
    removeOperatorHighlight();
    button.classList.add('active');
}

// 移除运算符高亮
function removeOperatorHighlight() {
    operatorButtons.forEach(button => {
        button.classList.remove('active');
    });
}

// ==================== 初始化 ====================
calculator.updateDisplay();
console.log('计算器已加载！');
console.log('支持键盘输入：数字、运算符、Enter(=)、Backspace(删除)、Escape(清除)');

