;(function () {
	'use strict';

	var $form_add_task = $('.add-task'),
		$window = $(window),
		$body = $('body'),
		$task_delete_trigger,
		$task_detail,
		$task_detail_trigger,
		$task_detail = $('.task-detail'),
		$task_detail_mask = $('.task-detail-mask'),
		task_list = [],
		current_index,
		$update_form,
		$task_detail_content,
		$task_detail_content_input,
		$checkbox_complete,
		$msg = $('.msg'),
		$msg_content = $msg.find('.msg-content'),
		$msg_confirm = $msg.find('.confirmed'),
		$alerter = $('.alerter');

	init();

	$form_add_task.on('submit', onAddTaskSubmit)
	$task_detail_mask.on('click', hideTaskDetail)

	// 自定义alert
	function pop(arg) {
		if (!arg) {
			console.error('pop title is required');
		}

		var conf = {},
			$box,
			$mask,
			$title,
			$content,
			$confirm,
			$cancel,
			timer,
			dfd,
			confirmed;

		dfd = $.Deferred();

		if (typeof arg == 'string') {
			conf.title = arg;
		}
		else {
			conf = $.extend(conf, arg);
		}

		$box = $('<div class="pop-alert">' +
			'<div class="pop-title">' + conf.title + '</div>' +
			'<div class="pop-content">' +
			'<button style="margin-right: 5px;" class="primary confirm">确定</button>' +
			'<button class="cancel">取消</button>' +
			'</div>' +
			'</div>')

		$content = $box.find('.pop-content');
		$confirm = $content.find('button.confirm');
		$cancel = $content.find('button.cancel');

		$mask = $('<div class="pop-mask"></div>')
			.css({
				position: 'fixed',
				background: 'rgba(0,0,0,.5)',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			})

		timer = setInterval(function () {
			if (confirmed !== undefined) {
				dfd.resolve(confirmed);
				clearInterval(timer);
				dismissPop();
			}
		}, 50)

		$confirm.on('click', onConfirmed)
		$cancel.on('click', onCancel);
		$mask.on('click', onCancel);

		function onCancel() {
			confirmed = false;
		}

		function onConfirmed() {
			confirmed = true;
		}

		function dismissPop() {
			$mask.remove();
			$box.remove();
		}

		function adjustBoxPosition() {
			var window_width = $window.width(),
				window_height = $window.height(),
				box_width = $box.width(),
				box_height = $box.height(),
				move_x,
				move_y;

			move_x = (window_width - box_width) / 2;
			move_y = ((window_height - box_height) / 2) - 20;

			$box.css({
				left: move_x,
				top: move_y,
			})
	    }

		$window.on('resize', function () {
			adjustBoxPosition();
		})
		$mask.appendTo($body);
		$box.appendTo($body);
		$window.resize();
		return dfd.promise();
	}

	function listenMsgEvent() {
		$msg_confirm.on('click', function () {
			hideMsg();
		})
	}

	function onAddTaskSubmit(e) {
		var new_task = {}, $input;
		// 禁用默认行为
		e.preventDefault();
		// 获取新Task的值
		$input = $(this).find('input[name=content]');
		new_task.content = $input.val();
		// 如果新Task的值为空 则直接返回 否则继续执行
		if (!new_task.content) return;
		// 存入新Task
		if (addTask(new_task)) {
			// renderTaskList();
			$input.val(null);
		}
	}

	// 监听打开Task详情事件
	function listenTaskDetail() {
		var index;
		$('.task-item').on('dblclick', function () {
			index = $(this).data('index');
			showTaskDetail(index);
		})

		$task_detail_trigger.on('click', function () {
			var $this = $(this);
			var $item = $this.parent().parent();
			index = $item.data('index');
			showTaskDetail(index);
		})
	}

	// 监听完成Task事件
	function listenCheckboxComplete() {
		$checkbox_complete.on('click', function () {
			var $this = $(this);
			var index = $this.parent().parent().data('index');
			var item = get(index);
			if (item.complete){
				updateTask(index, {complete: false});
			}else{
				updateTask(index, {complete: true});
			}
		})
	}

	function get(index) {
		return store.get('task_list')[index];
	}

	// 查看Task详情
	function showTaskDetail(index) {
		// 生成详情模板
		renderTaskDetail(index);
		current_index = index;
		// 显示详情模板(默认隐藏)
		$task_detail.show();
		// 显示详情模板mask(默认隐藏)
		$task_detail_mask.show();
		// 遍历循环，如果task条数较少，把位置往下移动
		var $task_item = $(".task-item");
		for (var i=0;i<$task_item.length;i++){
			var num = $task_item.length;
			if (num < 5) {
				$task_detail.css('bottom','-150px');
			}else{
				$task_detail.css('bottom','0px');
			}
		}
	}

	/*更新Task*/
	function updateTask(index, data) {
		if (index === undefined || !task_list[index]) return;

		task_list[index] = $.extend({}, task_list[index], data);
		refreshTaskList();
	}

	/*隐藏Task详情*/
	function hideTaskDetail() {
		$task_detail.hide();
		$task_detail_mask.hide();
	}

	/*渲染指定Task的详细信息*/
	function renderTaskDetail(index) {
		if (index === undefined || !task_list[index]) return;

		var item = task_list[index];

		var tpl =
			'<form>' + 
			'<p class="content"> ' + item.content + '</p>' + 
			'<input type="text" name="content" class="content-input" value="' +(item.content || '')+ '">' +
			'<textarea class="desc" name="desc">' + (item.desc || '') + '</textarea> ' + 
			'<div class="remind input-item">' + 
			'<label>提醒时间</label>' +
			'<input class="datetime" name="remind_date" type="text" value="' + (item.remind_date || '') + '">' +
			'<button type="submit">更新</button>';
			'</div>' +
			'</form>';

		// 用新模板替换旧模板
		$task_detail.html(null);
		$task_detail.html(tpl);
		$('.datetime').datetimepicker();
		/*选中其中的form元素, 因为之后会使用其监听submit事件*/
		$update_form = $task_detail.find('form');
		/*选中显示Task内容的元素*/
		$task_detail_content = $update_form.find('.content');
		/*选中Task input的元素*/
		$task_detail_content_input = $update_form.find('[name=content]');

		/*双击内容元素显示input, 隐藏自己*/
		$task_detail_content.on('dblclick', function () {
			$task_detail_content_input.show();
			$task_detail_content.hide();
		})

		$update_form.on('submit', function (e) {
			e.preventDefault();
			var data = {};
			/*获取表单中各个input的值*/
			data.content = $(this).find('[name=content]').val();
			data.desc = $(this).find('[name=desc]').val();
			data.remind_date = $(this).find('[name=remind_date]').val();

			updateTask(index, data)
			hideTaskDetail();
		})
	}

	/*查找并监听所有删除按钮的点击事件*/
	function listenTaskDelete() {
		$task_delete_trigger.on('click', function () {
			var $this = $(this);
			/*找到删除按钮所在的task元素*/
			var $item = $this.parent().parent();
			var index = $item.data('index');
			/*确认删除*/
			pop('确定删除?')
			.then(function (r) {
				r ? deleteTask(index) : null;
			})
		})
	}

	function addTask(new_task) {
		/*将新Task推入task_list*/
		task_list.push(new_task);
		/*更新localStorage*/
		refreshTaskList();
		return true;
	}

	/*
	* 刷新localStorage数据并渲染模板
	* */
	function refreshTaskList() {
		store.set('task_list', task_list);
		renderTaskList();
	}

	/*删除一条Task*/
	function deleteTask(index) {
		/*如果没有index 或者index不存在则直接返回*/
		if (index === undefined || !task_list[index]) return;

		delete task_list[index];
		/*更新localStorage*/
		refreshTaskList();
	}

	function init() {
		// store.clear();
		task_list = store.get('task_list') || [];
		listenMsgEvent();
		if (task_list.length) renderTaskList();
		taskRemindCheck();
  }
  	// 提醒功能实现
	function taskRemindCheck() {
		var current_timestamp;
		var itl = setInterval(function () {
			for (var i = 0; i < task_list.length; i++) {
				var item = get(i), task_timestamp;
				if (!item || !item.remind_date || item.informed) continue;

				current_timestamp = (new Date()).getTime();
				task_timestamp = (new Date(item.remind_date)).getTime();
				if (current_timestamp - task_timestamp >= 1) {
					updateTask(i, {informed: true});
					showMsg(item.content);
				}
			}
		}, 300);
	}

	function showMsg(msg) {
		if (!msg) return;

		$msg_content.html(msg);
		$alerter.get(0).play();
		$msg.show();
	}

	function hideMsg() {
		$msg.hide();
	}

	/*
	* 渲染所有Task模板
	* */
	function renderTaskList() {
		var $task_list = $('.task-list');
		$task_list.html('');
		var complete_items = [];
		for (var i = 0; i < task_list.length; i++) {
			var item = task_list[i];
			if (item && item.complete) {
				complete_items[i] = item;
			}
			else{
	        	var $task = renderTaskItem(item, i);
	        }
			$task_list.prepend($task);
		}

		for (var j = 0; j < complete_items.length; j++) {
			$task = renderTaskItem(complete_items[j], j);
			if (!$task) continue;
			$task.addClass('completed');
			$task_list.append($task);
		}

		$task_delete_trigger = $('.action.delete')
		$task_detail_trigger = $('.action.detail')
		$checkbox_complete = $('.task-list .complete[type=checkbox]')
		listenTaskDelete();
		listenTaskDetail();
		listenCheckboxComplete();
	}

	/*
	*渲染单条Task模板
	* */
	function renderTaskItem(data, index) {
		if (!data || index ===undefined) return;
		var list_item_tpl =
			'<div class="task-item" data-index="' + index + '">' +
			'<span><input class="complete" ' + (data.complete ? 'checked' : '') + ' type="checkbox"></span>' +
			'<span class="task-content">' + data.content + '</span>' +
			'<span class="fr">' +
			'<span class="action detail"> 详细</span>' +
			'<span class="action delete"> 删除</span>' +
			'</span>' +
			'</div>';
		return $(list_item_tpl);
	}

})();



