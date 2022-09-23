var state = { quadro: [], jogoAtual:[], jogoSalvo:[]}

    

function start(){
   criarQuadro()
   renderNumeros()
   let jogoSalvoString = localStorage.getItem('jogoSalvo')
    if(JSON.parse(jogoSalvoString)){
        state.jogoSalvo = JSON.parse(jogoSalvoString)
        salvandoJogo()
    } else{
        state.jogoSalvo = []
    }
   
}

jogada = {
    l1: document.querySelector('#l1'),
    l2: document.querySelector('#l2'),
    l3: document.querySelector('#l3'),
    l4: document.querySelector('#l4'),
    l5: document.querySelector('#l5'),
    l6: document.querySelector('#l6'),   
}



function criarQuadro(){
    for( i =1; i <= 60; i++){
        state.quadro.push(i)
    }
}
function renderNumeros(){
    var divNumeros = document.querySelector('#megasena-numeros')
    divNumeros.innerHTML = ''

    var ulNumeros = document.createElement('ul')
    divNumeros.appendChild(ulNumeros)
   
     for( i=0; i<state.quadro.length; i++){
        
        var liNumeros = document.createElement('li')
        ulNumeros.appendChild(liNumeros)

        liNumeros.textContent = state.quadro[i]
        liNumeros.addEventListener('click', addNumeroaoJogo)
     }
   
}

function addNumeroaoJogo(event){
    
    

    if(typeof event == 'number' ){
        addNumero = event
    } else{
        addNumero = event.currentTarget.textContent
        
    }
 
    if(state.jogoAtual.length >= 6){
        alert('O jogo está completo')
        return;
    }    
    function numeroInserido(numeroParaChecar){  
       
        return state.jogoAtual.includes(numeroParaChecar);
    }
    if( numeroInserido(addNumero)){
        alert('Esté número já está no jogo')
        return;
    }

    state.jogoAtual.push(addNumero)
 
   numerosJogados()

}
function numerosJogados(){

    
    l1.textContent = state.jogoAtual[0]
    if( state.jogoAtual[0] != null){
        l1.classList.add('escolhido')
    } else{
        l1.classList.remove('escolhido')
    }
      
        l2.textContent = state.jogoAtual[1]
    if(state.jogoAtual[1] != null){
        l2.classList.add('escolhido')
    } else{
        l2.classList.remove('escolhido')
    }
    
        l3.textContent = state.jogoAtual[2]
    if(state.jogoAtual[2] != null){
        l3.classList.add('escolhido')
    } else{
        l3.classList.remove('escolhido')
    }

        l4.textContent = state.jogoAtual[3]
    if(state.jogoAtual[3] != null){
        jogada.l4.classList.add('escolhido')
    } else{
        l4.classList.remove('escolhido')
    }
    
        l5.textContent = state.jogoAtual[4]
    if(state.jogoAtual[4] != null){
        jogada.l5.classList.add('escolhido')
    } else {
        l5.classList.remove('escolhido')
    }
       
        l6.textContent = state.jogoAtual[5]
    if(state.jogoAtual[5] != null){
        jogada.l6.classList.add('escolhido')
    } else{
        l6.classList.remove('escolhido')
    }
}

function removerNumero(i){
    state.jogoAtual.splice(i, 1)
    numerosJogados()
}

function salvarJogo(){
    if(state.jogoAtual.length === 6){
        state.jogoSalvo.push(state.jogoAtual)
        state.jogoAtual = []
    } else {
        alert('Jogo Não pode ser salvo, pois está incompleto')
    }
    salvandoJogo()
}
function salvandoJogo(){
    divJogoSalvo = document.querySelector('#megasena-jogo-salvo')
    divJogoSalvo.innerHTML= ' '
    for(var i=0; i < state.jogoSalvo.length; i++){
        ulJogoSalvo = document.createElement('ul')
        divJogoSalvo.appendChild(ulJogoSalvo)
        
        codJogoSalvo = document.createElement('span')
        ulJogoSalvo.appendChild(codJogoSalvo)
        codJogoSalvo.textContent =(i+1)+'º'
        
            for(var li=0; li < state.jogoSalvo[i].length; li++){
                var jogoAtual = state.jogoSalvo[i]
                liJogoSalvo = document.createElement('li')
                ulJogoSalvo.appendChild(liJogoSalvo)
                liJogoSalvo.innerHTML = jogoAtual[li]  
            }
    }
    localStorage.setItem('jogoSalvo', JSON.stringify(state.jogoSalvo))
}

function novojogo(){
    state.jogoAtual = []
    numerosJogados()
    limparJogada()
 
}
function reiniciarJogo(){
    
    state.jogoAtual = []
    state.jogoSalvo = []
    divJogoSalvo = document.querySelector('#megasena-jogo-salvo')
    divJogoSalvo.innerHTML = ' '
    limparJogada()
    localStorage.removeItem('jogoSalvo')
}
function limparJogada(){
    l1.classList.remove('escolhido')
    l2.classList.remove('escolhido')
    l3.classList.remove('escolhido')
    l4.classList.remove('escolhido')
    l5.classList.remove('escolhido')
    l6.classList.remove('escolhido')
    l1.textContent= ''
    l2.textContent= ''
    l3.textContent= ''
    l4.textContent= ''
    l5.textContent= ''
    l6.textContent= ''
}
function aleatorio(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.trunc(Math.random()*(max - min+1)+min)
}
function animacaoMegaSena(){
    addNumeroaoJogo(aleatorio(1,60))
    if(state.jogoAtual.length === 6){
          clearInterval(intervalo)
    }
}
function megaSena(){
     intervalo = setInterval(()=>{
        animacaoMegaSena()
    },1000); 
 
}




start()