/* Generare una griglia 6 x6(36 boxes), ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9(scegliere API opportuna).
Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
Il numero ottenuto appare al centro del quadrato. */



$(function () {

	$('.container').on('click', '.square', function () {

		let quadrato = $(this);


		if (!quadrato.hasClass('clicked')) {

			$.ajax({
				'url': "https://flynn.boolean.careers/exercises/api/random/int",
				'method': "GET",
				'success': function (data, text, jq) {
					retrieveNumber(data, quadrato);
				},
				'error': function () {
					alert("E' avvenuto un errore. ");
				}
			});

		} else {
			fading(quadrato);
			console.log('already clicked');
		}



	});

	for (let i = 0; i < 36; i++) {
		$('.container').append('<div class="square"></div>');
	}



	/* funzioni */

	function retrieveNumber(obj, element) {
		element.addClass('clicked');
		let risposta = obj.response;
		element.text(risposta);
		risposta >= 5 ? element.addClass('big') : element.addClass('small');
	}


	function fading(element) {
		for (let i = 0; i < 6; i++) {
			element.fadeOut(80);
			element.fadeIn(80);
		}
	}
	/* 
		function animation(element) {

			element.animate({
				scale: 1.1,

				opacity: 0.4

			}, 200);

			element.animate({
				scale: 1,
				opacity: 1

			}, 200);
		} */

});