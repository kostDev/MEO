export class Table{
    // new element which will have tab obj
    table = null;

    constructor(className, rowNum, cellNum){
        this.className = className;
        this.rowNum = rowNum;
        this.cellNum = cellNum;
    }

    create(){
        table = document.createElement('table');
        table.setAttribute('class', this.className);
        for (let rowNum = 0; rowNum < this.rowNum; rowNum++) {
            let row = table.insertRow(rowNum);
            for (let cellNum = 0; cellNum < this.cellNum; cellNum++) {
                let cell = row.insertCell(cellNum);
                cell.innerHTML = fillCell(rowNum,cellNum,alterCount);
            }
        }
        return table;
    }

    clear(){
        return table;
    }

    fillCell (x,y,lastCell){
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
}