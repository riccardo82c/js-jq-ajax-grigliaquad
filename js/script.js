/* Generare una griglia 6 x6(36 boxes), ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9(scegliere API opportuna).
Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
Il numero ottenuto appare al centro del quadrato. */

$(function () {
	const squareNumber = 36;


	// metodo on('click') mi permette di definire un evento ad un elemento, tale evento può essere associato anche ad un elemento che non è ancora stato creato, poichè on permette di RESTARE IN ATTESA della creazione della griglia.
	$('.container').on('click', '.square', function () {

		/* Setto $(this) in una variabile poichè se la dichiarassi dentro la chiamata AJAX andrebbe a prendere il valore dell'oggetto della chiamata*/
		let quadrato = $(this);

		// Se quadrato NON ha la classe clicked...
		if (!quadrato.hasClass('clicked')) {

			// Chiamata ad AJAX
			$.ajax({
				'url': "https://flynn.boolean.careers/exercises/api/random/int",
				'method': "GET",
				// In caso di success della chiamata chiamo la funzione che come parametri mi restituisce data (valore restituito dalla chiamata)
				'success': function (data, stato, jq) {

					retrieveNumber(data, quadrato);

				},
				// In caso di errore
				'error': function (richiesta, stato, errori) {

					alert("E' avvenuto un errore.");
				}
			});

			// Se quadrato HA la classe clicked...
		} else {
			// richiamo la funzione fading per avviare l'animazione
			fading(quadrato);
			console.log('already clicked');
		}
	});

	// Creo la griglia tramite .append(template string). Posso invocare la creazione della griglia senza problemi poichè uso on('click') partendo dall'elemento genitore (esistente) sull'elemento figlio (ancora da creare). Ascoltatore di eventi
	createGrid();

	/* funzioni */


	function createGrid() {
		for (let i = 0; i < squareNumber; i++) {
			$('.container').append('<div class="square"></div>');
		}

	}

	function retrieveNumber(obj, element) {
		element.addClass('clicked');
		let risposta = obj.response;
		element.text(risposta);
		risposta >= 5 ? element.addClass('big') : element.addClass('small');
		// Se il numero di quadrati con la classe clicked è uguale al numero di quadrati faccio li reload della pagina
		if ($('.square.clicked').length == squareNumber) {
			alert('Game End');
			location.reload();
		}
	}


	function fading(element) {
		for (let i = 0; i < 2; i++) {
			element.fadeOut(100);
			element.fadeIn(100);
		}
	}

});