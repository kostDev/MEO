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
        mainTab = new Table('myClass',3,6);
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
        // write in main Table obj 
        mainTab.valueArr.push(parseInt(temp[i].value));
    console.log(mainTab.valueArr)
}

//altTab = new Table('alternativeTable',1,6);

