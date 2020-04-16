const templateClock = document.createElement('template');
templateClock.innerHTML = `
	<style>
	#clock{
		font-size: 2em;
	}
	</style>
	<div id="clock"></div>
`;

class Clock extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(templateClock.content.cloneNode(true));

	}

	connectedCallback(){
        this.interval = window.setInterval(() => {
			this.date = new Date().toLocaleTimeString('bg');
            this.shadowRoot.getElementById('clock').innerHTML = this.date;
        });
	}

	disconnectedCallback(){
        window.clearInterval(this.interval);
	}

}

window.customElements.define('clock-wc', Clock);