// Global variables
var selectedCard = [],
	turn = 0,
	amount = 0,
	completed = 0;

function startGame() {
	// Store DOM elements
	var html = $('html'),
		body = $('body'),
		stack = $('.stack'),
		cards = stack.find($('.card')),
		sfxFail = $('.sfx-fail'),
		sfxSuccess = $('.sfx-success'),
		sfxApplause = $('.sfx-applause');

	// Switch views
	html.removeClass('end-game start-game').addClass('start-game');

	// Stop eventual sounds
	sfxApplause[0].pause();

	// Loop through cards
	cards.each(function(index) {
		var _this = this;

		// Count the cards
		amount++;

		// Add ID to card
		$(_this).data('id', index);

		// Clone card
		var clones = $(_this).clone(true).appendTo(stack);

		// Bind click event
		$(_this).add(clones).on('click', function() {
			var _this = this;

			if (!$(_this).hasClass('active')) {

				// Push selected card to selected stack and add .active class
				selectedCard.push($(_this).addClass('active'));

				if (turn === 1 && $(selectedCard)[0].data('id') === $(_this).data('id') && completed < amount) {
					turn--;
					setTimeout(function() {
						html.addClass('success');
						sfxSuccess[0].play();
					}, 300);
					setTimeout(function() {
						html.removeClass('success');
						completed++;

						$.each(selectedCard, function() {
							$(this).addClass('completed').off('click');
						});
						turn = 0;
						selectedCard.length = 0;

						if (completed === amount) {
							html.addClass('end-game');
							sfxApplause[0].play();
						}
					}, 1000);
				} else if (turn === 1) {
					turn--;
					setTimeout(function() {
						html.addClass('fail');
						sfxFail[0].play();
					}, 300);
					setTimeout(function() {
						html.removeClass('fail');

						$.each(selectedCard, function() {
							$(this).removeClass('active');
						});
						turn = 0;
						selectedCard.length = 0;
					}, 1000);
				} else {
					turn++;
				}
			}
		});
	});

	// Re-order elements
	stack.find('.card').sort(function() {
		return Math.random()*10 > 5 ? 1 : -1;
	}).each(function() {
		// Replace old stack with new random stack and assign random colors (between 1-8)
		var _this = this,
			randomcolor = Math.floor(Math.random() * (8 - 1 + 1)) + 1;

		$(_this).addClass('color-'+randomcolor).appendTo($(_this).parent());
	});
}

// Shall we begin? Yes Lisa...
$(function() {
	// Bind click event to Start Game button
	$('.init-game').on('click', function() {
		startGame();
	});
});