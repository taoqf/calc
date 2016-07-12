import * as $ from 'jquery';

(()=>{
	let totalup = $('#totalup');
	let totaldown = $('#totaldown');

	totalup.val(100);
	totaldown.val(100);

	let used = $('#used');

	let restup = $('#restup');
	let restdown = $('#restdown');
	restup.text(800);
	restdown.text(800);

	let warnup = $('#warnup');
	let warndown = $('#warndown');
	warnup.val(20.00);
	warndown.val(20.00);
	warnup.on('change', recalup);
	warndown.on('change', recaldown);
	function recalup() {
		let total = totalup.val();
		let cost = 0;
		$('.up').each((idx, element) => {
			cost += parseFloat($(element).val());
		});
		let rest = total * (1 - warnup.val() / 100);
		if (0 > rest) {
			warnup.addClass('danger');
			restup.addClass('danger');
		} else {
			warnup.removeClass('danger');
			restup.removeClass('danger');
		}
		restup.text(rest);
	}

	function recaldown() {
		let total = totaldown.val();
		let cost = 0;
		$('.down').each((idx, element) => {
			cost += parseFloat($(element).val());
		});
		let rest = total * (1 - warndown.val() / 100);
		if (0 > rest) {
			warndown.addClass('danger');
			restdown.addClass('danger');
		} else {
			warndown.removeClass('danger');
			restdown.removeClass('danger');
		}
		restdown.text(rest);
	}
	totalup.on('change', recalup);

	totaldown.on('change', recaldown);

	function insert() {
		let tpl = `<tr>
			<td><input class="name" type="text" placeholder="type user name here..." ></td>
			<td><input class="up" type="number" value="0"> </td>
			<td><input class="down" type="number" value="0"></td>
		</tr>`;
		used.append(tpl);
		$('.up:last', used).on('change', recalup);
		$('.down:last', used).on('change', recaldown).one('change', insert);
	}
	insert();
})();

