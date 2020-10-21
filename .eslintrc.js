module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {

  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: [2, 'single'], // 必须使用单引号
    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
    'no-empty': 2, // 禁止空语句块
    'strict': 2, // 使用严格模式
    'no-var': 2, // 禁用var，用let和const代替
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-implicit-coercion': 2, // 禁止隐式转换
    'no-else-return': 2, // 如果if语句里面有return,后面不能跟else语句
    'no-extra-semi': 2, // 禁止不必要的分号
    'no-redeclare': 2, // 禁止重复声明变量
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-trailing-spaces': 2, // 一行结束后面不要有空格
    'no-inner-declarations': [2, 'functions'], // 禁止在嵌套的块中出现 function 或 var 声明
    'no-invalid-regexp': 2, // 禁止 RegExp 构造函数中无效的正则表达式字符串
    'no-irregular-whitespace': 2, // 禁止在字符串和注释之外不规则的空白
    'no-unexpected-multiline': 2, // 禁止出现令人困惑的多行表达式
    'block-scoped-var': 2, // 强制把变量的使用限制在其定义的作用域范围内
    eqeqeq: [2, 'allow-null'], // 使用 === 替代 == allow-null允许null和undefined==
    'no-empty-function': 2, // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
    'no-implicit-globals': 1, // 禁止在全局范围内使用 var 和命名的 function 声明
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-multiple-empty-lines': [2, {'max': 2}], // 空行最多不能超过2行
    'init-declarations': 2, // 要求或禁止 var 声明中的初始化(初值)
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef-init': 2, // 禁止将变量初始化为 undefined
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-unused-vars': ['error', {'vars': 'all', 'args': 'after-used'}], // 不能有声明后未被使用的变量或参数
    'no-use-before-define': [2, { 'functions': false, 'classes': false, 'variables': false }], // 不允许在变量定义之前使用它们
    'array-bracket-spacing': [2, 'never'], // 禁止非空数组里面有多余的空格
    'block-spacing': [2, 'never'], // 禁止或强制在单行代码块中使用空格(禁用)
    'comma-dangle': [2, 'never'], // 对象字面量项尾不能有逗号
    'comma-style': [2, 'last'], // 逗号风格，换行时在行首还是行尾
    'comma-spacing': [ // 控制逗号前后的空格
      2,
      {
        before: false,
        after: true
      }
    ],
    'lines-around-comment': [ // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
      2,
      {
        beforeBlockComment: false
      }
    ],
    semi: [2, 'always'], // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    'space-before-function-paren': ['error', 'never'], // 函数定义时括号前面要不要有空格
    'dot-notation': [0, { 'allowKeywords': true }], // 避免不必要的方括号
    'semi-spacing': [2, {'before': false, 'after': false}], // 分号前后空格
    'spaced-comment':['error', 'always'], // 注释前必须有空格
    'space-in-parens': ['error', 'never'], // 禁止圆括号有空格，如Test( 2, 3 )
    'space-infix-ops': 'error', // 在操作符旁边必须有空格， 如 a + b而不是a+b
    'space-before-blocks': ['error', 'always'], // 语句块之前必须有空格 如 ) {}
    'arrow-body-style': ['error', 'always'], // 要求箭头函数必须有大括号 如 a => {}
    'arrow-spacing': ['error', { 'before': true, 'after': true }], // 定义箭头函数的箭头前后都必须有空格
    'no-const-assign': 'error', // 禁止修改const变量
    'template-curly-spacing': ['error', 'never'], // 禁止末班字符串中的{}中的变量出现空格，如以下错误`${ a }`
    'no-whitespace-before-property': 'error', // 禁止属性前有空格，如obj. a
    'keyword-spacing':['error', {'before': true, 'after': true}], // 关键字前后必须有空格 如 } else {
    'no-param-reassign': 2, // 禁止给参数重新赋值
    'no-extra-bind': 2, // 不允许不必要的函数绑定
    'no-shadow-restricted-names': 2, // js关键字和保留字不能作为函数名或者变量名
    'no-unused-expressions': 2 // 禁止无用的表达式
  }
};
