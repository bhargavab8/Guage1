(function() { 
	
	let template = document.createElement("template");
	template.innerHTML = `
			<style>
				:host {
					display: block;
				} 
			</style> 
		<div id="chart_div"></div>`;

	let script = document.createElement("script");
	script.type = 'text/javascript';
    script.async = true;
    script.src = "https://www.gstatic.com/charts/loader.js";

	class GoogleGauge extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(script);
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}
		
		connectedCallback(){
			
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };

		}

		onCustomWidgetAfterUpdate(changedProperties) {
			
			this._props = { ...this._props, ...changedProperties };

			var ctx = this.shadowRoot.getElementById('chart_div');

			var myprops = this._props
			
			google.charts.load('current', {'packages':['gauge']});
			google.charts.setOnLoadCallback(function() {
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

				var chart = new google.visualization.Gauge(ctx);
				chart.draw(data, options);
			}
		}
	}

	customElements.define("com-sample-guage", GoogleGauge);
})();
