let dataTable = document.querySelector('#mainDataTable');
let inputButton = document.getElementById('inputButton');
let table; // future table
let isTableAlt = false;

// controls
inputButton.onclick = function () {
	// 2 elements takes 2 rows
	let alterCount = parseInt(inputField.value)+2;
	if(!isTableAlt){
		alterCount > 3 && alterCount <= 12 ?
		createTable(alterCount) : alert('Размер должен быть в пределе (1,12]!!!');
	}else{
		clearTable();
	}
}

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
	dataTable.appendChild(table);
	inputButton.textContent = 'очистить';
	isTableAlt = true;
}

function clearTable() {
	dataTable.removeChild(table);
	inputButton.textContent = 'создать';
	isTableAlt = false;
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

calcButton.onclick = function() {
	let data = document.getElementsByTagName('input');
	let valueArr = [];
	let size = Math.sqrt(data.length-1);
	let temp = 0;
	for(let i = 1; i < data.length; i++){
		if(i % size != 0){
			temp += (data[i].value * 1);
		}else{
			temp += (data[i].value * 1);
			valueArr.push(temp);
			temp = 0;
		}
	}
	for(let i = 1; i <= size;i++)
		document.getElementById('Sum'+i).innerHTML = valueArr[i-1];
}
