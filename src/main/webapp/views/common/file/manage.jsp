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
		<title>文件信息管理</title>
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
				<button id="addInfoBtn" type="button" onclick="addInfo();" class="btn btn-success">新增</button>
			</div>
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
		<!-- 添加文件-->
		<div id="addDriverInfo" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabel" >
			<!-- <div class="modal-dialog"> -->
			<div class="modal-dialog" role="document" style="width: 800px;"> 
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 id="downLineReasonModalTitle" class="modal-title">添加文件信息</h4>
					</div>
					<div class="modal-body" style="height:600px;overflow:auto; ">
						<form class="form-horizontal">				
							<input type="hidden" class="form-control" id="keyId" name="keyId"></input>
							
							
							<div class="form-group">
								<label class="col-sm-2 control-label" for="drivingLicenceFile">请上传文件<span class="text-danger">&nbsp;*</span></label>
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
		
		<script src="${pageContext.request.contextPath}/resources/js/file/manage.js">
		
		
		</script>
		
	</body>
</html>