"use strict";

function indexOf(arr, x) {
	var index = _.indexOf(arr, x);	//	check primitives
	if (index < 0) index = _.findIndex(arr, x); //	check objs - for sats, groups, receivers, etc
	return index;
}

(function(tvro) {
	//	<jQ>
	//		<table-head>
	//		<table-row>
	var table = function(jQ) {
		var
		table,
		head = $('.\\#table-head', jQ).detach(),
		rowTemp = $('.\\#table-row', jQ).detach(),
		vals = [],
		selVal,
		clickCb = function(row, value) {},
		buildCb = function(row, value) {};

		//	make head stay put on scroll
		jQ.scroll(function() {
			head.css({top:$(this).scrollTop()+'px'});
		});

		return table = {
			//	get set
			vals: function(arg) {
				if (!arguments.length) {
					return vals;
				} else {
					vals = arg;
					return table;
				}
			},

			//	table.value()
			//	get the currently selected value
			//
			//	table.value('value!');
			//	sets the currently selected value without triggering click
			val: function(arg) {
				if (!arguments.length) {
					return selVal;
				} else {
					var index = indexOf(vals, arg);
					if (index != -1) {
						selVal = arg;
						$('.\\#table-row', jQ)
						.removeClass('$sel')
						.eq(index)
						.addClass('$sel');
					}
					return table;
				}
			},

			//	table.click('value!')
			//	click the row with the index of the matching value
			//	table.click(function(row, data) {
			//		callback, do something
			//	});
			click: function(arg) {
				if (_.isFunction(arg)) {
					clickCb = arguments[0];
				} else {
					var index = indexOf(vals, arg);
					if (index != -1) {
						$('.\\#table-row', jQ).eq(index).click();
					}
				}
				return table;
			},

			//	table.build()
			//	builds the table with values.length rows
			//	
			//	table.build(function(row, data) {
			//		on build,
			//		manipulate row before it gets appended
			//	})
			build: function(arg) {
				if (arguments.length) {
					buildCb = arg;
				} else {
					var rows = _.map(vals, function(val) {
						var row = rowTemp.clone(1).click(function() {
							table.val(val)
							selVal = val;
							clickCb($(this), val);
						});

						buildCb(row, val);
						return row;
					});

					head.detach();

					$(jQ)
					.empty()
					.append(head)
					.append(rows)
					.scrollTop(0);
				}
 				return table;
			}
		}
	}

	tvro.table = table;

}(window.tvro = window.tvro || {}));