const templateUserCard = document.createElement('template');
templateUserCard.innerHTML = `
	<style>
		h2{
			color: green;
		}
		.user-card{
			padding: 10px;
			border: 1px solid green;
		}
	</style>
<div class="user-card">
	<div>
		<h2></h2>
	</div>
	<div class="info">
		<p class="text-info"><slot name="email"/></p>
		<p><slot name="phone"/></p>
		<p><slot name="description"/></p>
	</div>
	<button id="toggle-info">Hide Info</button>
</div>
`;

class UserCard extends HTMLElement{
	constructor(){
		super();
		this.showInfo = true;

		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(templateUserCard.content.cloneNode(true));
        this.shadowRoot.querySelector('h2').innerHTML = this.getAttribute('name');
	}

	connectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', ()=> this.toggleInfo())
	}

	disconnectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').removeEventListener()
	}

    toggleInfo(){
		this.showInfo = !this.showInfo;
		const info = this.shadowRoot.querySelector('.info');
		const toggleBtn = this.shadowRoot.querySelector('#toggle-info');
		if (this.showInfo){
			info.style.display = 'block';
			toggleBtn.innerText = 'Hide Info';
		} else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info';
		}
	}
}

window.customElements.define('user-card-wc', UserCard);