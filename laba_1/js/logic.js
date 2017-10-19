// main Div
let workSpace = document.getElementById('workSpace');

// Create field for  Main Table
let mainTab = null;
// Create field for Alternative only
let altTab = null;

createMainTabBtn.onclick = function (){
    if(mainTab == null){
        createMainTabBtn.textContent = 'очистить'
        sumElemsBtn.disabled = false;
        // className, rowNumber , cellNumber
        mainTab = new Table('myClass',3,4);
        // add new MainTab to div -> WorkSpace
        workSpace.appendChild(mainTab.create());
        //mainTab.showInfo();
    }else{
        createMainTabBtn.textContent = 'создать'
        sumElemsBtn.disabled = true;
        // remove child mainTab from WorkSpace
        workSpace.removeChild(mainTab.remove());
        mainTab = null;
    }
}

sumElemsBtn.onclick = function (){
    let temp = document.getElementsByTagName('input');
    let numbers = [];
    for(let i = 1; i < temp.length; i++)
        numbers.push(parseInt(temp[i].value));
    // make 2-d array for main Table
    mainTab.makeTwDimensionalArr(numbers);
    console.log(mainTab.valueArr);
}

//altTab = new Table('alternativeTable',1,6);


