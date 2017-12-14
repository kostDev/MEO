let options = {
	selectState: null,
	altCount: 0,
	altName: '',
	condCount: 0,
	condName:'',
	min: 0,
	max: 0,
	useRandom: true,
	table: document.createElement('table'),
	selectType: 1,
	valuesArr: [],
	ranksArr: [],
}

createBtn.onclick = function () {
	if(!options.selectState){
		// save from repeat
		options.selectState = true;
		// set tools padding-top
		tools.style.paddingTop = "0%";
		//get #altCount.value && #cond.value
		options.altCount = parseInt(altCount.value) || 2;
		options.condCount = parseInt(condCount.value) || 2;
		options.typeExp = "Вариант";
		options.typeAlt = "Условие";
		// if value empty then we will set our basic value
		getMinMax(min_max.value || "0-10");
		options.table.setAttribute('id', 'table');
		create(options.table, options.condCount, options.altCount);
		divForTable.appendChild(options.table);
	}
	console.log(options);
}

clearBtn.onclick = function () {
	location.reload();
}

//cut string on min - max numbers
function getMinMax(value){
	let min = '', max = '';
	let state = false;
	value.split("").map(ch =>{
		if(ch != "-" && !state) min += ch;
		if(state) max += ch;
		if(ch == '-') state = true;
	});
	options.min = parseInt(min);
	options.max = parseInt(max);
	//console.log(options.min, options.max);
}

//create content in table
function create(table, row, cell){
	let number = 0;
	for (let rowNum = 0; rowNum <= row; rowNum++) {
        let rw = table.insertRow(rowNum);
        for (let cellNum = 0; cellNum <= cell+2; cellNum++) {
            let cl = rw.insertCell(cellNum);
		    if(options.useRandom) 
		    	number = getRandomNumber();
            if(rowNum == 0 && cellNum == 0) cl.innerHTML = '<span disabled></span>';
            if(rowNum == 0 && cellNum == cell+1) cl.innerHTML = '<span disabled>Значение</span>';
            if(rowNum == 0 && cellNum == cell+2) cl.innerHTML = '<span disabled>Ранг</span>';
            if(rowNum > 0 && cellNum != 0 && cellNum < cell+1) cl.innerHTML = '<input class="table-input" type="number" placeholder="0" min="'+ options.minValue +'" max="'+ options.maxValue +'" value='+ number+'>';
            if(rowNum > 0 && rowNum != row+1 && cellNum != 0 && cellNum == cell+1) cl.innerHTML = '<span class="values" id="span-value'+rowNum+'" disabled>'+ 0 +'</span>';
            if(rowNum > 0 && rowNum != row+1 && cellNum != 0 && cellNum == cell+2) cl.innerHTML = '<span class="rank" id="span-rank'+rowNum+'" disabled>'+ 0 +'</span>';
            if(rowNum == 0 && cellNum > 0 && cellNum < cell+1) cl.innerHTML = '<span class="table-alt" align="center" disabled>'+ options.typeAlt + '<sub>'+cellNum+'</sub>' +'</span>';
            if(rowNum > 0 && rowNum < row+1 && cellNum == 0) cl.innerHTML = '<span class="table-exp" disabled>'+ options.typeExp + '<sub>'+rowNum +'</sub>'+'</span>';
    	}
	}
}

function getDataFromTabInput(){
	let temp = document.getElementsByClassName("table-input");
	let arr = new Array();
	// get all value of alt from tab
	for(let obj of temp){
		arr.push(parseInt(obj.value));
	}
	return arr;
}

function getDataFromSpanValues(){
	return document.getElementsByClassName("values");
}

function getDataFromSpanRank(){
	return document.getElementsByClassName('rank');
}

function crit (value){
	let tempArr = getDataFromTabInput();
	let spanValue = getDataFromSpanValues();
	let spanRank  = getDataFromSpanRank();
	let valuesArr = [], ranks = [];
	let tempValue = tempArr[0];
	// -------------------------------------
	let temp = [];
	let prev = 0, next = options.condCount;
	for(let i = 0; i < tempArr.length / options.altCount; i++){  
		if(value == 1){
			valuesArr.push(Math.min(...tempArr.slice(prev, next)));
		}
		if(value == 2){
			valuesArr.push(Math.max(...tempArr.slice(prev, next)));
		}
		console.log(tempArr.slice(prev, next));
		prev = next;
		next += options.condCount;
	}
	console.log(valuesArr);
	// -------------------------------------
	for(let n = 0; n < valuesArr.length; n++){
		let count = 0;
		for(let i = 0; i < valuesArr.length; i++){
			if(valuesArr[n] < valuesArr[i]) ++count;
		}
		ranks.push(count+1);
		count = 0;
	}
	for(let i = 0; i < spanRank.length; i++){
		spanValue[i].innerHTML = valuesArr[i];
		spanRank[i].innerHTML = ranks[i];
	}
	console.log(valuesArr, ranks);

}

function critValda(){

}

select.onclick = function (){
	if(select.value != options.selectType){
		options.selectType = select.value;
	}
}

getInfoBtn.onclick = function (){
	crit(options.selectType);
}

function getRandomNumber (){
	return Math.floor(Math.random() * (options.max - options.min + 1)) + options.min;
}