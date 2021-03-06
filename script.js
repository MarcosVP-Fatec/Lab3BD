//--------------------------------------------------
// numPecaMontada 
let numPecaMontada = 0;

//--------------------------------------------------
// Inicia os objetos de seleção
let moldura = [ document.querySelector("#image1-1"),
                document.querySelector("#image2-1"),
                document.querySelector("#image3-1"),
                document.querySelector("#image4-1") ];

//--------------------------------------------------
// Inicia os objetos de seleção - Moldura
let obj = [ 1, 2, 3, 4 ];

//-------------------------------------------------------------------------------
// Mistura as peças
shuffle(obj);                

window.addEventListener("load", start2, false);

//-------------------------------------------------------------------------------
// Atribui a função click para as seleções
moldura[0].addEventListener("click", function(){ onClickable(0) } );
moldura[1].addEventListener("click", function(){ onClickable(1) } );
moldura[2].addEventListener("click", function(){ onClickable(2) } );
moldura[3].addEventListener("click", function(){ onClickable(3) } );

//------------------------------------------------------------------------------------
// Ao clicar de algum componente - index = Muldura
//------------------------------------------------------------------------------------
function onClickable( index ){

  if ( (numPecaMontada + 1) == obj[index]){
    count2();
    moldura[index].setAttribute('src',"images/p" + obj[index] + "_green.png");
    exibirPeca(obj[index]);
    //Se a última peça foi clicada então faz a finalização
    if (obj[index] == 4){
      setTimeout( function () { finalizaPecaMontada(); }, 1000) 
    }


  } else {

    moldura[index].setAttribute('src',"images/p" + obj[index] + "_red.png");
    setTimeout( function() {
      resetNumPecaMontada();
    }, 2000);

  }

}

//------------------------------------------------------------------------------------
// Exibir a peça escolhida conforme seu número sequencial de montagem
function exibirPeca( numero ){
  document.querySelector("#peca" + numero  ).object3D.visible = true;
}

//------------------------------------------------------------------------------------
// Ocultar a peça escolhida conforme seu número sequencial de montagem
function ocultarPeca( numero ){
  document.querySelector("#peca" + numero  ).object3D.visible = false;
}

function start2() {
  var button = document.getElementById("#black");
};

//-----------------------------------------------------------------------------
// função que incrementa o contacor posicionador
function count2() { // counter "+" sum
  numPecaMontada++;
};

function countSub2() { // counter "-" sub
  numPecaMontada--;
};

//--------------------------------------------------------------------------------------------------------
// Reinicia o contador quando necessário
// Mistura novamente os componentes
// Coloca todas as imagens em fundo azul.
function resetNumPecaMontada() {
  numPecaMontada = 0;
  shuffle(obj); //Mistura de novo.
  for (let index = 0; index < obj.length; index++) {
    ocultarPeca(index+1);
  }
}

//--------------------------------------------------------------------------------------------------------
// Misturador - Recoloca as peças em loais diferentes
// Coloca todas as imagens em modo azul.
function shuffle(o) {
  for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  for (let index = 0; index < moldura.length; index++) {
    moldura[index].setAttribute('src',"images/p" + o[index] + ".jpg") 
  }
}

//- -------------------------------------------------------------------------------------------------------
// Executa a finalização
function finalizaPecaMontada(){

  if (numPecaMontada == 4) {

    let el2 = document.querySelector("#alerta2");
    setTimeout(function () {
      
      el2.object3D.visible = true;
      el2.setAttribute('animation', 'property: model-opacity; dur: 1000; to: 1 ;loop: 5;');;

    }, 500);
    
    //Rotaciona a peça devagar 5 vezes.
    for (let n = 1; n < obj.length+1; n++) {

      document.querySelector("#peca"+n).setAttribute('animation', 'property: rotation; dur: 1000; to:0 360 0;loop: 5;');
            
    }
  
    //Após 5 segundos finaliza tudo 
    setTimeout(function () {
      
      let el2 = document.querySelector("#alerta2");
      el2.object3D.visible = false;
      el2.setAttribute('animation', 'property: model-opacity; dur: 1000; to: 0 ;loop: false;');

      //Rotaciona a peça devagar 5 vezes.
      for (let n = 1; n < obj.length+1; n++) {

        document.querySelector("#peca"+n).setAttribute('animation', 'property: rotation; dur: 1000; to:0 0 0 ;loop: false;');
        
      }

      resetNumPecaMontada();

    }, 7500);

  }

};

