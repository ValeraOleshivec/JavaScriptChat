const messages = document.querySelector('section')
const input =document.querySelector('#sendMessage')
const name = document.querySelector('#CurrentName')
const send = document.querySelector('.SendMessage')
const socket = io();
const signIn=document.querySelector('.signIn')
const signInButton = document.querySelector('#sign')
const mainPage=document.querySelector('#mainPage')
let userName='';
const randomNoun=['environment',
    'worker',
    'tale',
    'collection',
    'river',
    'reflection',
    'replacement',
    'photo',
    'assumption',
    'examination',
    'skill',
    'housing',
    'week',
    'friendship',
    'procedure',
    'night',
    'restaurant',
    'person',
    'surgery',
    'society',
    'gene',
    'debt',
    'map',
    'effort',
    'wife',
    'conclusion',
    'health',
    'selection',
    'guest',
    'beer',
    'medicine',
    'anxiety',
    'bathroom',
    'wealth',
    'government',
    'thought',
    'entry',
    'introduction',
    'television',
    'product',
    'politics',
    'director',
    'relationship',
    'driver',
    'extent',
    'youth',
    'inflation',
    'bath',
    'poet',
    'reputation']
const randomAdjective=['exultant',
    'burly',
    'perfect',
    'daffy',
    'lovely',
    'rapid',
    'vulgar',
    'pricey',
    'clumsy',
    'amazing',
    'murky',
    'hulking',
    'puny',
    'cuddly',
    'male',
    'panicky',
    'unadvised',
    'stiff',
    'grandiose',
    'valuable',
    'mental',
    'weary',
    'dusty',
    'fearless',
    'literate',
    'astonishing',
    'inquisitive',
    'second-hand',
    'neighborly',
    'messy',
    'earthy',
    'better',
    'shiny',
    'vast',
    'early',
    'habitual',
    'unused',
    'gigantic',
    'obese',
    'agonizing',
    'grumpy',
    'strong',
    'nonchalant',
    'protective',
    'cooing',
    'loud',
    'puzzled',
    'regular',
    'jagged',
    'luxuriant',
]
let arrayAvatar = []
const image =document.querySelectorAll('.Image')
let cardList = document.querySelector('.CardList')

let promise = fetch('https://64ed912a1f87218271416407.mockapi.io/People').then((res)=>{
    return res.json()
        .then((res)=>{
            arrayAvatar=res;
            console.log()
        })
})
let arrayUsers=[]
let arrayMessages=[]
let Avatar

socket.on('array',(value)=>{
    arrayMessages=value.array
    console.log(value.name)
    arrayUsers=value.users
    console.log(arrayUsers,'Привет')
})
let current = []


signInButton.addEventListener('click',(e)=>{
    Object.entries(arrayUsers).forEach((value=>{
        current = {...value}
        current = current[1];
        console.log('Я работаю')
        !document.getElementById(current.id)? (cardList.insertAdjacentHTML('afterbegin',`<div class="card" id="${current.id}">
                    <div class="Image">
                        <img src="${current.avatar}" alt="src" class="Avatar">
                    </div>
                    <div class="TextBlock">
                        <p class="Name" id="LeftName">${current.name}</p>
                        <p class="LastMessage">Hey, how's it going?</p>
                    </div>
                </div>`)):""
    }))
    arrayMessages.forEach((value)=>{
        let div =document.createElement('div')
        div.className= 'someOneMessage'
        div.innerHTML=value
        messages.append(div)
    })
    signIn.classList.remove('signIn')
    signIn.classList.add('none')
    mainPage.classList.remove('none')
    mainPage.classList.add('block')
    let Noun = randomNoun[Math.floor(Math.random()*randomNoun.length)];
    let Adjective=randomAdjective[Math.floor(Math.random()*randomAdjective.length)];
    userName=`${Adjective.charAt(0).toUpperCase()+Adjective.slice(1)} ${Noun}`
    name.innerHTML=`${Adjective.charAt(0).toUpperCase()+Adjective.slice(1)} ${Noun}`
    Avatar = arrayAvatar[Math.floor(Math.random()*arrayAvatar.length)].imageUrl
    sessionStorage.setItem('name',userName)
    image.forEach((value=>{
        value.innerHTML=`<img class="Avatar" src="${Avatar}" alt="">`
    }))
    socket.emit('send userName',{name:userName,avatar:Avatar})
})

const header = document.querySelector('header')


send.addEventListener('click',((e)=>{
    socket.emit('send message',{value:input.value})
    input.value=''
}))
socket.on('add message',(value)=>{

    let div =document.createElement('div')
    div.className= value.name === sessionStorage.getItem('name') ? 'myMessage' : 'someOneMessage'
    div.innerHTML=value.message
    messages.append(div)
    console.log(value.userId)
})
socket.on('pushArray',(array)=>{
    arrayMessages=array.array;
})
socket.on('get userName',(data)=>{
    arrayUsers=data.users
    console.log(Boolean(!document.getElementById(data.id)))
    console.log('И я работаю')
    cardList.insertAdjacentHTML('afterbegin',`<div class="card" id="${data.id}">
                    <div class="Image">
                        <img src="${arrayUsers[data.id].avatar}" alt="src" class="Avatar">
                    </div>
                    <div class="TextBlock">
                        <p class="Name" id="LeftName">${data.Name}</p>
                        <p class="LastMessage">Hey, how's it going?</p>
                    </div>
                </div>`)

})
socket.on('remove User',(user)=>{
    console.log(user)
    document.getElementById(user.id).remove()
})

