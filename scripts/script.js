//------------------------------------------------------------------------------------
// numPecaMontada = Controle da peça que está montada atualmente
//------------------------------------------------------------------------------------
let numPecaMontada = 0;

//------------------------------------------------------------------------------------
// Inicia os objetos de seleção
//------------------------------------------------------------------------------------
let moldura = [ document.querySelector("#image1-1"),
                document.querySelector("#image2-1"),
                document.querySelector("#image3-1"),
                document.querySelector("#image4-1") ];

let camera   = window.document.querySelector("#Camera_Cursor");
let myCursor = window.document.querySelector("#mycursor");
// Inicia os objetos de seleção - Moldura
let obj = [ 1, 2, 3, 4 ];

//------------------------------------------------------------------------------------
// Mistura as peças
//------------------------------------------------------------------------------------
shuffle(obj);                

//------------------------------------------------------------------------------------
// Este comando é necessário para que os clicks funcionem
//------------------------------------------------------------------------------------
window.onload = () => {
  if (AFRAME.utils.device.isMobile()){  //MOBILE
    myCursor.setAttribute('cursor','rayOrigin: cursor; fuse: true');
  } else {                              //DESKTOP
    myCursor.setAttribute('cursor','rayOrigin: mouse; fuse: false');
  }
}

//------------------------------------------------------------------------------------
// Atribui a função click para as seleções
//------------------------------------------------------------------------------------
moldura[0].addEventListener("click", function(){ onClickable(0) } );
moldura[1].addEventListener("click", function(){ onClickable(1) } );
moldura[2].addEventListener("click", function(){ onClickable(2) } );
moldura[3].addEventListener("click", function(){ onClickable(3) } );

//------------------------------------------------------------------------------------
// Ao clicar de algum componente - index = Muldura
//------------------------------------------------------------------------------------
function onClickable( index ){

  if ( (numPecaMontada + 1) == obj[index]){
    numPecaMontada++;
    moldura[index].setAttribute('src',"images/p" + obj[index] + "_green.png");
    let tempo = exibirPeca(obj[index]); //Traz a peça até a posição de visualização.
    //Se a última peça foi clicada então faz a finalização
    if (obj[index] == obj.length){
      setTimeout( function() { finalizaPecaMontada(); }, tempo + 5000);
    }

  } else {

    moldura[index].setAttribute('src',"images/p" + obj[index] + "_red.png");
    setTimeout( function() { resetNumPecaMontada(); }, 2000);

  }

}

//------------------------------------------------------------------------------------
// Retorna a posição da peça para ser usado nas animações
//------------------------------------------------------------------------------------
function posicaoDaPeça( peça ){
  return peça.object3D.position.x + " " + peça.object3D.position.y + " " + peça.object3D.position.z;
}

//------------------------------------------------------------------------------------
// Exibir a peça escolhida conforme seu número sequencial de montagem
// .object3D.rotation.y -= 0.9;
//temp.setAttribute('animation', 'property: position; dur: 1000; from: -12 0 0; to: 8 0 -2.5 ;loop: false; easing: easeOutQuart; elasticity:5000');
//------------------------------------------------------------------------------------
function exibirPeca( numero ){
 
  //Guarda a posição real da peça para ser usado na finalização
  const temp = document.querySelector("#peca" + numero  );
  const x    = temp.object3D.position.x;
  const y    = temp.object3D.position.y;
  const z    = temp.object3D.position.z;

  //Posiciona a peça fora 
  temp.object3D.position.set(-12,0,0);
  temp.object3D.visible = true; //Exibe a peça

  let tempo = 200;
  setTimeout(() => {
    temp.setAttribute('animation', 'property: position; dur: 1000; from: -12 0 0; to: 8 -0.15 -2.5 ;loop: false;');
  }, tempo);

  tempo += 1010;
  setTimeout( function() {
    temp.setAttribute('animation', `property: position; dur: 500; from: ${posicaoDaPeça(temp)}; to: 16.2 -0.15 -2.5;loop: false;`);
  },tempo)

  tempo += 510;
  setTimeout( function() {
    temp.setAttribute('animation', `property: position; dur: 500; from: ${posicaoDaPeça(temp)}; to: 13 0 0;loop: false;`);
  },tempo)

  tempo += 510;
  setTimeout( function() {
    temp.setAttribute('animation', 'property: rotation; dur: 4000; to:0 -360 0;');
  },tempo)

  tempo += 4200;
  setTimeout( function() {
    temp.setAttribute('animation', `property: position; dur: 1000; from: ${posicaoDaPeça(temp)}; to: ${x} ${y} ${z};loop: false;`);
  },tempo)

  return tempo;

}

//------------------------------------------------------------------------------------
// Ocultar a peça escolhida conforme seu número sequencial de montagem
//------------------------------------------------------------------------------------
function ocultarPeca( numero ){
  document.querySelector("#peca" + numero  ).object3D.visible = false;
}

//------------------------------------------------------------------------------------
// Gigar Peças no eixo X
//------------------------------------------------------------------------------------
function girarPeçasEixoX( grau , durante , tempoStart ){
  setTimeout(() => {
    for (let n = 1; n < obj.length+1; n++) {
      document.querySelector("#peca"+n).setAttribute('animation', 'property: rotation; dur: '+durante+'"; to:0 '+grau+' 0;loop: 0;');
    }    
  }, tempoStart);
}

//------------------------------------------------------------------------------------
// Reinicia o contador quando necessário
// Mistura novamente os componentes
// Coloca todas as imagens em fundo azul.
//------------------------------------------------------------------------------------
function resetNumPecaMontada() {
  let el;
  numPecaMontada = 0;
  shuffle(obj); //Mistura de novo.
  girarPeçasEixoX( 0 , 500, 0);
  for (let index = 1; index <= obj.length; index++) {
    ocultarPeca(index);
  }
  // for (let n = 1; n < obj.length+1; n++) {
  //   document.querySelector("#peca"+n).getAttribute('animation','attribute: visible; to: false; dur: 1; repeat: 0;');
  // }
}

//------------------------------------------------------------------------------------
// Misturador - Recoloca as peças em loais diferentes
// Coloca todas as imagens em modo azul.
//------------------------------------------------------------------------------------
function shuffle(o) {
  for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  for (let index = 0; index < moldura.length; index++) {
    moldura[index].setAttribute('src',"images/p" + o[index] + ".jpg") 
  }
}

//------------------------------------------------------------------------------------
// Executa a finalização
//------------------------------------------------------------------------------------
function finalizaPecaMontada(){

  if (numPecaMontada == 4) {

    // Rotaciona a peça devagar 5 vezes.
    // Envia o comando para todas as peças
    for (let n = 1; n < obj.length+1; n++) {
      document.querySelector("#peca"+n).setAttribute('animation', 'property: rotation; dur: 5000; to:0 360 0;loop: 0;');
    }
    
    //Após girar mostra a peça de frente.
    setTimeout(() => {
      for (let n = 1; n < obj.length+1; n++) {
        document.querySelector("#peca"+n).setAttribute('animation', 'property: rotation; dur: 5010; to:0 -90 0;loop: 0;');
      }
    }, 4000);

    //Após 5 segundos finaliza tudo 
    setTimeout(() => { resetNumPecaMontada(); }, 15000);

  }

};

//------------------------------------------------------------------------------------
// pontos para movimentação no VR 
// seleção do objeto + aguardar até que ele seja clicado 
//------------------------------------------------------------------------------------
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