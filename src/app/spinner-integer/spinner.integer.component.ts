import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Configuration } from '../model/configuration';

@Component({
  moduleId: module.id,
  selector: 'spinner-integer',
  templateUrl: './spinner.integer.component.html',
  styleUrls: ['./spinner.integer.component.css']
})
export class SpinnerIntegerComponent implements OnInit {

    @Input()
    private configuration: Configuration;
    
    @Input()
    public ngModel: number;

    private values: any[];

    constructor(private detector: ChangeDetectorRef) {
      
    }

    public ngOnInit(): void {
        this.configuration = Object.assign(new Configuration(), this.configuration);
        this.createValues();
        this.createEventOnSpinner();
    }

    private createValues() :void {
        this.values = new Array();
        let rotate = 0;
        for (let x=this.configuration.minValue; this.values.length<5; x++ ) {
            this.values.push({valor: x, rotate: rotate});
            rotate = rotate-2;
        }
        this.selectValueModel();
    }

    private selectValueModel(): void {
        let that = this;
        let inicialModel = this.ngModel;

        if (this.values[0].valor == this.ngModel) {
            return;
        }
        
        if (this.ngModel >= this.configuration.minValue
            && this.ngModel <= this.configuration.maxValue) {
            this.up();
            for (let x=this.configuration.minValue; x<= inicialModel; x++) {
                if (this.ngModel != inicialModel)
                    this.up();
            }
        }
    }

    private createEventOnSpinner(): void {
      let lastY;
      let that = this;
      document.getElementById("touch").ontouchmove = function (e) {
          var currentY = e.changedTouches[0].clientY;
          
          if(currentY > lastY) {
              that.down();
          } else if(currentY < lastY){
              that.up();
          }
          lastY = currentY;
          that.detector.detectChanges()
      };
    }

    private exec: Function;
    private selectValue(value: any) :void {
        this.exec = null;
        if (value.rotate < 0) {
            this.exec = this.up;
        } else {
            this.exec = this.down;
        }

        for (let x=0; x<Math.abs(value.rotate);x++) {
            this.exec();
        }
    }

    private up(): void {
        var obj = this.values[this.values.length-1];
        if (obj.rotate == 0) {
            return;
        }

       this.values.forEach((value) => {
           value.rotate += 2;
           if (value.rotate == 0) {
               this.ngModel = value.valor;
           }
       });

       if (this.configuration.maxValue >= obj.valor+1) {
            this.values.push({
                valor: obj.valor+1,
                rotate: obj.rotate-2
            });
       }
    }

    private down(): void {
        if (this.values[0].rotate == 0) {
            return;
        }

        this.values.forEach((value) => {
           value.rotate -= 2;
           if (value.rotate == 0) {
               this.ngModel = value.valor;
           }
        });
    }

    private getRotateStyle(rotate) : any {
        let style = {
            transform : "rotateX(" + rotate + "deg) translate3d(0px, 0px, 90px)",
            color : this.configuration.fontColorFocusOut,
            fontSize : this.configuration.fontSizeFocusOut
        };

        if (rotate == 0) {
            style.color = this.configuration.fontColorFocusIn;
            style.fontSize = this.configuration.fontSizeFocusIn;
        }

        return style;
    }

    private valuesLengthShows() : Number {
        return this.values
                .filter(v => v.rotate <= 4 && v.rotate >= -4)
                .length;
    }


}
