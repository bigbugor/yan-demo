/**
 *@author 易涛
 *@version 1.0
 */
var table = $("#table");
debugger;




var urlPart="";//default value
Date.prototype.Format = function(fmt)   
{ 
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}; 

inputFileInput("idcard",getRootPath_web() + "/directBusClient/busDriver/uploadImage",2);
inputFileInput("drivingLicence",getRootPath_web() + "/directBusClient/busDriver/uploadImage",1);

$(function() {
	
	
	//加载datepicker类
	$(".form_datetime").datetimepicker({
		format: 'yyyy-mm-dd',//显示格式
		todayHighlight: 1,//今天高亮
		minView: "month",//设置只显示到月份
		startView:2,
		forceParse: 0,
		showMeridian: 1,
		autoclose: 1//选择后自动关闭
	});
	
	//设置出票table的样式内容
	table.bootstrapTable({
		url: getRootPath_web() + '/directBusClient/busDriver/busDriverList',
		method : 'post',
		contentType : "application/x-www-form-urlencoded",//必须要有！！！！
		toolbar: '#toolbar', //设置将toolbar集成到bootstrap-table中展示
	  	dataType:'json',
	  	idField : 'Id',// 指定主键列
	  	singleSelect : false,
	  	striped: true,
	  	search : false,
	  	cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	  	pagination : true, // 是否显示分页（*）
	  	sortable : false, // 是否启用排序
	  	sortOrder : "asc", // 排序方式
	  	queryParamsType : 'limit',//查询参数组织方式
	  	queryParams : queryParams,// 传递参数（*）
	  	sidePagination : 'server',//指定服务器端分页
	   	pageNumber : 1, // 初始化加载第一页，默认第一页
	  	pageSize : 15, // 每页的记录行数（*）
	  	pageList : [5, 10, 20, 50], // 可供选择的每页的行数（*）
	    showColumns: true,
	    showRefresh: true,
	    columns : [
	  		{
	  			field : 'DriverName',
	  			title : '司机名称',
	  			align : 'center'
	  		},{
	  			field : 'Sex',
	  			title : '性别',
	  			align : 'center'
	  		}, {
	  			field : 'SupplyCompanyName',
	  			title : '所属供应商',
	  			align : 'center'
	  		}, {
	  			field : 'CellPhone',
	  			title : '联系电话',
	  			align : 'center'
	  		},{
	  			field : 'Birthday',
	  			title : '出生日期',
	  			align : 'center',
	  			formatter: function (value, row, index) {
		 	           if (value == null) {
		 	               return "";
		 	           }
		 	           var offlineTimeStr = new Date(value).Format("yyyy-MM-dd");
		 	           return offlineTimeStr;
		   			}
	  		}, {
	  			field : 'Idcard',
	  			title : '身份证号',
	  			align : 'center',
	  			formatter: function(value, row, index) {
	  				var htmlStr= value + "&nbsp;&nbsp;&nbsp;&nbsp;<a class='waves-effect btn btn-info btn-sm' href='javascript:showBigPicView(\""+row.IdcardPath+"\");'><i class='zmdi'></i>查看附件</a>";
					return htmlStr;
				}
	  		}, {
	  			field : 'DrivingLicence',
	  			title : '驾驶证号',
	  			align : 'center',
	  			formatter: function(value, row, index) {
	  				var htmlStr= value + "&nbsp;&nbsp;&nbsp;&nbsp;<a class='waves-effect btn btn-info btn-sm' href='javascript:showBigPicView(\""+row.DrivingLicencePath+"\");'><i class='zmdi'></i>查看附件</a>";
					return htmlStr;
				}
	  		},{
	  			field : 'SupportBusType',
	  			title : '准驾车型',
	  			align : 'center'
	  		}, {
	
	  			field : 'DrivingAge',
	  			title : '驾龄',
	  			align : 'center'
	  		},{
	  			field : 'ShenPiState',
	  			title : '用户状态',
	  			align : 'center',
	  			formatter: function(value, row, index) {
	  				var htmlStr = "";
	  				if(row.ShenPiState == 0){
	  					htmlStr = "待审核";
	  				}else if(row.ShenPiState == 1){
	  					htmlStr="已审核";
	  				}else if(row.ShenPiState == 2){
	  					htmlStr="不通过";
	  				}
					return htmlStr;
				}
	  		},{
	  			field : 'Id',
	  			title : '操作',
	  			align : 'center',
	  			formatter: function(value, row, index) {
	  				var htmlStr="<a class='waves-effect btn btn-danger btn-sm'href='javascript:update("+index+");'><i class='zmdi'></i>修改</a>&nbsp;&nbsp;";
	  				if(row.ShenPiState == 2){
	  					htmlStr+="<a class='waves-effect btn btn-info btn-sm'href='javascript:showReason("+index+");'><i class='zmdi'></i>查看原因</a>&nbsp;&nbsp;";
	  				}
					return htmlStr;
				},
	  			visible:true
	  		}
		]
	});
	
});

