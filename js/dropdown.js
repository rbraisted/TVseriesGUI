"use strict";

(function(tvro) {

	var dropdown = function(jQ) {
		var
		dropdown,
		table = tvro.table(
			$('.\\#dropdown-table-view', jQ)
			.find('.\\#table-row')
			.click(function() {
				$(jQ).hide();
			})
			.end()
		)
		.build(function(row, data) {
			$('.\\#dropdown-val', jQ).text(data);
		})
		.click(function(row, data) {
			$(jQ).hide();
		});

		$('.\\#close-btn', jQ).click(function() {
			$(jQ).hide();
		});

		return dropdown = _.merge(table, {
			offset: function(arg) {
				if (!arguments.length) {
					return $('.\\#dropdown-content', jQ).offset();
				} else {
					$('.\\#dropdown-content', jQ).offset(arg);
					return dropdown;
				}
			},
			show: function() {
				$(jQ).show();
				return dropdown;
			},
			hide: function() {
				$(jQ).hide();
				return dropdown;
			},
			title: function(arg) {
				if (!arguments.length) {
					return $('.\\#dropdown-title', jQ).text();
				} else {
					$('.\\#dropdown-title', jQ).text(arg);
					return dropdown;
				}
			}
		});
	}

	tvro.dropdown = dropdown;

}(window.tvro = window.tvro || {}));