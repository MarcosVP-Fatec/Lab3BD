//--------------------------------------------------
// numPecaMontada 
let numPecaMontada = 0;

//--------------------------------------------------
// Inicia os objetos de seleção
let moldura = [ document.querySelector("#image1-1"),
                document.querySelector("#image2-1"),
                document.querySelector("#image3-1"),
                document.querySelector("#image4-1") ];

let camera   = window.document.querySelector("#Camera_Cursor");
let myCursor = window.document.querySelector("#mycursor");


//-------------------------------------------------------
// Este comando é necessário para que os clicks funcionem
//-------------------------------------------------------
window.onload = () => {
  if (AFRAME.utils.device.isMobile()){  //MOBILE
    myCursor.setAttribute('cursor','rayOrigin: cursor; fuse: true');
  } else {                              //DESKTOP
    myCursor.setAttribute('cursor','rayOrigin: mouse; fuse: false');
  }
}
//--------------------------------------------------
// Inicia os objetos de seleção - Moldura
let obj = [ 1, 2, 3, 4 ];

//-------------------------------------------------------------------------------
// Mistura as peças
shuffle(obj);                

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
  const temp = document.querySelector("#peca" + numero  );
  window.alert("-"+temp.object3D.position.x+"-");
  // temp.setAttribute('animation', 'property: position; dur: 1200; from: 12 0 5; to: ' + temp.object3D.position.x + ' ' + temp.object3D.position.y + ' ' + temp.object3D.position.z + ';loop: false;');
  temp.setAttribute('animation', 'property: position; dur: 1200; from: 12 0 5; to: 10 0 0;loop: false;');
  temp.object3D.visible = true;
}

//------------------------------------------------------------------------------------
// Ocultar a peça escolhida conforme seu número sequencial de montagem
function ocultarPeca( numero ){
  document.querySelector("#peca" + numero  ).object3D.visible = false;
}

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
// pontos para movimentação no VR 
// seleção do objeto + aguardar até que ele seja clicado 
document.querySelector("#piso_1").addEventListener("click", function () {
    camera.object3D.position.set(-5, 0, 3.5); // alterar posição do objeto 
  });

document.querySelector("#piso0").addEventListener("click", function () {
    camera.object3D.position.set(0, 0, 3.5); // alterar posição do objeto 
  });

document.querySelector("#piso1").addEventListener("click", function () {
    camera.object3D.position.set(5, 0, 3.5); // alterar posição do objeto
  });

document.querySelector("#piso2").addEventListener("click", function () {
    camera.object3D.position.set(10, 0, 3.5); // alterar posição do objeto
  });

document.querySelector('a-scene').addEventListener('enter-vr', function () {
  
  console.log("MODO VR"); // VR 

  myCursor.setAttribute('cursor', 'rayOrigin: cursor; fuse: true;');
  myCursor.object3D.visible = true;

  camera.object3D.position.set(0, 0, 3.5);

  document.querySelector("#piso_1").object3D.visible = true;
  document.querySelector("#piso_11").object3D.visible = true;
  document.querySelector("#piso0").object3D.visible = true;
  document.querySelector("#piso01").object3D.visible = true;
  document.querySelector("#piso1").object3D.visible = true;
  document.querySelector("#piso11").object3D.visible = true;
  document.querySelector("#piso2").object3D.visible = true;
  document.querySelector("#piso21").object3D.visible = true;
  document.querySelector("#pisoImagem1").object3D.visible = true;
  document.querySelector("#pisoImagem2").object3D.visible = true;
  document.querySelector("#pisoImagem3").object3D.visible = true;
  document.querySelector("#pisoImagem4").object3D.visible = true;
  document.querySelector("#piso_luz1").object3D.visible = true;

});

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
//window.addEventListener("load", start, false);
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


