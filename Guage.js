(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
		<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <style>
        :host {
            border-radius: 25px;
            border-width: 4px;
            border-color: black;
            border-style: solid;
            display: block;
        } </style> 
		
    `;
    class googleguage extends HTMLElement {
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
            
        }
    }
    customElements.define("com-sample-guage", googleguage);
})();
