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
	    
        function () 
		 {
 
                const script = document.createElement('script');
                script.type = 'text/javascript';
				script.async = true;
				script.onload= function () {
									
				}

                script.src = 'https://www.gstatic.com/charts/loader.js';
                //Append it to the document header
                document.head.appendChild(script);
            
	    }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };

	    	
        }
    }
    customElements.define("com-sample-guage", GoogleGauge);
})();
