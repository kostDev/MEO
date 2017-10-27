// main Div
let workSpace = document.getElementById('workSpace');
// Create field for  Main Table
let mainTab = null;
// Create field for Alternative only
let altTab = null;

createMainTabBtn.onclick = function (){
    if(mainTab == null){
        // -------------- get input value
        let exprtCount = document.getElementById('inputExp').value;
        let altCount = document.getElementById('inputAlt').value;
        let useRandom = document.getElementById("randCh").checked;
        // ---------------------------------------
        if(exprtCount > 1 && altCount > 1 &&
           exprtCount < 13 && altCount < 13){
            createMainTabBtn.textContent = 'очистить';
            sumBtn.disabled = false;
            // className, rowNumber , cellNumber, useRandom
            mainTab = new Table('myClass', exprtCount, altCount, useRandom);
            // add new table to div -> WorkSpace
            workSpace.appendChild(mainTab.create());
        }else alert('числа должни быть от 1 до 12');
    }else{
        createMainTabBtn.textContent = 'создать'
        clearData(); 
        sumBtn.disabled = true;       
    }
}

function clearData(){
    // remove child mainTab from WorkSpace
    workSpace.removeChild(mainTab.table);
    mainTab = null;
    altTab = null;
    // clear inputFields
    document.getElementById('inputExp').value = null;
    document.getElementById('inputAlt').value = null;
}

sumBtn.onclick = function (){
    let temp = document.getElementsByTagName('input');
    let numbers = [];
    // i = 3, because 3 input are for user
    // i = 0 => inputExp
    // i = 1 => inputAlt
    // i = 2 => randCh - for randomNumbers
    for(let i = 3; i < temp.length; i++){
        let value = parseInt(temp[i].value);
        if(!isNaN(value)){
            numbers.push(value);
        } 
    }
    // make 2-d array for main Table inputs
    mainTab.make2dArr(numbers);
    console.log('all inputs:', mainTab.valueArr);
    //mainTab.getSumArr() uncomment if clog will be delete
    //set value in sum ID
    console.log('sum:', mainTab.getSumArr());
    // save our data from repeating 

}