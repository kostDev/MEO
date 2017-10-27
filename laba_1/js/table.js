class Table{

    constructor(className, rowNum, cellNum, useRandom){
        this.className = className;
        this.rowNum = rowNum;
        this.cellNum = cellNum;
        this.valueArr = [];
        this.sumArr = [];
        this.table = document.createElement('table');
        this.state = false;
        this.useRandom = useRandom;
    }

    create (){
        this.table.setAttribute('class', this.className);
        for (let rowNum = 0; rowNum < this.rowNum; rowNum++) {
            let row = this.table.insertRow(rowNum);
            for (let cellNum = 0; cellNum < this.cellNum; cellNum++) {
                let cell = row.insertCell(cellNum);
                // max 20 min 0
                let number = null;
                if(this.useRandom)
                    number = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
                cell.innerHTML = '<input type="number" placeholder="0" class="form-control" value="'+number+'">';
            }
        }
        return this.table;
    }

    remove(){
        return this.table;
    }

    makeTwDimensionalArr(arr){
        let counter = 0;
        this.valueArr[counter] = new Array()
        for(let i = 0; i < arr.length; i++){
            if(i % this.cellNum != 0 || i == 0)
               this.valueArr[counter].push(arr[i]);
            else{
                if(i+1 != arr.length){
                    ++counter;
                    this.valueArr[counter] = new Array();
                    this.valueArr[counter].push(arr[i]);
                }
            }
        }
    }

    getSumArr(){
        this.valueArr.map(ar =>{
            this.sumArr.push(ar.reduce((sum,el) => sum+el,0));
        });
        return this.sumArr;
    }

    showInfo(){
          console.log('Class: '+ this.className + ' | row: '
             + this.rowNum + ' | cell: ' + this.cellNum);
    }
}