// Opacidade 
AFRAME.registerComponent('model-opacity', {
  schema: {
    default: 1.0
  },
  init: function () {
    this.el.addEventListener('model-loaded', this.update.bind(this));
  },
  update: function () {
    var mesh = this.el.getObject3D('mesh');
    var data = this.data;
    if (!mesh) {
      return;
    }
    mesh.traverse(function (node) {
      if (node.isMesh) {
        node.material.opacity = data;
        node.material.transparent = data < 1.0;
        node.material.needsUpdate = true;
      }
    });
  }
});

//==============================================================================
// botões 
document.querySelector("#tras").addEventListener("click", function () {
  //(seleção do objeto        +    aguardar até que ele seja clicado)  

  var el = document.querySelector("#tras");
  // criando uma variavel e recebendo um objeto

  el.setAttribute('animation', 'property: position; dur: 1000; from: 0 0.1 0; to: 0 0.1 -0.1;loop: false;');
  el.setAttribute('animation', 'property: position; dur: 800; from: 0 0.1 -0.1; to: 0 0.1 0;loop: false;easing: easeOutQuad;elasticity:5000;');
  // modificação do meu objeto 

});
document.querySelector("#frente").addEventListener("click", function () {
  //(seleção do objeto + aguardar até que ele seja clicado)     

  var el = document.querySelector("#frente");
  // criar uma variavel e receber um objeto

  el.setAttribute('animation', 'property: position; dur: 1000; from: 0 0.1 0; to: 0 0.1 -0.1;loop: false;');
  el.setAttribute('animation', 'property: position; dur: 800; from: 0 0.1 -0.1; to: 0 0.1 0;loop: false;easing: easeOutQuad;elasticity:5000;'); // modificação de atributos no meu objto

});
document.querySelector("#setaEsquerda").addEventListener("click", function () {
  //(seleção do objeto + aguardar até que ele seja clicado)    
  var el = document.querySelector("#peca1"); // criação de uma variavel e recebendo o caminho do objeto
  el.object3D.rotation.y -= 0.9; // alteração de uma propriedade ROTAÇÃO(eixo Y) do objeto. "objeto = objeto - 09"

  var el = document.querySelector("#peca2");
  el.object3D.rotation.y -= 0.9; // alteração de uma propriedade ROTAÇÃO(eixo Y) do objeto. "objeto = objeto - 09"

  var el = document.querySelector("#peca3");
  el.object3D.rotation.y -= 0.9; // alteração de uma propriedade ROTAÇÃO(eixo Y) do objeto. "objeto = objeto - 09"

  var el = document.querySelector("#peca4");
  el.object3D.rotation.y -= 0.9; // alteração de uma propriedade ROTAÇÃO(eixo Y) do objeto. "objeto = objeto - 09"

  var el = document.querySelector("#setaEsquerda"); // criação de uma variavel e recebendo objeto

  //alteração das propriedade do objeto
  el.setAttribute('animation', 'property: position; dur: 1200; from: 0 0.1 0; to: 0 0.1 -0.1;loop: false;');
  el.setAttribute('animation', 'property: position; dur: 1000; from: 0 0.1 -0.1; to: 0 0.1 0;loop: false;easing: easeOutQuart;elasticity:5;');


});
document.querySelector("#setaDireita").addEventListener("click", function () {
  //(seleção do objeto          +      aguardar até que ele seja clicado) 

  var el = document.querySelector("#peca1"); // criação de uma variavel e receber objeto
  el.object3D.rotation.y += 0.9; // alteração na propriedade ROTAÇÃO (eixo y). "eixo y = eixo y + 0.9"

  var el = document.querySelector("#peca2"); // criação de uma variavel e receber objeto
  el.object3D.rotation.y += 0.9; // alteração na propriedade ROTAÇÃO (eixo y). "eixo y = eixo y + 0.9"

  var el = document.querySelector("#peca3"); // criação de uma variavel e receber objeto
  el.object3D.rotation.y += 0.9; // alteração na propriedade ROTAÇÃO (eixo y). "eixo y = eixo y + 0.9"

  var el = document.querySelector("#peca4"); // criação de uma variavel e receber objeto
  el.object3D.rotation.y += 0.9; // alteração na propriedade ROTAÇÃO (eixo y). "eixo y = eixo y + 0.9"

  var el = document.querySelector("#setaDireita");

  el.setAttribute('animation', 'property: position; dur: 1200; from: 0 0.1 0; to: 0 0.1 -0.1;loop: false;');
  el.setAttribute('animation', 'property: position; dur: 1000; from: 0 0.1 -0.1; to: 0 0.1 0;loop: false;easing: easeOutQuart;elasticity:5;');


});
//==========================================================================
//pontos para movimentação no VR 
document.querySelector("#piso_1").addEventListener("click", function () {
  //seleção do objeto + aguardar até que ele seja clicado 

  var el = document.querySelector("#CameraPosition"); // criação da variavel e receber objeto
  el.object3D.position.set(-5, 0, 3.5); // alterar posição do objeto 
});
document.querySelector("#piso0").addEventListener("click", function () {
  //seleção do objeto + aguardar até que ele seja clicado 

  var el = document.querySelector("#CameraPosition"); // criação da variavel e receber objeto
  el.object3D.position.set(0, 0, 3.5); // alterar posição do objeto 
});
document.querySelector("#piso1").addEventListener("click", function () {
  //seleção do objeto + aguardar até que ele seja clicado 

  var el = document.querySelector("#CameraPosition"); // criação da variavel e receber objeto
  el.object3D.position.set(5, 0, 3.5); // alterar posição do objeto


});
document.querySelector("#piso2").addEventListener("click", function () {
  //seleção do objeto + aguardar até que ele seja clicado 

  var el = document.querySelector("#CameraPosition"); // criação da variavel e receber objeto
  el.object3D.position.set(10, 0, 3.5); // alterar posição do objeto
  //-----------------------------------------
  //ativar alerta 
  /*var el = document.querySelector("#alerta")
  el.object3D.visible = true;
  var el = document.querySelector("#alerta")  
  el.setAttribute('animation', 'property: model-opacity; dur: 1500; from: 1; to: 0.5 ;loop: true;' ); // alteração da da animação  */
  //------------------------------------------  

});
//==================================================================================
/* Modify in => Desktop 
             => mobile cursor
             => mobile (VR) */ //função para verificar se esta rodando em mobile e aplicar alteraçoes 