//查看大图
function showBigPicView(picUrl){
	if(picUrl == ""){
		$.tips({
				content : "暂无附件",
				autoClose : 'cancel|3000'
		});
	}else{
		var picUrls = picUrl.split(",");
		var insertHtml = "";
		for(var i=0;i<picUrls.length;i++){
			if(insertHtml == ""){
				insertHtml = '<img id="picDetail" src="'+picUrls[i]+'" >';
			}else{
				insertHtml += '<br><br><img id="picDetail" src="'+picUrls[i]+'" >';
			}
		}
		$("#picContent").html(insertHtml);
	}
	$("#picDetailDialog").modal('show');
}


//初始化控件  控件id，和上传路径
function inputFileInput(keyId, uploadUrl, fileNum) {
	 $('#'+keyId+'File').fileinput({
		 language: 'zh', //设置语言
		 enctype: 'multipart/form-data',
	     uploadUrl: getRootPath_web() + "/directBusClient/busDriver/uploadImage", //上传的地址
	     allowedFileExtensions : ['jpg', 'png', 'gif', 'bmp','jpeg'],//接收的文件后缀
	     showUpload: false, //是否显示上传按钮
	     showPreview: true, //展前预览
	     showCaption: true,//是否显示标题
	     maxFileSize : 10000,//上传文件最大的尺寸
	     maxFileCount : fileNum,//
	     dropZoneEnabled: true,//是否显示拖拽区域
	     browseClass: "btn btn-primary",
	     initialPreview: []
     }).on("filebatchselected", function(event, files) {
    	 $('#'+keyId+'PrewId').val("");
		 $('#'+keyId+'Path').val("");
     }).on('fileuploaderror', function (event, data, previewId, index) {
         var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
         alert('上传失败！');
     }).on('fileerror', function (event, data) {
         console.log(data.id);
         console.log(data.index);
         console.log(data.file);
         console.log(data.reader);
         console.log(data.files);
     }).on('fileuploaded', function (event, data, previewId, index) {
         var resultInfo = data.response;
         if(resultInfo.status == '0'){
        	 //表示上传成功！
        	 var prewId = $('#'+keyId+'PrewId').val();
        	 var path = $('#'+keyId+'Path').val();
        	 if(prewId == ""){
        		 $('#'+keyId+'PrewId').val(previewId);
        		 $('#'+keyId+'Path').val(resultInfo.msg);
        	 }else{
        		 $('#'+keyId+'PrewId').val(prewId+","+previewId);
        		 $('#'+keyId+'Path').val(path+","+resultInfo.msg);
        	 }
         }else{
        	 alert(response.msg);
         }
     }).on('filesuccessremove', function(event, id) {
    	 var prewIds = $('#'+keyId+'PrewId').val().split(",");
    	 var paths = $('#'+keyId+'Path').val().split(",");
    	 var newPrewIds = "";
    	 var newPaths = "";
    	 for(var i=0;i<prewIds.length;i++){
    		 if(prewIds[i] != id){
    			 if(newPaths == ""){
    				 newPrewIds = prewIds[i];
    				 newPaths = paths[i];
    			 }else{
    				 newPrewIds += "," + prewIds[i];
    				 newPaths += "," + paths[i];
    			 }
    		 }
    	 }
    	 $('#'+keyId+'PrewId').val(newPrewIds);
		 $('#'+keyId+'Path').val(newPaths);
     }).on('fileclear', function (event, data, msg) {
    	 $('#'+keyId+'Path').val("");
     }).on('fileimageuploaded', function (event, id) {
    	 alert("加载完成"+id);
     });
}


$("#shenPiState").change(function(){
  var value=$(this).val();
  if(value == 0 || value == 2){//表示待审核
  	table.bootstrapTable("showColumn", "Id");
  } else {
		table.bootstrapTable("hideColumn", "Id");
  }
  table.bootstrapTable('refresh');  //刷新
});


$("#saveReasonBtn").click(function(){
	var suggest = $("#suggest").val();
	if(suggest == ""){
		$.tips({
  				content : "请输入不通过原因",
  				autoClose : 'cancel|3000'
  		});
		return;
	}
	$("#reasonSet").modal('hide');
	$("#addDialog").modal('show');
	window.setTimeout(function (){
		$("#addDialog").modal('hide');
		$.tips({
  				content : "操作成功！",
  				autoClose : 'cancel|3000',
  		});
	},3000);
});

function addInfo(){
	$("#addDriverInfo").modal('show');
	$("#driverNameAdd").val("");
	$("#cellPhone").val("");
	$("#birthday").val("");
	$("#idcard").val("");
	$("#idcardPath").val("");
	$("#drivingLicence").val("");
	$("#drivingAge").val("");
	$("#drivingLicencePath").val("");
	
	$('#idcardFile').fileinput('reset');
	$('#drivingLicenceFile').fileinput('reset');
}


