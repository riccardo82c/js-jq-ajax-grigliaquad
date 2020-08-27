/* Generare una griglia 6 x6(36 boxes), ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9(scegliere API opportuna).
Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
Il numero ottenuto appare al centro del quadrato. */



$(function () {

	for (let i = 0; i < 36; i++) {
		$('.container').append('<div class="square"></div>');
	}

	$('.container').on('click', '.square', function () {

		let quadrato = $(this);
		console.log(quadrato);

		if (!quadrato.hasClass('clicked')) {

			$.ajax({
				'url': "https://flynn.boolean.careers/exercises/api/random/int",
				'method': "GET",
				'success': function (data) {

					quadrato.addClass('clicked');

					let risposta = data.response;
					quadrato.text(risposta);

					risposta >= 5 ? quadrato.addClass('big') : quadrato.addClass('small');
				},
				'error': function () {
					alert("E' avvenuto un errore. ");
				}
			});

		} else {
			alert('already clicked')
		}



	});


	/* funzioni */





});