function CheckMobile() {

  if (AFRAME.utils.device.isMobile() == false) // DESKTOP
  {
    var el = document.querySelector("#mycursor");
    el.setAttribute('cursor', 'rayOrigin: mouse;fuse: false');
  } else {
    var el = document.querySelector("#mycursor"); // MOBILE 
    el.setAttribute('cursor', 'rayOrigin: cursor;fuse: true');
    el.object3D.visible = true;
  }

}
document.querySelector('a-scene').addEventListener('enter-vr', function () {
  console.log("MODO VR"); // VR 

  var el = document.querySelector("#mycursor");
  el.setAttribute('cursor', 'rayOrigin: cursor; fuse: true;');
  el.object3D.visible = true;

  var el = document.querySelector("#CameraPosition");
  el.object3D.position.set(0, 0, 3.5);

  var el = document.querySelector("#piso_1");
  el.object3D.visible = true;

  var el = document.querySelector("#piso_11");
  el.object3D.visible = true;

  var el = document.querySelector("#piso0");
  el.object3D.visible = true;

  var el = document.querySelector("#piso01");
  el.object3D.visible = true;

  var el = document.querySelector("#piso1");
  el.object3D.visible = true;

  var el = document.querySelector("#piso11");
  el.object3D.visible = true;

  var el = document.querySelector("#piso2");
  el.object3D.visible = true;

  var el = document.querySelector("#piso21");
  el.object3D.visible = true;

  var el = document.querySelector("#pisoImagem1");
  el.object3D.visible = true;

  var el = document.querySelector("#pisoImagem2");
  el.object3D.visible = true;

  var el = document.querySelector("#pisoImagem3");
  el.object3D.visible = true;

  var el = document.querySelector("#pisoImagem4");
  el.object3D.visible = true;

  var el = document.querySelector("#piso_luz1");
  el.object3D.visible = true;

});
//==================================================================================
// rodar a função 'checkmobile' quando a pagina é carregada
window.onload = function () {
  CheckMobile();
};
//==========================================================
// contador para a logica de montagem das peças 
var counter = 0;

