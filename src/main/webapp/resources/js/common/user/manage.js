var $table = $('#table');
var treeObj;
var userId;
debugger;
	$(function() {
		$table.bootstrapTable({
			method : 'post',
			contentType : "application/x-www-form-urlencoded",//必须要有！！！！

			url : getRootPath_web() + '/common/user/list',
			striped : true, //是否显示行间隔色
			pageNumber : 1, //初始化加载第一页，默认第一页
			pagination : true,//是否分页
			queryParamsType : 'limit',//查询参数组织方式
			queryParams : queryParams,//请求服务器时所传的参数
			sidePagination : 'server',//指定服务器端分页
			pageSize : 10,//单页记录数
			pageList : [10,25, 30, 35, 50 ],//分页步进值
			showRefresh : true,//刷新按钮
			showColumns : true,
			clickToSelect : true,//是否启用点击选中行
			dataType : 'json',

			idField : 'userCode',// 指定主键列
			singleSelect : true,
			search : true,
			cache : false,
			style:"word-break:break-all; word-wrap:break-all;",	
		method:"post",
		
		columns : [ {
			field : 'state',
			checkbox : true
		}, {
			field : 'userCode',
			title : '用户名',
			align : 'center'
		}, {
			field : 'userName',
			title : '姓名',
			align : 'center'
		}/*, {
			field : 'userAddress',
			title : '地址',
			align : 'center'
		}*/, {
			field : 'userEmail',
			title : '邮箱',
			align : 'center'
		}, {
			field : 'userPhone',
			title : '电话',
			align : 'center'
		}/*, {
			field : 'userBirthday',
			title : '生日',
			align : 'center'
		}*//*, {
			field : 'userJoindate',
			title : '注册时间',
			align : 'center',
			sortable : true
		}, {
			field : 'userType',
			title : '用户类型',
			align : 'center'
		}*/, {
			field : 'userValid',
			title : '是否有效',
			align : 'center',
			formatter : function(value, row, index) {
				if (value) {
					return '<span class="label label-info">正常</span>';
				} else {
					return '<span class="label label-danger">失效</span>';
				}
			}
		} ,{
  			field : 'Manipulate',
  			title : '操作',
  			align : 'center',
  			formatter : function(value, row, index) {//annotation 布置两组按钮操作？
  				return "<button type='button' class='btn  btn-success btn-sm' onclick='rest("+index+")'>密码初始化</button>";
  			}
  		}]
	});
  });
	
	//密码初始化
	function rest(index){
		debugger;
		var currentrow = $table.bootstrapTable('getData', {useCurrentPage:true})[index];
		debugger;
		

		$.confirm({
			type : 'green',
			animationSpeed : 300,
			title : false,
			content : '确认初始化密码？初始化密码为：123456',
			buttons : {
				confirm : {
					text : '确认',
					btnClass : 'waves-effect waves-button',
					action : function() {
						$.post(getRootPath_web()+'/common/user/updatePassword', {
							'userId' : currentrow.userId,
							'password' :"123456",
							'userName' : currentrow.userCode
						}, function(data) {
							$('#roleModal').modal('hide');
							$.alert(data.msg);
						});}
				},
				cancel : {
					text : '取消',
					btnClass : 'waves-effect waves-button'
				}
			}
		});
		return false;
		
		
	}
	
	
	//请求服务数据时所传参数
	function queryParams(params) {
		debugger;
		return {
			//每页多少条数据
			limit : params.limit,
			//请求第几页
			offset : params.offset,
			Name : $('#search_name').val(),
			Tel : $('#search_tel').val()
		}
	}
	// 加载角色 tree 结构
	function loadRoleTree() {
		
		// 角色管理 tree 构建
		var setting = {
			async : {
				enable : true,
				url : getRootPath_web()+"/common/role/roleCheckedTree",
				//url : getRootPath_web()+"/common/role/roleTree",
				autoParam : [ "id", "pid", "name", "level" ],
				otherParam : {
					"userId" : userId
				}
			},
			check : {
				enable : true,
				chkStyle : "checkbox",
				chkboxType : {
					"Y" : "s",
					"N" : "s"
				}
			},
			view : {
				fontCss : setFontCss
			}
		};
		debugger;
		$('#roleModal').modal('show');
		// 初始化 tree 数据
		treeObj = $.fn.zTree.init($('#roleZtree'), setting);
		treeObj.expandAll(true);
		// 设置样式
		function setFontCss(treeId, treeNode) {
			return treeNode.valid == false ? {
				color : "red"
			} : {};
		}

	}

	// 保存角色
	$('#roleSave-btn').click(function() {
		debugger;
		var nodes = treeObj.getCheckedNodes(true);
		var roleStr = "";
		$.map(nodes, function(item, index) {
			roleStr += "," + item.id;
		});

		$.post(getRootPath_web()+'/common/user/roleSave', {
			'userId' : userId,
			'roleStr' : roleStr.substr(1)
		}, function(data) {
			$('#roleModal').modal('hide');
			$.alert(data.msg);
		});

	});

	//保存用户
	$('#userSave-btn').click(

			function() {
				debugger;
				//转换成字符数组
				var formData = $('#userForm').serializeArray();
				$.post(getRootPath_web()+'/common/user/save',
						formData, function(data) {
							if ('0' == data.status) {
								$('#addDialog').modal('hide');
								$.tips({
									content : data.msg,
									autoClose : 'cancel|3000'
								});
								$table.bootstrapTable('refresh');  //刷新
							} else {
								$.tips({
									content : data.msg,
									autoClose : 'cancel|3000'
								});
								resetForm();
								return false;
							}
						});
			});
	// 添加
	function addAction() {

		$("#hiddenPassword").css('display',''); 
		$("#userId").val("");
		$("#userCode").val("");
		$("#userName").val("");
		$("#userPassword").val("");
		$("#userAddress").val("");
		$("#userEmail").val("");
		$("#userPhone").val("");
		$("#userValid").val("");
		$('#addDialog').modal('show');
	}
	
	//编辑
	function editAction(){
		var rows = $table.bootstrapTable('getSelections');
		if (rows.length != 1) {
			$.confirm({
				title : false,
				content : '请选择一条记录！',
				autoClose : 'cancel|3000',
				backgroundDismiss : true,
				buttons : {
					cancel : {
						text : '取消',
						btnClass : 'waves-effect waves-button'
					}
				}
			});
		} else {
			$("#hiddenPassword").css('display','none'); 
			$("#userId").val(rows[0].userId);
			$("#userCode").val(rows[0].userCode);
			$("#userName").val(rows[0].userName);
			$("#userPassword").val(rows[0].userPassword);
			$("#userAddress").val(rows[0].userAddress);
			$("#userEmail").val(rows[0].userEmail);
			$("#userPhone").val(rows[0].userPhone);
			$('#userValid').selectpicker('val', rows[0].userValid);//设置选中 
			$('#userValid').selectpicker('refresh');
			$('#addDialog').modal('show');
		/*	var userId =rows[0].userId;
			$.post(getRootPath_web()+'/common/user/queryUserById', {
				'userId' : userId,
			}, function(data) {

				if(data.status=="0"){
					$('#addDialog').modal('show');
					debugger;
					$("#userId").val(data.res.userId);
					$("#userCode").val(data.res.userCode);
					$("#userName").val(data.res.userName);
					$("#userPassword").val(data.res.userPassword);
					$("#userAddress").val(data.res.userAddress);
					$("#userEmail").val(data.res.userEmail);
					$("#userPhone").val(data.res.userPhone);
					$("#userValid").val(data.res.userValid);
					
				}
				else
					$.tips({
						content : data.msg,
						autoClose : 'cancel|3000'
					});
			});*/
			
		}
	
	}
	
	$('#addDialog').on('shown.bs.modal', function () {
		//模态组件加载完执行此方法
    })
	
	
	// 删除
	function deleteAction() {
		var rows = $table.bootstrapTable('getSelections');
		if (rows.length == 0) {
			$.confirm({
				title : false,
				content : '请至少选择一条记录！',
				autoClose : 'cancel|3000',
				backgroundDismiss : true,
				buttons : {
					cancel : {
						text : '取消',
						btnClass : 'waves-effect waves-button'
					}
				}
			});
		} else {
			$.confirm({
				type : 'red',
				animationSpeed : 300,
				title : false,
				content : '确认删除该用户吗？',
				buttons : {
					confirm : {
						text : '确认',
						btnClass : 'waves-effect waves-button',
						action : function() {
							var ids = new Array();
							for ( var i in rows) {
								ids.push(rows[i].userId);
							}
							$.post(getRootPath_web()+'/common/user/deleteUser', {
								'userIds' : ids.join(","),
							}, function(data) {
								$.tips({
									content : data.msg,
									autoClose : 'cancel|3000'
								});
								$table.bootstrapTable('refresh');  //刷新
							});
						}
					},
					cancel : {
						text : '取消',
						btnClass : 'waves-effect waves-button'
					}
				}
			});
		}
	}
	// 用户角色
	function roleAction() {
		debugger;
		var rows = $table.bootstrapTable('getSelections');
		if (rows.length != 1) {
			$.confirm({
				title : false,
				content : '请选择一条记录！',
				autoClose : 'cancel|3000',
				backgroundDismiss : true,
				buttons : {
					cancel : {
						text : '取消',
						btnClass : 'waves-effect waves-button'
					}
				}
			});
		} else {
			var row = rows[0];
			if ('admin' == row.userType) {
				$.alert('对不起，您不能编辑管理员的角色！');
			} else {
				userId = row.userId;
				$('#roleModalTitle').html('用户[' + row.userName + ']拥有的角色');
				loadRoleTree();
			}
		}
	}
	
	function getRootPath_web() {
	    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	    var curWwwPath = window.document.location.href;
	    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	    var pathName = window.document.location.pathname;
	    var pos = curWwwPath.indexOf(pathName);
	    //获取主机地址，如： http://localhost:8083
	    var localhostPaht = curWwwPath.substring(0, pos);
	    //获取带"/"的项目名，如：/uimcardprj
	    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	    return (localhostPaht + projectName);
	}