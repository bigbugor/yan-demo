<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/global.jsp"%>
<%@ include file="/common/include_common.jsp"%>

<html lang="zh-cn">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>用户管理</title>

</head>
<body>
	<div id="main">
		<div id="toolbar">
			<a class="waves-effect btn btn-info btn-sm"
				href="javascript:addAction();"><i class="zmdi zmdi-plus"></i>
				新增用户</a> <a class="waves-effect btn btn-warning btn-sm"
				href="javascript:editAction();"><i class="zmdi zmdi-edit"></i>
				编辑用户</a> <a class="waves-effect btn btn-danger btn-sm"
				href="javascript:deleteAction();"><i class="zmdi zmdi-delete"></i>
				删除用户</a><!--  <a class="waves-effect btn btn-primary btn-sm"
				href="javascript:roleAction();"><i class="zmdi zmdi-male"></i>
				用户角色</a> -->
				<!-- <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">开始演示模态框</button> -->
		</div>
		<table id="table"></table>
	</div>

	<!-- 用户 -->
	<div id="addDialog" class="modal fade" tabindex="-1" role="dialog"
		aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 id="ModalTitle" class="modal-title">用户管理</h4>
				</div>
				<div class="modal-body">
					<form action="" id="userForm">
					<input type="hidden" id="userId" name="userId">
							
						<div class="container col-md-11"
							style="margin-top: 10px; margin-left: 55px; display: table;">
							<div class="row" style="margin-top: 10px; margin-bottom: 10px;">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">用户名：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
										<input type="text" id="userCode" name="userCode"
											class="form-control" placeholder="用户名（必填）" />
									</div>
								</div>
							</div>
							<div class="row" style="margin-top: 10px; margin-bottom: 10px;">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">姓名：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
									<input type="text" id="userName1" name="userName1"
											class="form-control" placeholder="密码（必填）"  style="display:none"/>
										<input type="text" id="userName" name="userName"
											class="form-control" placeholder="姓名（必填）" />
									</div>
								</div>
							</div>
							<div class="row" style="margin-top: 10px; margin-bottom: 10px;" id="hiddenPassword">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">密码：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
									<input type="password" id="password1" name="password1"
											class="form-control" style="display:none"/>
										<input type="password" id="userPassword" name="userPassword"
											class="form-control" placeholder="密码（必填）" />
									</div>
								</div>
							</div>
							<div class="row" style="margin-top: 10px; margin-bottom: 10px;">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">地址：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
										<input type="text" id="userAddress" name="userAddress"
											class="form-control" placeholder="地址" />
									</div>
								</div>
							</div>
							<div class="row" style="margin-top: 10px; margin-bottom: 10px;">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">邮箱：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
										<input type="text" id="userEmail" name="userEmail"
											class="form-control" placeholder="邮箱" />
									</div>
								</div>
							</div>
							<div class="row" style="margin-top: 10px; margin-bottom: 10px;">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">联系电话：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
										<input type="text" id="userPhone" name="userPhone"
											class="form-control" placeholder="联系电话" />
									</div>
								</div>
							</div>
							<div class="row" style="margin-top: 10px; margin-bottom: 10px;">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">出生日期：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
										<div class="input-group date form_date">
											<input id="userBirthday" class="form-control" type="text"
												placeholder="请选择日期" readonly> <span
												class="input-group-addon"><span
												class="glyphicon glyphicon-remove"></span></span> <span
												class="input-group-addon"><span
												class="glyphicon glyphicon-calendar"></span></span>
										</div>
										<script type="text/javascript">
											//	日历组件选择
											$(".form_datetime")
													.datetimepicker(
															{
																language : 'zh-CN',
																format : "yyyy-mm-dd hh:ii",
																autoclose : true,
																todayBtn : true,
																minuteStep : 10
															});
											$('.form_date').datetimepicker({
												language : 'zh-CN',
												format : "yyyy-mm-dd",
												todayBtn : true,
												autoclose : true,
												startView : 2,
												minView : 2
											});
										</script>
									</div>
								</div>
							</div>
							<!-- <div class="row" style="margin-top: 10px; margin-bottom: 10px;">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">照片：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
										<input id="userPhoto" type="file" style="display: block;">
									</div>
								</div>
							</div> -->
							<div class="row" style="margin-top: 10px; margin-bottom: 10px;">
								<div class="col-md-4 text-left"
									style="background-color: #D2E9FF; line-height: 26px; vertical-align: middle;">
									<label style="margin-top: 5px; font-size: 14px; color: grey;">有效值：</label>
								</div>
								<div class="col-md-7">
									<div class="form-group">
										<select id="userValid" name="userValid" class="selectpicker">
											<option value="1">有效</option>
											<option value="0">无效</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" id="close-btn" class="btn btn-default btn-sm"
						data-dismiss="modal">
						<i class="zmdi zmdi-close"></i> 关闭
					</button>
					<button id="userSave-btn"
						class="waves-effect btn btn-success btn-sm"
						style="margin-left: 10px;" button"
					href="javascript:;">
						<i class="zmdi zmdi-save"></i> 保存
					</button>
				</div>
			</div>
		</div>
		</div>
		<!-- 角色管理 -->
	<div id="roleModal" class="modal fade" tabindex="-1" role="dialog"
			aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 id="roleModalTitle" class="modal-title">用户拥有的角色</h4>
					</div>
					<div class="modal-body">
						<div id="roleZtree" class="ztree"></div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default btn-sm"
							data-dismiss="modal">
							<i class="zmdi zmdi-close"></i> 关闭
						</button>
						<button id="roleSave-btn"
							class="waves-effect btn btn-success btn-sm"
							style="margin-left: 10px;" button"
					href="javascript:;">
							<i class="zmdi zmdi-save"></i> 保存
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="modal fade" id="roleModal"  tabindex="-1" role="dialog"
		aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog">
				ddddddddddd
			</div>
		</div> -->
		

<script src="${pageContext.request.contextPath}/resources/js/common/user/manage.js"></script>
</body>
</html>