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
        workSpace = document.getElementById('workSpace');
        let useRandom = document.getElementById("randCh").checked;
        // ---------------------------------------
        if(exprtCount > 1 && altCount > 1 &&
           exprtCount < 13 && altCount < 13){
            createMainTabBtn.textContent = 'очистить';
            sumBtn.disabled = false;
            // className, rowNumber , cellNumber
            mainTab = new Table('myClass', exprtCount, altCount, useRandom);
            // add new MainTab to div -> WorkSpace
            workSpace.appendChild(mainTab.create());
            //mainTab.showInfo();
        }else alert('числа должни быть от 1 до 12');
    }else{
        createMainTabBtn.textContent = 'создать'
        sumBtn.disabled = true;
        clearData();        
    }
}

function clearData(){
    // remove child mainTab from WorkSpace
    workSpace.removeChild(mainTab.remove());
    workSpace = null;
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
    for(let i = 3; i < temp.length; i++)
        numbers.push(parseInt(temp[i].value));
    // make 2-d array for main Table
    mainTab.makeTwDimensionalArr(numbers);

    console.log(mainTab.valueArr);
    console.log(mainTab.getSumArr());

}

//altTab = new Table('alternativeTable',1,6);


