;(function(){
	"use strict";
	var $add_task = $(".add-task"),
		$delete_task_trigger,
		$detail_task_trigger,
		$task_detail = $(".task-detail"),
		$mask = $(".mask"),
		task_list = [],
		current_index,
		$uptade_form;

	init();

	$add_task.on("submit",function(e){
		var new_task = {};
		// 禁用默认行为
		e.preventDefault();
		// 获取新task值
		var $input = $(this).find("input[name=content]");
		new_task.content = $input.val();
		// 如果新task值为空,返回
		if (!new_task.content) return;
		// 存入新task
		if(addTask(new_task)){
			// renderTaskList();
			$input.val(null);
		}
	})
	// 查找并监听所有详细按钮的点击事件
	function listenTaskDetail(){
		$detail_task_trigger.on("click",function(){
			var $this = $(this);
			var $item = $this.parent();
			var index = $item.data('index');
			showTaskDetail(index);
		})
	}
	// 查看详情
	function showTaskDetail(index){
		renderTaskDetail(index);
		current_index = index;
		$task_detail.show();
		$mask.show();
	}

	function uptade_task(index,data){
		if (index === undefined || !task_list[index]) return;
		task_list[index] = data;
		console.log("store.get(task_list))",store.get("task-list"));

		refreshTaskList();
	}
	//点击外边隐藏详情菜单
	$mask.on("click",hideTaskDetail);
	function hideTaskDetail(){
		$task_detail.hide();
		$mask.hide();
	}

	// 渲染详细信息
	function renderTaskDetail(index){
		if (index === undefined || !task_list[index]) return;
		var item = task_list[index];
		var tpl = 
			'<form>' + 
			'<p class="content"> '+item.content+'</p>' + 
			'<textarea class="desc" name="desc">' + item.desc + '</textarea> ' + 
			'<div class="remind">' + 
			'<input type="date" name="remind_date" />' + 
			'<button type="submit">更新</button>';
			'</form>';
		$task_detail.html(null);
		$task_detail.html(tpl);
		$uptade_form = $task_detail.find("form");
		$uptade_form.on("submit",function(e){
			e.preventDefault();
			var data = {};
			data.content = $(this).find('[class=content]').val();
			data.desc = $(this).find('[name=desc]').val();
			data.remind_date = $(this).find('[name=remind_date]').val();
			uptade_task(index,data);
		})
	}



	// 查找并监听所有删除按钮的点击事件
	function listenTaskDelete(){
		$delete_task_trigger.on("click",function(){
			// 找到删除按钮所在的task元素
			var $this = $(this);
			var	$item = $this.parent();
			var index = $item.data('index');
			
			// 确认删除
			var tmp = confirm("确定删除？");
			tmp ? deleteTask(index) : null;
		})
	}
	
	function addTask(new_task){
		// 将新task推入task_list
		task_list.push(new_task);
		// 更新localStorage
		refreshTaskList();
		return true;
	}

	// 刷新localstorage数据并渲染模板
	function refreshTaskList(){
		store.set("task_list",task_list);
		renderTaskList();
	}
	// 删除一个task
	function deleteTask(index){
		if (index === undefined || !task_list[index]) return;
		delete task_list[index];
		// 更新localStorage
		refreshTaskList();
	}

	function init(){
		// store.clear();
		task_list = store.get("task_list") || [];
		if (task_list.length) renderTaskList();
	}
	// 把task放进列表中
	function renderTaskList(){
		var $task_list = $(".task-list");
		$task_list.html("");
		for(var i=0;i<task_list.length;i++){
			var item = task_list[i];
			var $task = renderTaskItem(item,i);
			$task_list.prepend($task);
		}
		$delete_task_trigger = $(".action.delete");
		$detail_task_trigger = $(".action.detail");
		listenTaskDelete();
		listenTaskDetail();
	}
	// 创建一个task
	function renderTaskItem(data,index){
		if (!data || index ===undefined) return;
		var list_item_tpl =
			'<div class="task-item" data-index= '+ index +' >' + 
			'<span><input type="checkbox" /></span>' + 
			'<span class="task-content">' + data.content + '</span>' + 
			'<span class="action detail">详情</span>' + 
			'<span class="action delete">删除</span>' + 
			'</div>';
		return $(list_item_tpl);
	}

})();