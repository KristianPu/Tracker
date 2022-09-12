class DivFloat extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <div class="bottom-float">
            <a href="#first"><img class="bottom-right-icon" src="../../app/icons/record.png" alt=""></a>
        </div>
        `
    }
}

customElements.define('record-float', DivFloat);