// !function(win) {
//     function resize() {
//         var domWidth = domEle.getBoundingClientRect().width;
//         if(domWidth / v > 540){
//             domWidth = 540 * v;
//         }
//         win.rem = domWidth / 16;
//         domEle.style.fontSize = win.rem + "px";
//     }
//     var v, initial_scale, timeCode, dom = win.document, domEle = dom.documentElement, viewport = dom.querySelector('meta[name="viewport"]'), flexible = dom.querySelector('meta[name="flexible"]');
//     if (viewport) {
//         var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
//         if(o){
//             initial_scale = parseFloat(o[2]);
//             v = parseInt(1 / initial_scale);
//         }
//     } else if(flexible) {
//         var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
//         if (o) {
//             v = parseFloat(o[2]);
//             initial_scale = parseFloat((1 / v).toFixed(2))
//         }
//     }
//     if (!v && !initial_scale) {
//         var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
//         v = win.devicePixelRatio;
//         v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, initial_scale = 1 / v
//     }
//     //没有viewport标签的情况下
//     if (domEle.setAttribute("data-dpr", v), !viewport) {
//         if (viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
//             domEle.firstElementChild.appendChild(viewport)
//         } else {
//             var m = dom.createElement("div");
//             m.appendChild(viewport), dom.write(m.innerHTML)
//         }
//     }
//     win.dpr = v;
//     win.addEventListener("resize", function() {
//         clearTimeout(timeCode), timeCode = setTimeout(resize, 300)
//     }, false);
//     win.addEventListener("pageshow", function(b) {
//         b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300))
//     }, false);
//     resize();
// }(window);