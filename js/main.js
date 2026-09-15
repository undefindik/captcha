import createNotification from "./modules/notification.js"


window.addEventListener('load', () => {
    document.querySelector('.preloader')?.classList.add('hidden')
})


const captcha = document.querySelector('#captcha')
const form = document.querySelector('.captcha-form')
const captchaField = document.querySelector('#captcha-field')
const captchaChange = document.querySelector('#captcha-change')

let code = ''
updateCode()

const propsNotification = {
    type: 'success',
    icon: './img/success.svg',
    title: 'Успешно',
    subtitle: 'Проверка на робота пройдена.'
}

form.addEventListener('submit', function(e) {
    e.preventDefault()

    if (captchaField.value.trim() === code) {
        getNotificationType('success')
        createNotification(propsNotification)
    } else if (captchaField.value.trim() !== code && captchaField.value.trim().length > 0) {
        getNotificationType('error')
        createNotification(propsNotification)
        updateCode()
    } else if (captchaField.value.trim().length <= 0) {
        getNotificationType('warning')
        createNotification(propsNotification)
    }
})

captchaChange.addEventListener('click', function() {
    getNotificationType('info')
    createNotification(propsNotification)
    updateCode()
})

window.addEventListener('click', (event) => {
    if (event.target.closest('.notification__close')) {
        const parentNode = event.target.closest('.notification')
        parentNode.remove()
    }
})

window.addEventListener('selectstart', (event) => event.preventDefault())


function getNotificationType (type) {
    switch(type) {
        case 'success':
            propsNotification.type = type
            propsNotification.icon = './img/success.svg'
            propsNotification.title = 'Успешно'
            propsNotification.subtitle = 'Проверка на робота пройдена.'
            break
        case 'error':
            propsNotification.type = type
            propsNotification.icon = './img/error.svg'
            propsNotification.title = 'Ошибка'
            propsNotification.subtitle = 'Вы не прошли проверку на робота. Попробуйте еще раз.'
            break
        case 'warning':
            propsNotification.type = type
            propsNotification.icon = './img/warning.svg'
            propsNotification.title = 'Предупреждение'
            propsNotification.subtitle = 'Вы не заполнили поле "Текст с картинки". Попробуйте еще раз'
            break
        case 'info':
            propsNotification.type = type
            propsNotification.icon = './img/info.svg'
            propsNotification.title = 'Информация'
            propsNotification.subtitle = 'Капча была обновлена.'
            break
    }
}

function generateCode (length = 8) {
    const english = 'abcdefghijklmnopqrstuvwxyz'
    const digits = '0123456789'

    const allChars = english + english.toUpperCase() + digits

    let code = '';
    for (let i = 0; i < length; i++) {
        const randomChar = Math.floor(Math.random() * allChars.length)
        code += allChars[randomChar]
    }

    return code
}

function updateCode () {
    code = generateCode()
    captcha.textContent = code
}
