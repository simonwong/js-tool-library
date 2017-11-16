;(function () {
	'use strict';

	var $window = $(window),
		$body = $("body"),
		$taskInput = $(".task-input"),
		$taskForm = $(".add-task"),
		$taskList = $(".task-list"),
		$taskdelete = $(".action.delete");

	var	taskArray = [],
		completeArray = [];
	
	// submit事件，新建todo
	var addTaskSubmit = function addTaskSubmit (e) {
		e.preventDefault();
		var newTask = {};
		var taskVal = $taskInput.val();
		if (taskVal) {
			newTask.content = taskVal;
			taskArray.unshift(newTask);
			$taskInput.val("");
			store.set();
			$taskList.prepend(renderTaskItem(newTask))
		}
	};

	// 渲染任务列表
	var renderTaskList = function renderTaskList () {
		if (store.get() !== null) {
			taskArray = store.get();
			var taskListHtml = "";
			var	i;
			console.log(taskArray);
			$taskList.html('');
			for (i = 0; i < taskArray.length; i++) {
				taskListHtml += renderTaskItem(taskArray[i]);
			}
			$taskList.html(taskListHtml);
		}
		// store.clear();
	};

	// 渲染单挑任务
	var renderTaskItem = function renderTaskItem (data) {
		if (data) {
			var itemHtml = 
				'<li class="' + (data.complete ? 'task-item completed' : 'task-item') + '">' +
					'<input class="complete"' + (data.complete ? 'checked' : '') + ' type="checkbox">' +
					'<span class="task-content">' + data.content + '</span>' +
					'<span class="fr">' +
						'<span class="action detail"> 详细</span>' +
						'<span class="action delete"> 删除</span>' +
					'</span>' +
				'</li>';
			return itemHtml;
		}
	};

	// 完成任务
	var completeTask = function completeTask () {
		var taskItem = $(this).parent();
		var index = taskItem.index();

		if (taskArray[index].complete) {
			taskArray[index].complete = false;
		} else {
			taskArray[index].complete = true;
		}
		store.set();
		updateTaskList();
		renderTaskList();
	}

	// 删除任务
	var deleteTask = function deleteTask () {
		var that = $(this);
		pop("确定删除？").done(function () {
			var taskItem = that.parent().parent();
			var index = taskItem.index();
			taskArray.splice(index, 1);
			store.set();
			taskItem.remove();
		})
	};

	// localStorage存取
	var store = {
		set: function () {
			var str = JSON.stringify(taskArray);
			localStorage.setItem("myTasks", str);
		},
		get: function () {
			var str = localStorage.getItem("myTasks");
			return JSON.parse(str)
		},
		clear: function () {
			localStorage.clear();
		}
	};

	// 更新数组
	var updateTaskList = function updateTaskList () {
		var i, j;
		completeArray = [];
		for (i = 0; i < taskArray.length; i++) {
			if (taskArray[i].complete) {
				completeArray.push(taskArray[i]);
				taskArray.splice(i, 1);
				i--;
			}
		}
		for (j = 0; j < completeArray.length; j++) {
			taskArray.push(completeArray[j]);
		}
		store.set();
	}

	// 自定义comfirm弹窗
	var pop = function pop (arg) {
		if (arg) {
			var conf = {},
				dfd = $.Deferred(), // 新建一个deferred对象
				$box,
				$confirm,
				$cancel,
				$mask;

			if (typeof arg === 'string') {
				conf.title = arg;
			} else {
				conf = $.extend(conf, arg);
			}
			$box = $('<div class="pop-alert">' +
					'<div class="pop-title">' + conf.title + '</div>' +
					'<div class="pop-content">' +
						'<button style="margin-right: 5px;" class="primary confirm">确定</button>' +
						'<button class="cancel">取消</button>' +
					'</div>' +
				'</div>' + 
				'<div class="pop-mask"></div>');

			var active = function active (flag) {
				if (flag) {
					dfd.resolve();
				}
				$box.remove();
			}

			$box.on("click", ".confirm", function () {
				active(true)
			});
			$box.on("click", ".cancel", function () {
				active()
			});
			$box.on("click", ".pop-mask", function () {
				active()
			});

			$body.append($box);
			return dfd.promise();
		} else {
			console.error('pop title is required');
		}
	};

	renderTaskList();
	$taskForm.on("submit", addTaskSubmit);
	$taskList.on("click", ".task-item .delete", deleteTask);
	$taskList.on("click", ".task-item .complete", completeTask);
})();