window.onload = function(){
    new Dashboard();
};

class Dashboard {

  constructor() {
        this.dashboardValue = {
            id : 1,
            value : 0 
        }
        this.salesElement = document.getElementById("dashbaordSales");
        this.salesWidget = new Widget(function(salesValue){
            if (this.dashboardValue.id !== salesValue.id) {  // Make sure they aren't adding a value which has already been added to support future updating.
                console.log("sales updated!");
                this.dashboardValue = salesValue;
                this.salesElement.innerHTML = this.dashboardValue.value;
            }
        });
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
            this.AddSales(this.input.value);
        });
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