const templateButton = document.createElement('template');
templateButton.innerHTML = `
	<style>
	h2{
		color: green;
	}
	#button{
	height: 30px;
	}
	</style>
	<button id="button">Click Me!</button>
`;

class Button extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(templateButton.content.cloneNode(true));
        this.shadowRoot.querySelector('button').innerHTML = this.getAttribute('title');
        this.shadowRoot.querySelector('button').type = this.getAttribute('type');
        this.isRedirectPage = this.getAttribute('redirectPage');
        this.str = this.getAttribute('class');
        if (this.str != null && this.str.length > 0){
            this.res = this.str.split(" ");
            console.log(this.res);
            this.res.forEach(style1 => this.shadowRoot.querySelector('button').classList.add(style1))
		}
	}

	connectedCallback(){
        this.shadowRoot.querySelector('#button').addEventListener('click', ()=> this.analyzeAttributes())
	}

	disconnectedCallback(){
        this.shadowRoot.querySelector('#button').removeEventListener()
	}

    analyzeAttributes(){
		if (this.isRedirectPage !== undefined && this.isRedirectPage.length > 0){
            window.location.href = this.isRedirectPage;
		}
	}
}

window.customElements.define('button-wc', Button);