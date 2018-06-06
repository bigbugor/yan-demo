<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/global.jsp"%>
<%@ include file="/common/include_common.jsp"%>
<%
	String base = request.getContextPath();
%>

<!--
	*
	*@author huangyuhao
	*@createTime "2018年4月20日下午2:56:14"
	*@version 1.0
-->
<!DOCTYPE html>
<html lang="zh-cn">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="author" content="hyh">
		<title>司机信息管理</title>
		<script src="${pageContext.request.contextPath}/resources/plugins/bootstrap-fileinput/js/locales/LANG.js"></script>
	</head>

	<body>
		<form id="searchForm">
			
			<div class="navbar-form navbar-left" role="search" id="cheStationArea">
				文件上传者：
				<div class="form-group">
					<input size="16" id="driverName" type="text" value="" placeholder="" class="form-control">
				</div>
			</div>
			<div class="navbar-form navbar-left" role="search">
				起始日期：
				<input size="16" id="startTime" type="text" value="" readonly class="form_datetime form-control">
			</div>
			<div class="navbar-form navbar-left" role="search">
				截止日期：
				<input size="16" id="endTime" type="text" value="" readonly class="form_datetime form-control">
			</div>
			</div>
			<div class="navbar-form navbar-left" role="search">
				<button id="search" type="button" class="btn btn-primary">搜索</button>
			</div>
			<div class="navbar-form navbar-left" role="search">
				<button id="search" type="button" class="btn btn-sucess">新增</button>
			</div>
			<!-- <div class="navbar-form navbar-left" role="search">
				<button id="reset" type="button" class="btn btn-dark">重置</button>
			</div> -->
			
		</form>
		<table id="table"></table>

		<!--modal框-->
		<div id="addDialog" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 id="ModalTitle" class="modal-title">正在操作中，请稍等。。。</h4>
					</div>
				</div>
			</div>
		</div>
		<!-- 添加司机信息-->
		<div id="addDriverInfo" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabel" >
			<!-- <div class="modal-dialog"> -->
			<div class="modal-dialog" role="document" style="width: 800px;"> 
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 id="downLineReasonModalTitle" class="modal-title">添加司机信息</h4>
					</div>
					<div class="modal-body" style="height:600px;overflow:auto; ">
						<form class="form-horizontal">				
							<input type="hidden" class="form-control" id="keyId" name="keyId"></input>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="driverNameAdd">司机姓名<span class="text-danger">&nbsp;*</span></label>
								<div class="col-sm-4">
									<input type="text" id="driverNameAdd" name="driverName" class="form-control" placeholder="请输入姓名"></input>
								</div>
								<label class="col-sm-2 control-label" for="sex">性别</label>
								<div class="col-sm-4">
									<select id="sex" name="sex" class="form-control">
										<option value="男">男</option>
										<option value="女">女</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="cellPhone">联系电话<span class="text-danger">&nbsp;*</span></label></label>
								<div class="col-sm-4">
									<input type="text" name="cellPhone" class="form-control" id="cellPhone" placeholder="请输入您的电话号码"></input>
								</div>
								<label class="col-sm-2 control-label" for="birthday">司机出生日期<span class="text-danger">&nbsp;*</span></label></label>
								<div class="col-sm-4">
									<input size="16" id="birthday" name="birthday" type="text" value="" readonly class="form_datetime form-control" placeholder="请选择出生日期">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label" for="idcard">身份证号<span class="text-danger">&nbsp;*</span></label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="idcard" name="idcard" placeholder="请输入司机的身份证号"></input>
								</div>
								<label class="col-sm-2 control-label" for="drivingLicence">驾驶证编号<span class="text-danger">&nbsp;*</span></label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="drivingLicence" name="drivingLicence" placeholder="请输入司机的驾驶证编号"></input>
								</div>
							</div>

							<div  class="form-group">
								<label class="col-sm-2 control-label" for="drivingAge">司机驾龄<span class="text-danger">&nbsp;*</span></label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="drivingAge" name="drivingAge" placeholder="请输入司机的驾龄"></input>
								</div>
								<label class="col-sm-2 control-label" for="supportBusType">准驾车型<span class="text-danger">&nbsp;*</span></label>
								<div class="col-sm-4">
									<select id="supportBusType" name="supportBusType" class="form-control">
										<option value="大型客车">大型客车</option>
										<option value="中型客车">中型客车</option>
										<option value="小型客车">小型客车</option>
									</select>
								</div>
							</div>
							
							<div class="form-group">
								<label class="col-sm-2 control-label" for="idcardFile">请上传身份证<span class="text-danger">&nbsp;*</span></label>
								<div class="col-sm-10">
									<input id="idcardFile" name="file" type="file" class="file" multiple data-show-upload="false" data-show-caption="false" data-msg-placeholder="选择上传文件...">
								</div>
								<input type="hidden" class="form-control" id="idcardPrewId" name="idcardPrewId"></input>
								<input type="hidden" class="form-control" id="idcardPath" name="idcardPath" placeholder="请上传司机的身份证照片"></input>
							</div>
							
							<div class="form-group">
								<label class="col-sm-2 control-label" for="drivingLicenceFile">请上传驾驶证<span class="text-danger">&nbsp;*</span></label>
								<input type="hidden" class="form-control" id="drivingLicencePath" name="drivingLicencePath" placeholder="请上传司机的身份证照片"></input>
								<input type="hidden" class="form-control" id="drivingLicencePrewId" name="drivingLicencePrewId"></input>
								<div class="col-sm-10">
									<input id="drivingLicenceFile" name="file" type="file" class="file" data-show-upload="false" data-show-caption="false" data-msg-placeholder="选择上传文件...">
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" id="resetDialog" type="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
							&nbsp;&nbsp;&nbsp;&nbsp;	<button id="submitBtn" class="btn btn-primary" type="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提交数据&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 不通过原因查看modal  -->
		<div id="reasonLook" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog" >
				<div class="modal-content">
					<div class="modal-header ">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 id="reasonTitle" class="modal-title ">不通过原因</h4>
					</div>
					<div class="modal-body">
						<div class="form-group ">
							<textarea id="suggestLook" class="form-control" rows="3" readonly>123</textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">
							<i class="zmdi zmdi-close "></i> 关闭
						</button>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 图片查看  -->
		<div id="picDetailDialog" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title">图片查看</h4>
					</div>
					<div class="modal-body" style="height:600px;overflow:auto; ">
						<div id="picContent" class="form-group">
						  	
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default btn-sm"
							data-dismiss="modal">
							<i class="zmdi zmdi-close"></i> 关闭
						</button>
					</div>
				</div>
			</div>
		</div>
		
		<script src="${pageContext.request.contextPath}/resources/js/file/filetab.js">
		
		
		</script>
		
	</body>
</html>