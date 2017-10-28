class Table{

    constructor(className, rowNum, cellNum, useRandom){
        this.className = className;
        this.rowNum = rowNum;
        // +1 for sumValue fields
        this.cellNum = parseInt(cellNum)+1;
        this.valueArr = [];
        this.sumArr = [];
        this.table = document.createElement('table');
        this.useRandom = useRandom;
        this.counter = 1;
    }
    // atr true if it not main tab
    create(atr=false){
        // for the next table counter must be 0
        atr == true ? this.counter = 0 : null;
        this.table.setAttribute('class', this.className);
        for (let rowNum = 0; rowNum < this.rowNum; rowNum++) {
            let row = this.table.insertRow(rowNum);
            for (let cellNum = 0; cellNum < this.cellNum; cellNum++) {
                let cell = row.insertCell(cellNum);
                if(atr){
                    cell.innerHTML = '<span class="form-control" disabled>'+this.valueArr[this.counter++].toFixed(5)+'</span>';
                }else{
                    if(cellNum+1 != this.cellNum){
                        let number = null;
                        if(this.useRandom)
                            // max 20 min 0
                            number = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
                        cell.innerHTML = '<input type="number" placeholder="0" min="0" class="form-control" value="'+number+'">';
                    }else{
                        cell.innerHTML = '<button id="'+ (this.counter++) +'" class="form-control" disabled>Summa</button>';
                    }
                }
            }
        }
        return this.table;
    }

    make2dArr(arr){
        // --- if user will use sumBth more then 1 times
        this.valueArr = [];
        // --------------------------------------------
        let counter = 0;
        this.valueArr[counter] = new Array()
        for(let i = 0; i < arr.length; i++){
            if(i % (this.cellNum-1) != 0 || i == 0)
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
        let counter = 1;
        // clear sumArr if double click on sumBtn
        this.sumArr = [];
        // -------------------------------------
        this.valueArr.map(ar =>{
            let value = ar.reduce((sum,el) => sum+el,0);
            // set value in field of id sum
            document.getElementById("" + counter++).textContent = value;
            // for test
            this.sumArr.push(value);
        });
        return this.sumArr;
    }

    showInfo(){
          console.log('Class: '+ this.className + ' | row: '
             + this.rowNum + ' | cell: ' + this.cellNum);
    }
}