function start() {
  var button = document.getElementById("frente"); // trigger para dar inicio ao contador
}; // começar 
function count() { // counter "+" sum
  counter = parseInt(document.getElementById("count").textContent);
  counter++;
  document.getElementById("count").innerHTML = counter;
}; // somar 
function countSub() { // counter "-" sub
  counter = parseInt(document.getElementById("count").textContent);
  counter--;
  document.getElementById("count").innerHTML = counter;
}; // subtrair 
window.addEventListener("load", start, false);
//=============================================
// Botao avançar '>'   
document.querySelector("#frente").addEventListener("click", (e) => { // seleção do objeto e aguardar o click
  console.log("frente")
  count(); // chamando função somar 

  //-- PEÇAS -------------------------------------------- 
  //alterando visibilidade e animação(posicao) de acordo com o contador 

  if (counter == 1) {
    var el = document.querySelector("#peca2");
    el.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0 0 0 ;loop: false;');
    el.object3D.visible = true;

    var el = document.querySelector("#image1");
    el.object3D.visible = false;

    var el = document.querySelector("#image2");
    el.setAttribute('visible', true)

  }
  //----------------------------------------------------------
  if (counter == 2) {
    var el = document.querySelector("#peca3");
    el.object3D.visible = true;
    el.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0 0 0 ;loop: false;');


  }
  if (counter == 3) {
    var el = document.querySelector("#peca4");
    el.object3D.visible = true;
    el.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0 0 0 ;loop: false;');
  }
  if (counter > 3) { // trava para o contador não ultrapassar o numero de peças existente 
    counter = parseInt(document.getElementById("count").textContent);
    counter = 3;
    document.getElementById("count").innerHTML = counter;
  }
  // IMAGENS ----------------------------------------------------  


})
//=======================================================================
// Button retroceder "<" 
document.querySelector("#tras").addEventListener("click", (e) => {
  console.log("atras")

  countSub(); // chamada da função subtrair 

  // alteração das propriedades visibilidade, e animação(posicao) de acordo com o contador 
  if (counter == 0) {
    var el = document.querySelector("#peca2"); // criação de variavel e recebendo objeto
    el.object3D.visible = false; // alteração da visibilidade 
    el.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0.6 0 1;loop: false;'); // alteração da da animação

    var el = document.querySelector("#image2"); // criação de variavel e recebendo objeto
    el.setAttribute('visible', false) // alteração de visibilidade
    var el = document.querySelector("#image1"); // criação de variavel e recebendo objeto
    el.object3D.visible = true;

  }
  //----------------------------------------------------------
  if (counter == 1) {
    var el = document.querySelector("#peca3");
    el.object3D.visible = false;
    el.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0.6 0 1;loop: false;');
  }
  if (counter == 2) {
    var el = document.querySelector("#peca4");
    el.object3D.visible = false;
    el.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0.6 0 1;loop: false;');
  }
  if (counter < 0) { // trava para o contador não ser menor que zero
    counter = parseInt(document.getElementById("count").textContent);
    counter = 0;
    document.getElementById("count").innerHTML = counter;
  }
})


//=============

// HAND TRACK 
/*
const button = document.getElementById('button');
const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote")
let isVideo = false;
let model = null;


const modelParams = {
    flipHorizontal: true,  // flip video (like mirror) 
    maxNumBoxes: 1,  //number of simultaneous detections     
    iouThreshold: 0.6,   // iouThreshold(average) = intersection : all object     
    scoreThreshold: 0.7,  //acuracia 
    imageScaleFactor: 0.7, //retuction video input 
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = "Video started. Now tracking"
            isVideo = true
            audio=false // ****>>>>>VERIFICAR SE ESTA FUNCIONANDO <<<<
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
}

function toggleVideo() { // ON , OFF detecção
    if (!isVideo) {
        updateNote.innerText = "Starting video"
        startVideo();
    } else {
        updateNote.innerText = "Stopping video"
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = "Video stopped"
    }
}

function runDetection() {
    model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
        if (predictions.length > 0) {
      changeData(predictions[0].bbox); //[1º x , 2º y , 3° width , 4º height]
    }
    
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    updateNote.innerText = "Loaded Model!"
    trackButton.disabled = false
});
//===================================================

function changeData(value) {
  let midvalX = value[0] + value[2] / 2;
  let midvalY = value[1] + value[3] / 2;

  document.querySelector(".hand-1 #hand-x span").innerHTML = midvalX;
  document.querySelector(".hand-1 #hand-y span").innerHTML = midvalY;

  moveTheBox({ x: (midvalX - 300) / 600, y: (midvalY - 250) / 500 });
}

//Metodo para renderizar de acordo com as coordenadas
function moveTheBox(value) {
  
  
  var el = document.querySelector("#mycursor");
  el.object3D.position.x = ((window.innerWidth * value.x) / window.innerWidth) * 5;
  el.object3D.position.y = -((window.innerHeight * value.y) / window.innerHeight) * 5;
 
  renderer.render(scene, camera);
}
*/
//==============