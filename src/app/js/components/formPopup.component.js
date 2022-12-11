class formPopup extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <div class="popup" id="popup">
            <form>
                <label for="tname">Task name:</label><br>
                <input type="text" id="tname" name="tname" required placeholder="Task Name"><br>
                <label for="sdate">Start date:</label><br>
                <input type="date" id="sdate" name="sdate" placeholder="MM/DD/YYYY"><br>
                <label for="edate">End date:</label><br>
                <input type="date" id="edate" name="edate" placeholder="MM/DD/YYYY"><br>
                <label for="tspent">Time spent:</label><br>
                <input type="text" id="tspent" name="tspent" placeholder="1h 30m"><br>
                <button type="button" class="btn" id="cancel-button">Cancel</button>
                <button type="button" id="cancel-button">Submit</button>
            </form>
        </div>
        `
    }
}

customElements.define('form-popup', formPopup)