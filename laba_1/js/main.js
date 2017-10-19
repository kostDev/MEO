let workSpace = document.querySelector('#workSpace');
let alTab     = document.querySelector('#altTab');
let inputButton = document.getElementById('inputButton');
let table; // future table
let isTableAlt = false;
let alterCount;
var sumArr = [];
var alterArr = [];
// controls

inputButton.onclick = function () {
	// 2 elements takes 2 rows
	alterCount = parseInt(inputField.value)+2;

	if(!isTableAlt){
		alterCount > 3 && alterCount <= 12 ?
		createTable(alterCount) : alert('Размер должен быть в пределе (1,12]!!!');
	}else{
		clearTable();
	}
}
// table.insertRow(rowNum).insertCell(cellNum);
function createTable(alterCount) {
	table = document.createElement('table');
	table.setAttribute('class', 'article');
	for (let rowNum = 0; rowNum < alterCount-1; rowNum++) {
		let row = table.insertRow(rowNum);
		for (let cellNum = 0; cellNum < alterCount; cellNum++) {
			let cell = row.insertCell(cellNum);
			cell.innerHTML = fillCell(rowNum,cellNum,alterCount);
			rowNum > 0 && cellNum + 1 == alterCount ? 
				cell.setAttribute('id', 'Sum'+rowNum) : null;
		}
	}
	workSpace.appendChild(table);
	inputButton.textContent = 'очистить';
	isTableAlt = true;
}

function clearTable() {
	workSpace.removeChild(table);
	inputButton.textContent = 'создать';
	isTableAlt = false;

	document.getElementById("findButton").disabled = true;
}

let fillCell = (x,y,lastCell) =>{
	//верхний левый угол
	if(x === 0 && y === 0) return "";
	//последняя колонка - Сумма
	if(y+1 === lastCell && x !== 0) {
		return '';
	} else if (y+1 === lastCell && x === 0){
		//Это заглавие
		return '<b>Сумма</b>';
	}
  return x === 0 ? '<b>a<sub>'+y+'</sub></b>' : 
  		 y === 0 ? '<b>Expert<sub>'+x+'</sub></b>' :
    	'<input type="number" placeholder="0" class="form-control">';
  }

function createArr(data, size){
	let counter = 0;
	alterArr[counter] = new Array();
	for(let i = 1; i<data.length;i++){
		if(i % size != 0)
			alterArr[counter].push((data[i].value * 1));
		else{
			alterArr[counter].push((data[i].value * 1));
			counter++;
			alterArr[counter] = new Array();
		}
	}
}

calcButton.onclick = function() {
	let data = document.getElementsByTagName('input');
	let size = Math.sqrt(data.length-1);
	createArr(data, size);
	let temp = 0;
	for(let i = 1; i < data.length; i++){
		if(i % size != 0){
			temp += (data[i].value * 1);
		}else{
			temp += (data[i].value * 1);
			sumArr.push(temp);
			temp = 0;
		}
	}
	for(let i = 1; i <= size;i++)
		document.getElementById('Sum'+i).innerHTML = sumArr[i-1];

	document.getElementById("findButton").disabled = false;
}

function createTableAlt(alterCount) {
	let table = document.createElement('table');
	table.setAttribute('class', 'alter');
	let row = table.insertRow(0);
	for (let cellNum = 0; cellNum < alterCount; cellNum++) {
		if(cellNum > 0 && cellNum < alterCount-1){
			let cell = row.insertCell(cellNum);
			cell.innerHTML = '<input type="number" placeholder="number" class="form-control">';	
		}else{
			let cell = row.insertCell(cellNum);
			cell.innerHTML = '<b>#####</b>';
		}
	}
	altTab.appendChild(table);
}

function formula (){
	// sumArr alterArr
	let temp = 0;
	let formArr = [];
	sumArr.map((x, index) => {
		for(let i = 0; i < alterArr[0].length ; i++){
			console.log('number: ' + alterArr[i][index] + ' index number : '+ i);
			if(alterArr[i][index] == 0) continue;
			temp += ((alterArr[i][index] * 1) / (x * 1));
		}
		formArr.push(temp);
		temp = 0;
	});
	console.log(formArr);
}

findButton.onclick = function(){
	createTableAlt(alterCount);
	formula();
}
