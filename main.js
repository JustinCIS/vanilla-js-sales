window.onload = function(){
    new Dashboard();
};

class Dashboard {

  constructor() {
        this.dashboardValues = [];
      this.dashboardValue = {
            id : 1,
            value : 0 
        }
        this.dashboardValues.push(this.dashboardValue);
        this.salesElement = document.getElementById("dashbaordSales");
        this.salesWidget = new Widget(function(salesValue){
            var foundValueId = this.dashboardValues.find(val => {
                return val.id == salesValue.id;
            });
            if (foundValueId !== salesValue.id) {  // Make sure they aren't adding a value which has already been added to support future updating.
                console.log("sales updated!");
                this.dashboardValue = salesValue;
                this.dashboardValues.push({ id: this.dashboardValue.id, value: this.dashboardValue.value });
                var sum = this.dashboardValues.reduce((a, b) => {
                    return a + b.value;
                }, 0);
                var audit = this.dashboardValues.map(val => {
                    return '<br>-Sale #:' + val.id + ': ' + val.value;
                });
                console.debug(audit);
                this.salesElement.innerHTML = audit.join('') + (sum < 0 ? ('<span style=\'color:red\'><br><br>Total: ' + sum + '</span>') : ('<br><br>Total: ' + sum));
            }
        }.bind(this));
    }
}

class Widget {
    constructor(callback){
        this.callback = callback;
        this.displayElement = document.getElementById("widgetValue");

        this.widgetValue = {
            id : 1,
            value : 0 
        }

        this.input = document.getElementById("widgetText");
        this.button = document.getElementById("widgetButton");
        this.button.addEventListener("click", function() {
            this.AddSales(parseInt(this.input.value));
        }.bind(this));
    }

    AddSales(value)
    {
        this.widgetValue.id += 1;
        this.widgetValue.value = value;
        this.displayElement.innerHTML = this.widgetValue.value;
        this.callback(this.widgetValue);
    }

    // TODO AddColorValidation 
    SetColor(){
        // if Sales < 0 color is red. 
    }
}