//修改
function update(index){
	var currentrow = table.bootstrapTable('getData', {useCurrentPage:true})[index];
	$("#rowIndex").val(index);
	$("#addDriverInfo").modal('show');
	$("#driverNameAdd").val(currentrow.DriverName);
	$("#cellPhone").val(currentrow.CellPhone);
	$("#birthday").val(new Date(currentrow.Birthday).Format("yyyy-MM-dd"));
	$("#idcard").val(currentrow.Idcard);
	$("#idcardPath").val(currentrow.IdcarPath);
	$("#drivingLicence").val(currentrow.DrivingLicence);
	$("#drivingAge").val(currentrow.DrivingAge);
	$("#drivingLicencePath").val(currentrow.DrivingLicencePath);
	$("#keyId").val(currentrow.d);
	$('#idcardFile').fileinput('reset');
	$('#drivingLicencePath').fileinput('reset');
	
	
}

//查看不同意原因
function showReason(index) {
	var currentrow = table.bootstrapTable('getData', {useCurrentPage:true})[index];
	$("#reasonLook").modal('show');
	$("#suggestLook").val(currentrow.Suggest);
}

//重置搜索条件
$('#reset').click(function(){
	$("#supplId").val("");
	$("#useType").val("0");
	$("#driverName").val("");
	table.bootstrapTable('refresh');  //刷新
});



//查询方法
$('#search').click(function(){
	var supplId =$("#supplId").val();
	var shenPiState =$("#shenPiState").val();
	var driverName =$("#driverName").val();
	var formData={
			"supplId":supplId,
			"shenPiState":shenPiState,
			"driverName":driverName
	}
	
	var opt = {
      url: getRootPath_web()+"/directBusClient/busDriver/busDriverList",
      silent: true,
      query:formData
	};
	//显示对话框模型
	$("#addDialog").modal('show');
	table.bootstrapTable('refresh', opt);
});

//table加载成功时触发
table.on('load-success.bs.table',function(data){
	$("#addDialog").modal('hide');
});


//请求服务数据时所传参数
function queryParams(params) {
	var supplId =$("#supplId").val();
	var shenPiState =$("#shenPiState").val();
	var driverName =$("#driverName").val();
	
	var formData={
			"limit" : params.limit,
			"offset" : params.offset,
			"supplId":supplId,
			"shenPiState":shenPiState,
			"driverName":driverName
	}
	return formData;
}

//重置
$('#resetDialog').click(function() {
	$("#driverNameAdd").val("");
	$("#cellPhone").val("");
	$("#birthday").val("");
	$("#idcard").val("");
	$("#idcardPath").val("");
	$("#drivingLicence").val("");
	$("#drivingAge").val("");
	$("#drivingLicencePath").val("");
});

//提交数据
$('#submitBtn').click(function() {
	var driverName = $("#driverNameAdd").val();
	var cellPhone = $("#cellPhone").val();
	var birthday = $("#birthday").val();
	var idcard = $("#idcard").val();
	var idcardPath = $("#idcardPath").val();
	var drivingLicence = $("#drivingLicence").val();
	var drivingAge = $("#drivingAge").val();
	var drivingLicencePath = $("#drivingLicencePath").val();
	var supportBusType = $("#supportBusType").val();
	
	if(driverName == "") {
		alert("请输入司机姓名");
		return;
	}
	if(cellPhone == "") {
		alert("请输入司机联系电话");
		return;
	}
	if(birthday == "") {
		alert("请选择司机出生日期");
		return;
	}
	if(idcard == "") {
		alert("请输入身份证号");
		return;
	}

	if(idcardPath == "") {
		alert("请上传身份证照片");
		return;
	}
	if(drivingLicence == "") {
		alert("请输入驾驶证编号");
		return;
	}
	if(drivingAge == "") {
		alert("请输入司机驾龄");
		return;
	}
	if(drivingLicencePath == "") {
		alert("请上传驾驶证图片");
		return;
	}
	
	var formData={
			"Id":$("#keyId").val(),
			"DriverName" : driverName,
			"Sex":$("#sex").val(),
			"CellPhone" :cellPhone,
			"Birthday":birthday,
			"Idcard":idcard,
			"IdcardPath":idcardPath,
			"DrivingLicence":drivingLicence,
			"DrivingAge":drivingAge,
			"DrivingLicencePath":drivingLicencePath,
			"SupportBusType":supportBusType
	}
	
	$.ajax({
	    url:getRootPath_web()+"/directBusClient/busDriver/insertOrUpdateBusDriverInfo",
	    type:"post",
	    data:formData,
	    dataType:"json",
	    success:function(data){
	    	$("#addDriverInfo").modal('hide');
	    	if(data.status == "0"){
	    		$.tips({
	  				content : data.msg,
	  				autoClose : 'cancel|3000'
	  			});
	  			table.bootstrapTable('refresh');  //刷新
	    	}
	    },
	    error:function(){
	     
	    }
	  });
	
	

	
});

function getRootPath_web() {
	//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath = window.document.location.href;
	//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	//获取带"/"的项目名，如：/uimcardprj
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
}
