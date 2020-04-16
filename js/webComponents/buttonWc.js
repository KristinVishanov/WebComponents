const templateButton = document.createElement('template');
templateButton.innerHTML = `
	<style>
	#button{
		color: white;
		padding:5px 10px;
		border: 1px solid transparent;
		border-radius: .25rem;
		border-color: #17a2b8;
		opacity: 0.8;
		background-color: #17a2b8;
		font-family: Verdana;
	}
	#button:hover{
		opacity: 1;
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