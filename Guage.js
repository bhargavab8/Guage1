(function() { 
    let template = document.createElement("template");
	  template.innerHTML = `
      <style>
      :host {
          display: block;
      } 
  </style> 
<div id="chart_div"></div>`;
    
    let gLibLoaded = false;
    
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
	    
        render(val) {
            if(!gLibLoaded){
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.onload = function () {
                    gLibLoaded = true;
                    
                    if(val!==''){
                        var ctx = this.shadowRoot.getElementById('chart_div');
                      
                        google.charts.load('current', {'packages':['gauge']});
                        google.charts.setOnLoadCallback(function() {
                            drawChart(val);
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
            
                            var chart = new google.visualization.Gauge(ctx);
                            chart.draw(data, options);
                        }                           
                    }
                }
                script.src = 'https://www.gstatic.com/charts/loader.js';
                //Append it to the document header
                document.head.appendChild(script);
            }
	    }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            var myprops = this._props
	        this.render(myprops);
	    	
        }
    }
    customElements.define("com-sample-guage", GoogleGauge);
})();
