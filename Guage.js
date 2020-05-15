(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `
      <style>
      :host {
          display: block;
      } 
  </style> 
<div id="chart_div"></div>`;
    
    class GoogleGauge extends HTMLElement {
		    constructor() {
			      super(); 
			      let shadowRoot = this.attachShadow({mode: "open"});
			      shadowRoot.appendChild(template.content.cloneNode(true));
			
			      this.addEventListener("click", event => {
				        var event = new Event("onClick");
				        this.dispatchEvent(event);
			      });
			      this._props = {};
		    }
	    
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
            var myprops = this._props
			
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.onload = function () {                  
					google.charts.load('current', {'packages':['gauge']});
					google.charts.setOnLoadCallback(function(){
						drawChart(myprops);
					});
					function drawChart(props) {                                                
							var data = google.visualization.arrayToDataTable([
							['Label', 'Value'],
							[props.label, props.value]
							]);
			
							var options = {
							chartArea: {
							
								width: '94%'
								},
								legend: {
								position: 'top'
								},
								width: '100%',
							redFrom: props.redFrom, redTo: props.redTo,
							yellowFrom:props.yellowFrom, yellowTo: props.yellowTo,
							minorTicks: 5
							};
							const ctx = document.querySelector(".sapCustomWidgetWebComponent").shadowRoot.querySelector("#chart_div");
																
							var chart = new google.visualization.Gauge(ctx);
							chart.draw(data, options);
							};                                                            
				}
			script.src = 'https://www.gstatic.com/charts/loader.js';
			//Append it to the document header
			document.head.appendChild(script);
            }
    }
    customElements.define("com-sample-guage", GoogleGauge);
})();
