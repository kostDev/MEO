let allInputs;
let allTabInputs;
let arrValue = [[]];
let sumValue = []
let options = {};

createTab.onclick = function() {
	allInputs = document.getElementsByTagName('input');
	if(!options.isCreatedTab){
		options = {
			typeExp: allInputs.typeExp.value || "Expert",
			typeAlt: allInputs.typeAlt.value || "Alternative",
			countExp: parseInt(allInputs.countExp.value) || 2,
			countAlt: parseInt(allInputs.countAlt.value) || 3,
			minValue: parseInt(allInputs.minValue.value) || 1,
			maxValue: parseInt(allInputs.maxValue.value) || 10,
			useRandom : useRandom.checked,
			table: document.createElement('table'),
			isCreatedTab1: false,
		};
		if(options.minValue > options.maxValue){
			[options.minValue, options.maxValue] = [options.maxValue,options.minValue];
		}
		// table for inputs
		options.table.setAttribute('id', 'table');
		create(options.table, options.countExp, options.countAlt);
		divForTable.appendChild(options.table);
		// flag for not repeating
		options.isCreatedTab = true;
	}
	createTab.disabled = true;
	console.log(options.table);
}

sumButton.onclick = function() {
	allTabInputs = document.getElementsByClassName("table-input");
	let sumSpan = document.getElementsByClassName("table-span-sum");
	let counter = 0;
	// get all value from all inputs
	for(let i = 0; i < allTabInputs.length; i++){
		if( i < 2 || i % options.countAlt != 0 ){
			arrValue[counter].push(parseInt(checkInputValue(allTabInputs[i].value)));
		}else{
			arrValue.push(new Array());
			arrValue[++counter].push(parseInt(checkInputValue(allTabInputs[i].value)));
		}
	}
	//console.log(arrValue);
	// set sum in span sum fields
	for(let i = 0; i < sumSpan.length; i++){
		sumValue.push(arrValue[i].reduce((sum,el)=>sum+el,0));
		sumSpan[i].innerText = sumValue[i];
	}
	sumButton.disabled = true;
}

recountButton.onclick = function() {
	let recount = document.getElementsByClassName('table-recount');
	let valuesArr = arrValue[0].map(el=> 0);
	for(let i = 0; i< arrValue.length; i++){
		for(let n = 0; n < arrValue[i].length; n++){
			valuesArr[n] += (arrValue[i][n] / sumValue[i]);
		}
	}
	console.log(valuesArr,sumValue);
	for(let i = 0; i< recount.length; i++){
		recount[i].innerText = valuesArr[i].toString().slice(0,6);
	}
}

reloadButton.onclick = function(){
	location.reload();
}


//create content in table
function create(table, row, cell){
	let number = null;
	for (let rowNum = 0; rowNum <= row+1; rowNum++) {
        let rw = table.insertRow(rowNum);
        for (let cellNum = 0; cellNum <= cell+1; cellNum++) {
            let cl = rw.insertCell(cellNum);
		    if(options.useRandom) 
		    	number = getRandomNumber(options.minValue, options.maxValue);
            if(rowNum == 0 && cellNum == 0 || rowNum == 0 && cellNum == cell+1) cl.innerHTML = '<span disabled></span>';
            if(rowNum == row+1 && cellNum == 0 || rowNum == row+1 && cellNum == cell+1) cl.innerHTML = '<span disabled></span>';          
            if(rowNum > 0 && cellNum != 0 && cellNum < cell+1) cl.innerHTML = '<input class="table-input" type="number" placeholder="0" min="'+ options.minValue +'" max="'+ options.maxValue +'" value='+ number+'>';
            if(rowNum > 0 && rowNum != row+1 && cellNum != 0 && cellNum == cell+1) cl.innerHTML = '<span class="table-span-sum" id="span-sum'+rowNum+'" disabled>SUM</span>';          
            if(rowNum == row+1 && cellNum > 0 && cellNum < cell+1) cl.innerHTML = '<span class="table-recount" disabled>среднее</span>';
            if(rowNum == 0 && cellNum > 0 && cellNum < cell+1) cl.innerHTML = '<span class="table-alt" disabled>'+ options.typeAlt + '<sub>'+cellNum+'</sub>' +'</span>';
            if(rowNum > 0 && rowNum < row+1 && cellNum == 0) cl.innerHTML = '<span class="table-exp" disabled>'+ options.typeExp + '<sub>'+rowNum +'</sub>'+'</span>';
    	}
	}
}

function getRandomNumber(min,max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkInputValue(value){
	if(isNaN(value)) return options.minValue;
	return value <= options.minValue ? options.minValue : 
		   value >= options.maxValue ? options.maxValue : value;
}
