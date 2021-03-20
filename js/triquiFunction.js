var triqui = document.querySelector('.triqui');
var startButton = document.querySelector('#start');
var auxiliar = false;
let matrix = new Array;
var turn = 0;
var round = 0;

startButton.addEventListener('click', startGame);
triqui.addEventListener('click', onSelectedCell);

function startGame(){
    auxiliar = true;
    var player1 = document.querySelector('#player1');
    var player2 = document.querySelector('#player2');
    if(player1.value == '' ){
        alert('Por favor coloque un valor');
        player1.focus();
    }else if(player2.value == ''){
        alert('Por favor coloque un valor');
        player2.focus();
    }else{
        turn = 1;
        document.getElementById('playerTurn').innerText = player1.value;
    }
}

function onSelectedCell(event){
    var target = event.target;
    var dataset = target.dataset;
    var symbol;
    var pos = document.getElementById(`${dataset.name}`);
    round = round + 1;
    
    tooglePlayer();

    function tooglePlayer(){
        if(auxiliar == true){
            if(turn ==1 && pos.innerText == ''){
                document.getElementById("playerTurn").innerText = player2.value;
                turn = 2;
                symbol = 'X';
                pos.innerText = symbol
            }else if(turn == 2 && pos.innerText == ''){
                document.getElementById("playerTurn").innerText = player1.value;
                turn = 1;
                symbol = 'O';
                pos.innerText = symbol
            }
        }
    }

    checkout(symbol);
    //console.log(symbol);
    if(round > 8){
        Swal.fire({
		text: 'EMPATE, ¡GRACIAS POR JUGAR!',
		icon: 'warning'
	});
	round = 0;
        auxiliar = false;
        clearTable();
    }
    console.log(round);
}

function checkout(symbol){
   matrix[0] = document.getElementById('c0');
   matrix[1] = document.getElementById('c1');
   matrix[2] = document.getElementById('c2');
   matrix[3] = document.getElementById('c3');
   matrix[4] = document.getElementById('c4');
   matrix[5] = document.getElementById('c5');
   matrix[6] = document.getElementById('c6');
   matrix[7] = document.getElementById('c7');
   matrix[8] = document.getElementById('c8');

   var winner;

   check(symbol);

    function check(symbol){
        if((symbol == matrix[0].innerText && symbol == matrix[1].innerText && symbol == matrix[2].innerText
            || symbol == matrix[3].innerText && symbol == matrix[4].innerText && symbol == matrix[5].innerText
            || symbol == matrix[6].innerText && symbol == matrix[7].innerText && symbol == matrix[8].innerText

            || symbol == matrix[0].innerText && symbol == matrix[3].innerText && symbol == matrix[6].innerText
            || symbol == matrix[1].innerText && symbol == matrix[4].innerText && symbol == matrix[7].innerText
            || symbol == matrix[2].innerText && symbol == matrix[5].innerText && symbol == matrix[8].innerText
            
            ||symbol == matrix[0].innerText && symbol == matrix[4].innerText && symbol == matrix[8].innerText
            || symbol == matrix[6].innerText && symbol == matrix[4].innerText && symbol == matrix[2].innerText
        )){
            if(symbol == 'X'){
                winner = player1.value;
            }else if(symbol == 'O'){
                winner = player2.value;
            }
            if(winner != null){
                auxiliar = false;   
                Swal.fire({
			icon: 'success',
			text: 'EL GANADOR ES: ' + winner.toUpperCase() + ' ¡FELICIDADES!'
	    	});
            }
            round = 0;
        }
    }
    clearTable();
}



function clearTable(){
    if(!auxiliar){
        for(let i= 0; i < matrix.length; i++){
            matrix[i].innerText = '';
        }
        document.getElementById('playerTurn').innerText = '';
    }
}
