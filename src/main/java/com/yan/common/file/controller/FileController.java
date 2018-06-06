package com.yan.common.file.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.yan.common.file.mapper.FileMapper;
import com.yan.common.user.mapper.SysUserMapper;
import com.yan.core.annotation.MapperInject;
import com.yan.core.controller.BaseController;
import com.yan.core.model.MsgModel;
import com.yan.core.model.PageModel;

/**
 * 文件列表管理
 * @author bigbug
 *
 */
@Controller
@RequestMapping("/common/file")
public class FileController extends BaseController {
	
	
	@MapperInject(FileMapper.class)
	private FileMapper mapper;
	
	@RequestMapping("/manage")
	public String manage() {
		return "common/file/manage";
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public PageModel<HashMap<String,Object>> list(@RequestParam HashMap<String,Object> params) {
		PageModel pageModel = new PageModel();
		String offset =(String) params.get("offset");
		String limit =(String) params.get("limit");
		Integer iter =Integer.parseInt(offset);
		Integer limitInt =Integer.parseInt(limit);
		String end =(iter+limitInt)+"";
		params.put("limit", end);
		//查询列表
		List<HashMap<String,Object>> listResult =mapper.queryFileList(params);
		//统计查询
	    Integer count=	mapper.queryFileCount( params);
	    pageModel.setRows(listResult);
	    pageModel.setTotal(count);
	    return pageModel;
	}

	
	/**
	 * @throws IOException 
	 * @throws IllegalStateException 
	 * @方法描述: 文件上传
	 * @作者： 易涛  
	 * @时间： 2018年5月21日上午11:59:43  
	 * @参数 @param params
	 * @参数 @return  
	 * @返回类型： MsgModel
	 */
	@RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
	@ResponseBody
	public MsgModel uploadImage(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {
		//公司的Id
        if(!file.isEmpty()) {
        	//根据sessionid 设置上传路径，退出之后普通用户无法 看到上传过的文件
        	String showPath = request.getContextPath()+"/images/"+this.getSession().getId()+"/"; 
            //上传文件路径
            String realPath = request.getServletContext().getRealPath("/images/"+this.getSession().getId()+"/");
            File dirFile = new File(realPath);
            //如果目录不存在，就创建目录
            if(!dirFile.exists()){
            	dirFile.mkdirs();
            }
            //得到上传的文件名称
            String filename = file.getOriginalFilename();
            //生成新的文件名称
            String newFileName = System.currentTimeMillis()+"."+filename.split("\\.")[1];
            //将上传文件保存到一个目标文件当中
            file.transferTo(new File(realPath + File.separator + newFileName));
            return this.resultMsg("0", showPath+newFileName);
        } else{
        	return this.resultMsg("-1", "上传失败！");
        }
	}

}
